"use client";

import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// form validation schema.
const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name is required" })
    .min(2, { message: "First must be at least 2 characters long" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last Name is required" })
    .min(2, { message: "Last must be at least 2 characters long" }),

  company: z.string().trim(),
  region: z.string().trim(),
  address: z.string().trim(),
  city: z.string().trim(),
  phone: z.string().trim(),
  email: z.string().trim().toLowerCase(),
});

const initialSate = {
  firstName: "",
  lastName: "",
  company: "",
  region: "",
  address: "",
  city: "",
  phone: "",
  email: "",
};

const CheckoutInfo = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialSate,
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <div className="col-span-8 p-4 border border-gray-200 rounded">
      <h3 className="mb-4 text-lg font-medium capitalize">Checkout</h3>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firsName" className="text-gray-600">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-box"
              {...register("firstName")}
            />
            <p
              className={`text-xs text-red-600 mt-2 ${
                errors?.firstName ? "block" : "hidden"
              }`}
              id="email-error"
            >
              {errors?.firstName?.message}
            </p>
          </div>

          <div>
            <label htmlFor="lastName" className="text-gray-600">
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-box"
              {...register("lastName")}
            />
            <p
              className={`text-xs text-red-600 mt-2 ${
                errors?.lastName ? "block" : "hidden"
              }`}
              id="email-error"
            >
              {errors?.lastName?.message}
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="company" className="text-gray-600">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="input-box"
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="region" className="text-gray-600">
            Region
          </label>
          <input
            type="text"
            id="region"
            name="region"
            className="input-box"
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="input-box"
            {...register("city")}
          />
        </div>

        <div>
          <label htmlFor="address" className="text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="input-box"
            {...register("address")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-gray-600">
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input-box"
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-box"
            {...register("email")}
          />
        </div>

        <button
          type="reset"
          onClick={reset}
          className="block w-full py-2 font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
        >
          Reset
        </button>

        <button type="submit" hidden>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutInfo;
