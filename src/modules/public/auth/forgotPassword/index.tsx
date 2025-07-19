import { useEffect } from "react";
import { Input } from "../../../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components";
import {
  type ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/auth";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPasswordMutation, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    forgotPasswordMutation(data);
  };

  useEffect(() => {
    document.title = "Forgot Password | Note";
  }, []);

  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center py-16 px-4 sm:px-0">
      <div className="px-4 w-full p-12 sm:px-12 bg-neutral-0 dark:bg-neutral-950 dark:border-neutral-800 max-w-[540px]  flex flex-col gap-4 border border-neutral-200 rounded-xl shadow-lg dark:shadow-none">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-preset-1 font-bold text-primary-text">
            Forgotten your password?
          </h2>
          <p className="text-preset-4 text-secondary-text">
            Enter your email below, and we’ll send you a link to reset it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-6"
        >
          <Input
            placeholder="email@@example.com"
            label="Email Address"
            registerProps={register("email")}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            label={isPending ? "Sending reset link..." : "Send Reset Link"}
            disabled={isPending}
          />
        </form>
      </div>
    </main>
  );
};
