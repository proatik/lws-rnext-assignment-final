"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const initialValues = {
  categories: [],
  priceMin: 0,
  priceMax: 100000,
};

const Sidebar = ({ count }) => {
  const [values, setValues] = useState(initialValues);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [errors, setError] = useState({ min: false, max: false });

  const { watch, register, setValue, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const isValid = (price) => price >= 0 && price <= 100000;

  const updateSearchParams = ({ categories, priceMin, priceMax }) => {
    const categoryId = categories
      .map((cat, index) => (cat ? index + 1 : 0))
      .filter((cat) => cat > 0);

    const query = {};

    if (isValid(priceMin)) query.priceMin = priceMin;
    if (isValid(priceMax)) query.priceMax = priceMax;
    if (categoryId?.length) query.categoryId = categoryId.join("-");

    return query;
  };

  const parseSearchParams = () => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const categoryId = searchParams.get("categoryId");

    const query = {};

    if (priceMin) query.priceMin = priceMin;
    if (priceMax) query.priceMax = priceMax;
    if (categoryId) {
      const categories = Array(6).fill(false);

      categoryId.split("-").forEach((cat) => {
        categories[cat - 1] = true;
      });

      query.categories = categories;
    }

    return query;
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setValues(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const { priceMax, priceMin } = values;
    setError({ min: !isValid(priceMin), max: !isValid(priceMax) });

    const query = updateSearchParams(values);
    const updatedParams = new URLSearchParams();

    for (const [key, val] of Object.entries(query)) {
      updatedParams.set(key, val);
    }

    const search = searchParams.get("search");
    if (search) updatedParams.set("search", search);

    router.push(`${pathname}?${updatedParams.toString()}`);
  }, [values]);

  useEffect(() => {
    const params = parseSearchParams();

    for (const [key, val] of Object.entries(params)) {
      setValue(key, val);
    }
  }, []);

  return (
    <div className="hidden col-span-1 px-4 pb-6 overflow-hidden bg-white rounded shadow md:block">
      <div className="space-y-5 divide-y divide-gray-200">
        <form onSubmit={handleSubmit((v) => console.log(v))}>
          <div>
            <h3 className="mb-3 text-xl font-medium text-gray-800 uppercase">
              Categories
            </h3>

            <div className="space-y-2">
              {count?.map(({ id, name, total }, index) => (
                <div key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`categories.${index}`}
                    {...register(`categories.${index}`)}
                    className="rounded-sm cursor-pointer text-primary focus:ring-transparent"
                  />
                  <label
                    htmlFor={`categories.${index}`}
                    className="ml-3 text-gray-600 cursor-pointer"
                  >
                    {name || ""}
                  </label>
                  <div className="ml-auto text-sm text-gray-600">
                    ({total || 0})
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="mb-3 text-xl font-medium text-gray-800 uppercase">
              Price
            </h3>
            <div className="flex items-center mt-4">
              <input
                min={0}
                max={100000}
                type="number"
                className={`w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0 ${
                  errors.min ? "bg-red-200 focus:border-transparent" : ""
                }`}
                {...register("priceMin", {
                  min: 0,
                  max: 100000,
                  valueAsNumber: true,
                })}
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                min={0}
                max={100000}
                type="number"
                className={`w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0 ${
                  errors.max ? "bg-red-200 focus:border-transparent" : ""
                }`}
                {...register("priceMax", {
                  min: 0,
                  max: 100000,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
