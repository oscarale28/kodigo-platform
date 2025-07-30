import { z } from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z.string().email("Ingresa un email válido").min(1, "El email es requerido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
    ),
})

export const loginSchema = z.object({
  email: z.string().email("Ingresa un email válido").min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
