'use client';

import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteGameAction } from "@/app/games/actions";
import SweetAlertModal from "@/components/SweetAlertModal";
import AlertSuccessIcon from "@/components/icons/AlertSuccessIcon";
import AlertWarningIcon from "@/components/icons/AlertWarningIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

interface DeleteGameButtonProps {
  gameId: number;
  title: string;
  className?: string;
}

export default function DeleteGameButton({
  gameId,
  title,
  className = "btn btn-xs inline-flex items-center gap-1 border border-rose-400/30 bg-rose-400/15 text-rose-100 hover:bg-rose-400/25 hover:border-rose-300/40",
}: DeleteGameButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    setIsPending(true);

    startTransition(async () => {
      try {
        await deleteGameAction(gameId);
        setShowSuccess(true);
      } catch (error) {
        console.error("Delete game error:", error);
        setErrorMessage("No se pudo eliminar el juego. Intenta de nuevo.");
        setShowError(true);
      } finally {
        setIsPending(false);
      }
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);

    if (pathname.startsWith("/games/view/") || pathname.startsWith("/games/edit/")) {
      router.replace("/games?deleted=1");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("deleted", "1");
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className={className}
      >
        <DeleteIcon />
        {isPending ? "Deleting..." : "Delete"}
      </button>

      <SweetAlertModal
        open={showConfirm}
        icon={<AlertWarningIcon />}
        title="Eliminar juego"
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
        title="Juego eliminado"
        message={`"${title}" fue eliminado correctamente.`}
        confirmLabel="Aceptar"
        onConfirm={handleSuccessClose}
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
