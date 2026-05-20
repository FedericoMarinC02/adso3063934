'use client';

import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteConsoleAction } from "@/app/consoles/actions";
import SweetAlertModal from "@/components/SweetAlertModal";
import AlertSuccessIcon from "@/components/icons/AlertSuccessIcon";
import AlertWarningIcon from "@/components/icons/AlertWarningIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

interface DeleteConsoleButtonProps {
  consoleId: number;
  title: string;
  relatedGames?: number;
  className?: string;
}

export default function DeleteConsoleButton({
  consoleId,
  title,
  relatedGames = 0,
  className = "btn btn-xs inline-flex items-center gap-1 border border-rose-400/30 bg-rose-400/15 text-rose-100 hover:bg-rose-400/25 hover:border-rose-300/40",
}: DeleteConsoleButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const confirmDelete = () => {
    setShowConfirm(false);
    setIsPending(true);

    startTransition(async () => {
      try {
        await deleteConsoleAction(consoleId);
        setShowSuccess(true);
      } catch (error) {
        console.error("Delete console error:", error);
        setErrorMessage("No se pudo eliminar la consola. Intenta de nuevo.");
        setShowError(true);
      } finally {
        setIsPending(false);
      }
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);

    const params = new URLSearchParams(window.location.search);
    params.set("deleted", "1");
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (relatedGames > 0) {
            setShowBlocked(true);
            return;
          }

          setShowConfirm(true);
        }}
        disabled={isPending}
        className={className}
      >
        <DeleteIcon />
        {isPending ? "Deleting..." : "Delete"}
      </button>

      <SweetAlertModal
        open={showConfirm}
        icon={<AlertWarningIcon />}
        title="Eliminar consola"
        message={`Esta accion eliminara "${title}" del catalogo. Esta seguro de continuar?`}
        confirmLabel={isPending ? "Eliminando..." : "Si, eliminar"}
        onConfirm={confirmDelete}
        cancelLabel="Cancelar"
        onCancel={() => setShowConfirm(false)}
        confirmClassName="btn min-w-32 border border-rose-400/30 bg-rose-500 text-white hover:bg-rose-400"
      />

      <SweetAlertModal
        open={showSuccess}
        icon={<AlertSuccessIcon />}
        title="Consola eliminada"
        message={`"${title}" fue eliminada correctamente.`}
        confirmLabel="Aceptar"
        onConfirm={handleSuccessClose}
      />

      <SweetAlertModal
        open={showBlocked}
        icon={<AlertWarningIcon />}
        title="No se puede eliminar"
        message={`"${title}" todavia tiene ${relatedGames} juego${relatedGames === 1 ? "" : "s"} asociado${relatedGames === 1 ? "" : "s"}. Primero mueve o elimina esos juegos.`}
        confirmLabel="Entendido"
        onConfirm={() => setShowBlocked(false)}
      />

      <SweetAlertModal
        open={showError}
        icon={<AlertWarningIcon />}
        title="No se pudo eliminar"
        message={errorMessage}
        confirmLabel="Entendido"
        onConfirm={() => setShowError(false)}
      />
    </>
  );
}
