"use client";

import z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import localforage from "@/utils/localforage";
import { zodResolver } from "@hookform/resolvers/zod";

// icons/images.
import GoogleLogo from "/public/google.png";

// actions.
import { signInWithCredentials, getSession } from "@/actions/auth";

// utility functions.
import { notify } from "@/utils";

// main context.
import useMainContext from "@/hooks/useMainContext";

// form validation schema.
const formSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email address is required" })
    .email("Please provide a valid email address"),

  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useMainContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
  });

  // credentials login.
  const handleCredentialsLogin = async (values) => {
    setIsSubmitting(true);

    const { email, password } = values;

    try {
      const { ok, message } = await signInWithCredentials({ email, password });
      const type = ok ? "success" : "error";

      notify({ type, message });

      if (ok) {
        const { user } = await getSession();
        localforage.setItem("user", user);
        setUser(user);

        router.replace("/account");
      }
    } catch (error) {
      notify({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // google login.
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);

    try {
      await signIn("google", {
        redirect: false,
        callbackUrl: "/account",
      });
    } catch (error) {
      notify({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 contain">
      <div className="max-w-lg px-6 mx-auto overflow-hidden rounded shadow py-7">
        <h2 className="mb-1 text-2xl font-medium uppercase">Login</h2>
        <p className="mb-6 text-sm text-gray-600">welcome back customer</p>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleCredentialsLogin)}
        >
          <div className="space-y-2">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="youremail.@domain.com"
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("email")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.email ? "block" : "hidden"
                }`}
                id="email-error"
              >
                {errors?.email?.message}
              </p>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="*******"
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("password")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.password ? "block" : "hidden"
                }`}
                id="email-error"
              >
                {errors?.password?.message}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                className="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label
                htmlFor="remember"
                className="ml-3 text-gray-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link href="#" className="text-primary">
              Forgot password
            </Link>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full py-2 font-medium text-center text-white uppercase transition-all border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
            >
              Login
            </button>
          </div>
        </form>

        <div className="relative flex justify-center mt-6">
          <div className="relative z-10 px-3 text-gray-600 uppercase bg-white">
            Or login with
          </div>
          <div className="absolute left-0 w-full border-b-2 border-gray-200 top-3" />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            disabled={isSubmitting}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 py-1 text-sm font-medium text-center text-black uppercase transition-all bg-white border rounded font-roboto hover:shadow"
          >
            <Image className="w-9 h-9" src={GoogleLogo} alt="Google Logo" />
            google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don't have account?{" "}
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
