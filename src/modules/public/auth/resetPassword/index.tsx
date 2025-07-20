import { useEffect, useState } from "react";
import { Input } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";
import ROUTES from "@/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPasswordMutation, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    if (token) {
      resetPasswordMutation({ ...data, token });
    }
  };

  useEffect(() => {
    document.title = "Reset Password | Note";
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center py-16 px-4 sm:px-0">
      <div className="px-4 w-full p-12 sm:px-12 bg-neutral-0 dark:bg-neutral-950 dark:border-neutral-800 max-w-[540px]  flex flex-col gap-4 border border-neutral-200 rounded-xl shadow-lg dark:shadow-none">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-preset-1 font-bold text-primary-text">
            Reset Your Password
          </h2>
          <p className="text-preset-4 text-secondary-text">
            Choose a new password to secure your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-6"
        >
          <Input
            postIcon={
              <span
                className="text-primary-text"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? (
                  <Eye width={20} height={20} />
                ) : (
                  <EyeClosed width={20} height={20} />
                )}
              </span>
            }
            label="New Password"
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password?.message}
            registerProps={register("password")}
            hint={errors.password?.message ? "" : "At least 8 characters"}
          />

          <Input
            postIcon={
              <span
                className="text-primary-text"
                onClick={() =>
                  setIsPasswordConfirmationVisible((prev) => !prev)
                }
              >
                {isPasswordVisible ? (
                  <Eye width={20} height={20} />
                ) : (
                  <EyeClosed width={20} height={20} />
                )}
              </span>
            }
            label="Confirm New Password"
            type={isPasswordConfirmationVisible ? "text" : "password"}
            error={errors.passwordConfirmation?.message}
            registerProps={register("passwordConfirmation")}
          />
          <Button
            type="submit"
            label={isPending ? "Resetting password..." : "Reset Password"}
            disabled={isPending}
          />
        </form>
      </div>
    </main>
  );
};
