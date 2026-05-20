import { useEffect } from "react";
import Swal from "sweetalert2";

export const useTokenGuard = ({ view, expectedTokenRef, handleLogout }) => {
  useEffect(() => {
    let timerId;

    const triggerTokenTamper = () => {
      Swal.fire({
        icon: "error",
        title: "⚠️ Token no válido",
        text: "Se detectó modificación del token. Tu sesión se cerró por seguridad.",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        handleLogout(true);
      });
    };

    const monitor = { value: expectedTokenRef.current };
    Object.defineProperty(window, "authToken", {
      configurable: true,
      get() {
        return monitor.value;
      },
      set(v) {
        if (v && v !== monitor.value) triggerTokenTamper();
        monitor.value = v;
      },
    });

    timerId = setInterval(() => {
      const stored = localStorage.getItem("authToken") || "";
      const expected = expectedTokenRef.current || "";
      if (expected && stored && stored !== expected) triggerTokenTamper();
      if (expected && !stored && view !== "login") triggerTokenTamper();
    }, 900);

    return () => {
      if (timerId) clearInterval(timerId);
      try {
        delete window.authToken;
      } catch (_) {
        /* ignore */
      }
    };
  }, [view, expectedTokenRef, handleLogout]);
};
