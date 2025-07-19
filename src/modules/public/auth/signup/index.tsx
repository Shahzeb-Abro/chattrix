import { useEffect, useState } from "react";

import { Input } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components";
import ROUTES from "@/constants/routes";
import { signUpSchema, type SignUpSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: registerAccount, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Data", data);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate(ROUTES.HOME);
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    registerAccount(data);
  };

  useEffect(() => {
    document.title = "Sign Up | Note";
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center py-16 px-4 sm:px-0">
      <div className="px-4 w-full p-12 sm:px-12 bg-neutral-0 dark:bg-neutral-950 dark:border-neutral-800 max-w-[540px]  flex flex-col gap-4 border border-neutral-200 rounded-xl shadow-lg dark:shadow-none">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-preset-1 font-bold text-primary-text">
            Create Your Account
          </h2>
          <p className="text-preset-4 text-secondary-text">
            Sign up to start organizing your notes and boost your productivity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-6"
        >
          <Input
            placeholder="John Doe"
            label="Name"
            registerProps={register("name")}
            error={errors.name?.message}
          />
          <Input
            placeholder="email@@example.com"
            label="Email Address"
            registerProps={register("email")}
            error={errors.email?.message}
          />
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
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password?.message}
            registerProps={register("password")}
            hint={errors.password?.message ? "" : "At least 8 characters"}
          />
          <Button
            type="submit"
            label={isPending ? "Signing up..." : "Sign up"}
          />
        </form>

        <div className="mt-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-4">
          <p className="text-preset-4 text-secondary-text">Or Log in with:</p>
          <div className="py-4 px-5 flex items-center justify-center h-12 rounded-xl border border-neutral-300 dark:border-neutral-600 self-stretch">
            <span className="px-4 text-primary-text">Google</span>
          </div>
        </div>

        <div className="mt-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-4">
          <p className="text-preset-4 text-secondary-text">
            Already have an account?{" "}
            <span className="text-primary-text">
              <Link to={ROUTES.LOGIN}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};
