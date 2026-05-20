import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./App.css";

import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import AddPetView from "./views/AddPetView";
import EditPetView from "./views/EditPetView";
import ShowPetView from "./views/ShowPetView";

import { loginApi, logoutApi } from "./api/endpoints";
import { getApiMessage } from "./utils/messages";
import { toast, alertError } from "./hooks/useToast";
import { usePets } from "./hooks/usePets";
import { useTokenGuard } from "./hooks/useTokenGuard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const SWAL_COMPACT = { width: "22rem", padding: "1.2rem" };
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("authToken") || ""
  );
  const expectedTokenRef = useRef(localStorage.getItem("authToken") || "");
  const [view, setView] = useState(
    () => (localStorage.getItem("authToken") ? "dashboard" : "login")
  );
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [checkingToken, setCheckingToken] = useState(true);
  const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutos
  const {
    pets,
    addForm,
    editForm,
    petDetailItems,
    loadingList,
    loadingDetail,
    selectedId,
    setSelectedId,
    setAddForm,
    setEditForm,
    loadPets,
    openAdd,
    openShow,
    openEdit,
    handleAddPet,
    handleUpdatePet,
    handleDeletePet,
    resetPetsState,
  } = usePets({ setView, navigate });

  useEffect(() => {
    if (!authToken) {
      setView("login");
      navigate("/login", { replace: true });
      setCheckingToken(false);
      return;
    }
    verifyTokenAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  function goDashboard(load = true, replace = false) {
    setView("dashboard");
    navigate("/dashboard", { replace });
    if (!load) return Promise.resolve();
    return loadPets().catch(async (err) => {
      if (err?.response?.status === 401) {
        await notifyInvalidToken(err.response?.data);
      }
    });
  }

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/pets/show/")) {
      const id = path.split("/").pop();
      setSelectedId(id);
      setView("show");
      openShow(id, true);
      return;
    }
    if (path.startsWith("/pets/edit/")) {
      const id = path.split("/").pop();
      setSelectedId(id);
      setView("edit");
      openEdit(id, true);
      return;
    }
    if (path.startsWith("/pets/add")) {
      setView("add");
      return;
    }
    if (path.startsWith("/dashboard")) return;
    if (path.startsWith("/login")) {
      setView("login");
      return;
    }
    navigate(authToken ? "/dashboard" : "/login", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const verifyTokenAndLoad = async () => {
    setCheckingToken(true);
    try {
      await loadPets();
      const path = location.pathname || "";
      const isPetPath =
        path.startsWith("/pets/show/") ||
        path.startsWith("/pets/edit/") ||
        path.startsWith("/pets/add");
      if (!isPetPath && !path.startsWith("/dashboard")) {
        await goDashboard(false, true);
      }
    } catch (error) {
      await notifyInvalidToken(error.response?.data);
      setView("login");
      navigate("/login", { replace: true });
    } finally {
      setCheckingToken(false);
    }
  };

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
      const fallbackTitle = isSuccess ? "Sesión cerrada" : "Error al cerrar";
      const title = getApiMessage(responseData, fallbackTitle);
      const text = getApiMessage(
        responseData?.details ? { message: responseData.details } : responseData,
        isSuccess ? "" : lastErrorMessage || ""
      );
      await Swal.fire({
        icon: responseStatus === 200 ? "success" : "error",
        title,
        text,
        ...SWAL_COMPACT,
      });
    }

    localStorage.removeItem("authToken");
    setAuthToken("");
    expectedTokenRef.current = "";
    resetPetsState();
    setView("login");
    navigate("/login", { replace: true });
  };

  useTokenGuard({ view, expectedTokenRef, handleLogout });

  const notifyInvalidToken = async (payload) => {
    await alertError(
      getApiMessage(payload, ""),
      ""
    );
    await handleLogout(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginApi(loginForm);
      if (data.token) {
        setAuthToken(data.token);
        expectedTokenRef.current = data.token;
        localStorage.setItem("authToken", data.token);
        toast(
          getApiMessage(data, ""),
          "success",
          1200
        );
        await goDashboard(true);
      } else {
        const msg = getApiMessage(data, "");
        alertError(msg);
      }
    } catch (error) {
      const msg = getApiMessage(error.response?.data, "");
      alertError(msg);
    }
  };

  useEffect(() => {
    if (view === "login") return;

    let timerId = null;

    const logoutForInactivity = () => {
      handleLogout(false);
    };

    const resetTimer = () => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(logoutForInactivity, INACTIVITY_LIMIT_MS);
    };

    const activityEvents = ["click", "mousemove", "keydown", "touchstart"];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetTimer));
    const handleVisibility = () => {
      if (document.visibilityState === "visible") resetTimer();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    resetTimer();

    return () => {
      if (timerId) clearTimeout(timerId);
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <div className="App">
      {checkingToken && view !== "login" && (
        <div className="overlay">Validando sesion</div>
      )}

      {view === "login" && (
        <LoginView
          loginForm={loginForm}
          onChange={setLoginForm}
          onSubmit={handleLogin}
        />
      )}

      {view === "dashboard" && (
        <DashboardView
          loadingList={loadingList}
          pets={pets}
          openAdd={openAdd}
          handleLogout={handleLogout}
          openShow={openShow}
          openEdit={openEdit}
          handleDeletePet={handleDeletePet}
        />
      )}

      {view === "add" && (
        <AddPetView
          addForm={addForm}
          onChange={setAddForm}
          onSubmit={handleAddPet}
          onCancel={() => goDashboard(true)}
        />
      )}

      {view === "edit" && (
        <EditPetView
          editForm={editForm}
          onChange={setEditForm}
          onSubmit={handleUpdatePet}
          onCancel={() => goDashboard(true)}
        />
      )}

      {view === "show" && (
        <ShowPetView
          loadingDetail={loadingDetail}
          petDetailItems={petDetailItems}
          onBack={() => goDashboard(true)}
          onEdit={() => selectedId && openEdit(selectedId)}
          onDelete={() => selectedId && handleDeletePet(selectedId)}
        />
      )}
    </div>
  );
}

export default App;


