'use client';

import { createContext, FormEvent, ReactNode, useContext, useMemo, useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useRouter } from "next/navigation";
import AlertWarningIcon from "@/components/icons/AlertWarningIcon";
import SweetAlertModal from "@/components/SweetAlertModal";
import { GameFormFieldName, gameFormSchema, getGameFormValues } from "@/src/lib/game-form-schema";

type FieldErrorsMap = Partial<Record<GameFormFieldName, string[]>>;

type GameFormActionResult =
  | void
  | {
      error?: string;
      fieldErrors?: FieldErrorsMap;
      redirectTo?: string;
    };

interface ValidatedGameFormProps {
  action: (formData: FormData) => GameFormActionResult | Promise<GameFormActionResult>;
  children: ReactNode;
  className?: string;
}

const fieldLabels: Record<GameFormFieldName, string> = {
  title: "Title",
  developer: "Developer",
  genre: "Genre",
  price: "Price",
  releaseDate: "Release Date",
  console_id: "Console",
  description: "Description",
};

const ValidationErrorsContext = createContext<FieldErrorsMap>({});

export function GameFieldError({ name }: { name: GameFormFieldName }) {
  const errors = useContext(ValidationErrorsContext);
  const message = errors[name]?.[0];

  if (!message) return null;

  return <span className="mt-2 block text-xs font-medium text-rose-300">{message}</span>;
}

export default function ValidatedGameForm({
  action,
  children,
  className = "",
}: ValidatedGameFormProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsMap>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Campos incompletos");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const message = useMemo(() => {
    if (serverError) return serverError;

    const labels = Object.entries(fieldErrors)
      .filter(([, messages]) => messages?.length)
      .map(([fieldName]) => fieldLabels[fieldName as GameFormFieldName]);

    if (!labels.length) return "";
    return `Completa los siguientes campos antes de continuar: ${labels.join(", ")}.`;
  }, [fieldErrors, serverError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const parsed = gameFormSchema.safeParse(getGameFormValues(formData));

    if (!parsed.success) {
      setAlertTitle("Campos incompletos");
      setServerError("");
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrorsMap);
      setShowAlert(true);
      return;
    }

    setFieldErrors({});
    setShowAlert(false);
    setServerError("");
    setAlertTitle("No se pudo crear el juego");
    setIsSubmitting(true);

    try {
      const result = await action(formData);

      if (result?.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
        return;
      }

      if (result?.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        setFieldErrors(result.fieldErrors);
        setServerError(result.error ?? "");
        setAlertTitle("Campos incompletos");
        setShowAlert(true);
        return;
      }

      if (result?.error) {
        setServerError(result.error);
        setShowAlert(true);
      }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      setServerError("Ocurrio un error inesperado al guardar el juego. Intenta de nuevo.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ValidationErrorsContext.Provider value={fieldErrors}>
        <form onSubmit={handleSubmit} className={className} noValidate>
          {children}
        </form>
      </ValidationErrorsContext.Provider>

      <SweetAlertModal
        open={showAlert}
        icon={<AlertWarningIcon />}
        title={alertTitle}
        message={message}
        confirmLabel="Entendido"
        onConfirm={() => setShowAlert(false)}
        confirmClassName="btn min-w-32 border border-amber-400/30 bg-amber-500 text-white hover:bg-amber-400"
      />
    </>
  );
}
