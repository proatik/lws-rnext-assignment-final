"use client";

import z from "zod";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// icons/images.
import GoogleLogo from "/public/google.png";

// actions.
import { registerUser } from "@/actions/auth";

// utility function.
import { notify } from "@/utils";

// form validation schema.
const formSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, { message: "Full Name is required" })
      .min(4, { message: "Full Name must be at least 4 characters long" }),
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
    confirm: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine(({ password, confirm }) => password === confirm, {
    path: ["confirm"],
    message: "The passwords did not match",
  });

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
  });

  // credentials register.
  const handleRegister = async (values) => {
    setIsSubmitting(true);

    const { fullName, email, password } = values;
    const userData = { fullName, email, password };

    try {
      if (fullName && email && password) {
        const { ok, message } = await registerUser(userData);
        const type = ok ? "success" : "error";

        notify({ type, message });

        if (ok) {
          router.replace("/login");
        }
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
        <h2 className="mb-1 text-2xl font-medium uppercase">
          Create an account
        </h2>
        <p className="mb-6 text-sm text-gray-600">Register for new customer</p>
        <form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-600">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Alex Lee"
                disabled={isSubmitting}
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("fullName")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.fullName ? "block" : "hidden"
                }`}
              >
                {errors?.fullName?.message}
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                disabled={isSubmitting}
                placeholder="youremail.@domain.com"
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("email")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.email ? "block" : "hidden"
                }`}
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
                disabled={isSubmitting}
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("password")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.password ? "block" : "hidden"
                }`}
              >
                {errors?.password?.message}
              </p>
            </div>

            <div>
              <label htmlFor="confirm" className="block mb-2 text-gray-600">
                Confirm password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="*******"
                disabled={isSubmitting}
                className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
                {...register("confirm")}
              />
              <p
                className={`text-xs text-red-600 mt-2 ${
                  errors?.confirm ? "block" : "hidden"
                }`}
              >
                {errors?.confirm?.message}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <input
                id="agreement"
                type="checkbox"
                name="agreement"
                className="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label
                htmlFor="agreement"
                className="ml-3 text-gray-600 cursor-pointer"
              >
                I have read and agree to the{" "}
                <Link href="#" className="text-primary">
                  terms &amp; conditions
                </Link>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full gap-3 py-2 font-medium text-center text-white uppercase transition-all border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto disabled:bg-primary disabled:text-white disabled:cursor-not-allowed disabled:opacity-80"
            >
              create account
            </button>
          </div>
        </form>

        <div className="relative flex justify-center mt-6">
          <div className="relative z-10 px-3 text-gray-600 uppercase bg-white">
            Or signup with
          </div>
          <div className="absolute left-0 w-full border-b-2 border-gray-200 top-3" />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            disabled={isSubmitting}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 py-1 text-sm font-medium text-center text-black uppercase transition-all bg-white border rounded font-roboto hover:shadow disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:shadow-none"
          >
            <Image className="w-9 h-9" src={GoogleLogo} alt="Google Logo" />
            google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link href="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
