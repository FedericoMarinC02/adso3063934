'use client';

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SweetAlertModalProps {
  open: boolean;
  icon: ReactNode;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
  confirmClassName?: string;
}

export default function SweetAlertModal({
  open,
  icon,
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  confirmClassName = "btn btn-primary min-w-32 text-white",
}: SweetAlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !isMounted) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open, isMounted]);

  if (!open || !isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10">
      <div className="flex min-h-full items-center justify-center">
        <div
          role="alertdialog"
          aria-modal="true"
          className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-base-200 p-6 text-center shadow-2xl sm:p-8"
        >
          <div className="max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 sm:max-h-[min(38rem,calc(100vh-5rem))]">
            <div className="mb-6 flex justify-center">{icon}</div>
            <h2 className="text-balance text-2xl font-black tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 break-words text-sm leading-7 text-white/65 sm:text-base">
              {message}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {onCancel ? (
              <button type="button" onClick={onCancel} className="btn btn-ghost w-full sm:w-auto sm:min-w-32">
                {cancelLabel ?? "Cancel"}
              </button>
            ) : null}
            <button type="button" onClick={onConfirm} className={`${confirmClassName} w-full sm:w-auto`}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
