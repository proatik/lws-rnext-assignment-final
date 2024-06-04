"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localforage from "@/utils/localforage";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

// actions.
import { getCart, addToCart, removeFromCart } from "@/actions/carts";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

// utility functions.
import { notify } from "@/utils";

// configurations.
import configs from "@/configs";

const CartItem = ({ product }) => {
  const router = useRouter();
  const { user, setCart } = useMainContext();

  const handleAddToCart = async (quantity, op) => {
    const { productId } = product || {};
    const item = { productId, quantity };

    if (!user) {
      const task = { target: "cart", item, op };
      localforage.setItem("task", task);

      setTimeout(async () => {
        localforage.removeItem("task");
      }, configs.taskTimer);

      router.push("/login");
    } else {
      const { ok, message } = await addToCart(user?.id, item, op);
      const type = ok ? "success" : "error";

      notify({ type, message });
    }
  };

  const handleRemoveFromCart = async () => {
    if (!user) router.push("/login");
    else {
      const { ok, message } = await removeFromCart(
        user?.id,
        product?.productId
      );
      const type = ok ? "success" : "error";

      notify({ type, message });

      if (ok) {
        const { data: cart } = await getCart(user?.id);
        setCart(cart);
      }
    }
  };

  return (
    <div className="flex items-center justify-between gap-6 p-4 border border-gray-200 rounded">
      <div className="w-28">
        <Link href={`/products/${product?.productId}`}>
          <Image
            height={82}
            width={112}
            className="w-full"
            alt="product image"
            src={product?.images?.at(0) || ""}
          />
        </Link>
      </div>

      <div className="w-1/4 text-ellipsis">
        <Link href={`/products/${product?.productId}`}>
          <h2 className="text-xl font-medium text-gray-800 uppercase">
            {product?.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">
          Unit Price:{" "}
          <span className="text-red-600">${product?.discountPrice || 0}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={product?.quantity <= 1}
          onClick={() => handleAddToCart(-1, "dec")}
          className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-green-600 bg-slate-200/50 hover:bg-slate-200 disabled:cursor-not-allowed disabled:hover:bg-slate-200/50 disabled:hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="px-6 py-1 border rounded-md border-1 border-slate-300">
          {product?.quantity || 0}
        </span>
        <button
          onClick={() => handleAddToCart(1, "inc")}
          className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-green-600 bg-slate-200/50 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="text-lg font-semibold text-center w-28 text-primary">
        ${((product?.discountPrice || 0) * product?.quantity).toFixed(2)}
      </div>
      <button
        onClick={handleRemoveFromCart}
        className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-primary bg-slate-200/50 hover:bg-slate-200"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default CartItem;
