import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getApiMessage } from "../utils/messages";

export const toast = (title, icon = "success", timer = 1400) =>
  Swal.fire({
    icon,
    title,
    toast: true,
    position: "top-end",
    timer,
    showConfirmButton: false,
  });

export const alertError = (text, title = "") =>
  Swal.fire({
    icon: "error",
    title,
    text,
  });

export const useApiAlerts = () => {
  const invalidToken = async (payload) => {
    await alertError(
      getApiMessage(payload, "Token no proporcionado o inválido"),
      "Token inválido"
    );
  };

  return {
    toast,
    alertError,
    invalidToken,
  };
};
