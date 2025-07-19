import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Old password must be at least 8 characters long" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirmation: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
