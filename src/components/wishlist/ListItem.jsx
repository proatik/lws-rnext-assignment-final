"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localforage from "@/utils/localforage";

// font-awesome
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// actions.
import { getCart, addToCart } from "@/actions/carts";
import { getWishlist, removeFromWishlist } from "@/actions/wishlists";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

// utility functions.
import { notify } from "@/utils";

// configurations.
import configs from "@/configs";

const ListItem = ({ product }) => {
  const router = useRouter();
  const { user, setCart, setWishlist } = useMainContext();

  const handleAddToCart = async () => {
    const { productId } = product;
    const item = { productId, quantity: 1 };

    if (!user) {
      const task = { target: "cart", item };
      localforage.setItem("task", task);

      setTimeout(async () => {
        localforage.removeItem("task");
      }, configs.taskTimer);

      router.push("/login");
    } else {
      const { ok, message } = await addToCart(user?.id, item);

      const type = ok ? "success" : "error";
      notify({ type, message });

      if (ok) {
        const { data: cart } = await getCart(user?.id);
        setCart(cart);
      }
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!user) {
      router.push("/login");
    } else {
      const { ok, message } = await removeFromWishlist(
        user?.id,
        product?.productId
      );

      const type = ok ? "success" : "error";
      notify({ type, message });

      if (ok) {
        const { data } = await getWishlist(user?.id);
        setWishlist(data);
      }
    }
  };

  const isInStock = (product?.stock || 0) > 0;

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

      <div className="w-1/3">
        <Link href={`/products/${product?.productId}`}>
          <h2 className="text-xl font-medium text-gray-800 uppercase">
            {product?.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">
          Availability:{" "}
          {isInStock ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
      </div>

      <div className="text-lg font-semibold text-primary">
        ${product?.discountPrice || 0}
      </div>
      <button
        disabled={!isInStock}
        onClick={handleAddToCart}
        className="px-6 py-2 text-sm font-medium text-center text-white uppercase transition-all border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto disabled:cursor-not-allowed disabled:bg-red-400 disabled:border-red-400 disabled:hover:text-white"
      >
        add to cart
      </button>
      <button
        onClick={handleRemoveFromWishlist}
        className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-primary bg-slate-200/50 hover:bg-slate-200"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ListItem;
