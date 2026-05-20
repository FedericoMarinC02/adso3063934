import { z } from "zod";

export const gameFormSchema = z.object({
  title: z.string().trim().min(1, "Este campo es requerido"),
  developer: z.string().trim().min(1, "Este campo es requerido"),
  genre: z.string().trim().min(1, "Este campo es requerido"),
  price: z
    .string()
    .trim()
    .min(1, "Este campo es requerido")
    .refine((value) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed >= 0;
    }, "Ingresa un precio valido"),
  releaseDate: z.string().trim().min(1, "Este campo es requerido"),
  console_id: z
    .string()
    .trim()
    .min(1, "Este campo es requerido")
    .refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, "Este campo es requerido"),
  description: z.string().trim().min(1, "Este campo es requerido"),
});

export type GameFormFieldName = keyof z.infer<typeof gameFormSchema>;

export function getGameFormValues(formData: FormData) {
  return {
    title: formData.get("title")?.toString() ?? "",
    developer: formData.get("developer")?.toString() ?? "",
    genre: formData.get("genre")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    releaseDate: formData.get("releaseDate")?.toString() ?? "",
    console_id: formData.get("console_id")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
  };
}
