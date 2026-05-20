import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginApi, logoutApi, listPetsApi } from "../api/endpoints";
import { getApiMessage } from "../utils/messages";
import { toast, alertError, useApiAlerts } from "./useToast";

export const useAuth = (onTokenValid) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("authToken") || ""
  );
  const expectedTokenRef = useRef(localStorage.getItem("authToken") || "");
  const [checkingToken, setCheckingToken] = useState(true);
  const { invalidToken } = useApiAlerts();

  useEffect(() => {
    if (!authToken) {
      navigate("/login", { replace: true });
      setCheckingToken(false);
      return;
    }
    verifyTokenAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleLogout = async (silent = false) => {
    let responseData = null;
    let responseStatus = null;
    let lastErrorMessage = "";

    try {
      const { data, status } = await logoutApi();
      responseData = data;
      responseStatus = status;
    } catch (e) {
      responseData = e.response?.data || null;
      responseStatus = e.response?.status || null;
      lastErrorMessage = e.message || "";
    }

    if (!silent) {
      const isSuccess = responseStatus === 200;
      const title = getApiMessage(
        responseData,
        isSuccess ? "Sesión cerrada" : lastErrorMessage || ""
      );
      const text = getApiMessage(
        responseData?.details ? { message: responseData.details } : responseData,
        isSuccess ? "" : lastErrorMessage || ""
      );
      await Swal.fire({
        icon: isSuccess ? "success" : "error",
        title,
        text,
      });
    }

    localStorage.removeItem("authToken");
    setAuthToken("");
    expectedTokenRef.current = "";
    navigate("/login", { replace: true });
  };

  const handleLogin = async (loginForm) => {
    try {
      const { data } = await loginApi(loginForm);
      if (data.token) {
        setAuthToken(data.token);
        expectedTokenRef.current = data.token;
        localStorage.setItem("authToken", data.token);
        toast(getApiMessage(data, ""), "success", 1200);
        return true;
      }
      alertError(getApiMessage(data, ""));
    } catch (error) {
      alertError(getApiMessage(error.response?.data, ""));
    }
    return false;
  };

  const verifyTokenAndLoad = async () => {
    setCheckingToken(true);
    try {
      await listPetsApi();
      if (onTokenValid) await onTokenValid();
    } catch (error) {
      await invalidToken(error.response?.data);
      await handleLogout(true);
    } finally {
      setCheckingToken(false);
    }
  };

  return {
    authToken,
    setAuthToken,
    expectedTokenRef,
    checkingToken,
    setCheckingToken,
    handleLogin,
    handleLogout,
  };
};
