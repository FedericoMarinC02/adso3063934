"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AlertSuccessIcon from "@/components/icons/AlertSuccessIcon";
import SweetAlertModal from "@/components/SweetAlertModal";

type StatusKind = "created" | "deleted" | "edited";
type AlertContent = {
  title: string;
  message: string;
};

export default function ConsoleStatusAlert() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<StatusKind | null>(null);
  const [content, setContent] = useState<AlertContent | null>(null);

  useEffect(() => {
    if (searchParams.get("created") === "1") {
      setStatus("created");
      setContent({
        title: "Consola agregada",
        message: "La consola se guardo correctamente y ya esta disponible en el catalogo.",
      });
      return;
    }

    if (searchParams.get("deleted") === "1") {
      setStatus("deleted");
      setContent({
        title: "Consola eliminada",
        message: "La consola se elimino correctamente del catalogo.",
      });
      return;
    }

    if (searchParams.get("edited") === "1") {
      const consoleName = searchParams.get("console") ?? "esta consola";
      const rawChanges = searchParams.get("changes") ?? "";
      const changes = rawChanges
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);

      setStatus("edited");
      setContent({
        title: "Consola actualizada",
        message: changes.length
          ? `Se actualizo "${consoleName}" con cambios en: ${changes.join(", ")}.`
          : `No hubo cambios visibles en "${consoleName}", pero la actualizacion se proceso correctamente.`,
      });
      return;
    }

    setStatus(null);
    setContent(null);
  }, [searchParams]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("created");
    params.delete("deleted");
    params.delete("edited");
    params.delete("console");
    params.delete("changes");
    const nextQuery = params.toString();

    setStatus(null);
    setContent(null);
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  if (!status || !content) return null;

  return (
    <SweetAlertModal
      open
      icon={<AlertSuccessIcon />}
      title={content.title}
      message={content.message}
      confirmLabel="Aceptar"
      onConfirm={handleClose}
    />
  );
}
