"use client";

import { createContext, FormEvent, ReactNode, useContext, useMemo, useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useRouter } from "next/navigation";
import AlertWarningIcon from "@/components/icons/AlertWarningIcon";
import SweetAlertModal from "@/components/SweetAlertModal";
import {
  ConsoleFormFieldName,
  consoleFormSchema,
  getConsoleFormValues,
} from "@/src/lib/console-form-schema";

type FieldErrorsMap = Partial<Record<ConsoleFormFieldName, string[]>>;

type ConsoleFormActionResult =
  | void
  | {
      error?: string;
      fieldErrors?: FieldErrorsMap;
      redirectTo?: string;
    };

interface ValidatedConsoleFormProps {
  action: (formData: FormData) => ConsoleFormActionResult | Promise<ConsoleFormActionResult>;
  children: ReactNode;
  className?: string;
}

const fieldLabels: Record<ConsoleFormFieldName, string> = {
  name: "Name",
  manufacturer: "Manufacturer",
  releaseDate: "Release Date",
  description: "Description",
};

const ValidationErrorsContext = createContext<FieldErrorsMap>({});

export function ConsoleFieldError({ name }: { name: ConsoleFormFieldName }) {
  const errors = useContext(ValidationErrorsContext);
  const message = errors[name]?.[0];

  if (!message) return null;

  return <span className="mt-2 block text-xs font-medium text-rose-300">{message}</span>;
}

export default function ValidatedConsoleForm({
  action,
  children,
  className = "",
}: ValidatedConsoleFormProps) {
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
      .map(([fieldName]) => fieldLabels[fieldName as ConsoleFormFieldName]);

    if (!labels.length) return "";
    return `Completa los siguientes campos antes de continuar: ${labels.join(", ")}.`;
  }, [fieldErrors]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const parsed = consoleFormSchema.safeParse(getConsoleFormValues(formData));

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
    setAlertTitle("No se pudo crear la consola");
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

      setServerError("Ocurrio un error inesperado al guardar la consola. Intenta de nuevo.");
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
