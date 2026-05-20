import { z } from "zod";

export const consoleFormSchema = z.object({
  name: z.string().trim().min(1, "Este campo es requerido"),
  manufacturer: z.string().trim().min(1, "Este campo es requerido"),
  releaseDate: z.string().trim().min(1, "Este campo es requerido"),
  description: z.string().trim().min(1, "Este campo es requerido"),
});

export type ConsoleFormFieldName = keyof z.infer<typeof consoleFormSchema>;

export function getConsoleFormValues(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    manufacturer: formData.get("manufacturer")?.toString() ?? "",
    releaseDate: formData.get("releaseDate")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
  };
}
