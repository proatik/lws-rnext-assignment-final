"use client";

import { useEffect, useRef } from "react";

import { useSession } from "next-auth/react";
import localforage from "@/utils/localforage";

// actions.
import { getCart, addToCart } from "@/actions/carts";
import { getWishlist, addToWishlist } from "@/actions/wishlists";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

// utility functions.
import { notify } from "@/utils";

const AccountInfo = () => {
  const { data, status } = useSession();
  const isInitialRender = useRef(true);
  const { user, setUser, setCart, setWishlist } = useMainContext();

  const manageUser = async () => {
    const existingUser = localforage.getItem("user");

    if (!existingUser && status === "authenticated") {
      setUser(data.user);
      localforage.setItem("user", data.user);
      notify({ type: "success", message: "Successfully logged in" });
    }
  };

  const manageTask = async () => {
    const task = localforage.getItem("task");

    if (task?.target === "wishlist") {
      const { ok, message } = await addToWishlist(user?.id, task?.productId);

      const type = ok ? "success" : "error";
      notify({ type, message });

      if (ok) {
        const { data } = getWishlist(user?.id);
        setWishlist(data);
      }
    } else if (task?.target === "cart") {
      const { ok, message } = await addToCart(user?.id, task?.item, task?.op);

      const type = ok ? "success" : "error";
      notify({ type, message });

      if (ok) {
        const { data: cart } = await getCart(user?.id);
        setCart(cart);
      }
    }

    localforage.removeItem("task");
  };

  useEffect(() => {
    manageUser();
  }, [data, status]);

  useEffect(() => {
    if (isInitialRender.current) isInitialRender.current = false;
    else if (user) {
      manageTask();
    }
  }, [user]);

  return (
    <div className="container items-start gap-6 pt-4 pb-16">
      <div className="grid max-w-5xl grid-cols-3 gap-4 mx-auto ">
        <div className="px-4 pt-6 pb-8 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Personal Profile
            </h3>
            <a href="#" className="text-primary">
              Edit
            </a>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-gray-700">John Doe</h4>
            <p className="text-gray-800">example@mail.com</p>
            <p className="text-gray-800">0811 8877 988</p>
          </div>
        </div>
        <div className="px-4 pt-6 pb-8 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Shipping address
            </h3>
            <a href="#" className="text-primary">
              Edit
            </a>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-gray-700">John Doe</h4>
            <p className="text-gray-800">Medan, North Sumatera</p>
            <p className="text-gray-800">20371</p>
            <p className="text-gray-800">0811 8877 988</p>
          </div>
        </div>
        <div className="px-4 pt-6 pb-8 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Billing address
            </h3>
            <a href="#" className="text-primary">
              Edit
            </a>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-gray-700">John Doe</h4>
            <p className="text-gray-800">Medan, North Sumatera</p>
            <p className="text-gray-800">20317</p>
            <p className="text-gray-800">0811 8877 988</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
