"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localforage from "@/utils/localforage";

// icons/images.
import StarIcon from "../icons/Star";
import HeartIcon from "../icons/Heart";
import PlaceholderOne from "/public/placeholder-1.png";
import MagnifyingGlassIcon from "../icons/MagnifyingGlass";

// actions.
import { getCart, addToCart } from "@/actions/carts";
import { getWishlist, addToWishlist } from "@/actions/wishlists";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

// configurations.
import configs from "@/configs";

// utility function.
import { notify } from "@/utils";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { user, setCart, setWishlist } = useMainContext();

  const ratings = Array.from(
    { length: Math.round(product?.ratings || 0) },
    (_, i) => i + 1
  );

  const handleAddToWishlist = async () => {
    const { id: productId } = product;

    if (!user) {
      const task = { target: "wishlist", productId };
      localforage.setItem("task", task);

      setTimeout(async () => {
        localforage.removeItem("task");
      }, configs.taskTimer);

      router.push("/login");
    } else {
      const { ok, message } = await addToWishlist(user?.id, productId);

      const type = ok ? "success" : "error";
      notify({ type, message });

      if (ok) {
        const { data } = await getWishlist(user?.id);
        setWishlist(data);
      }
    }
  };

  const handleAddToCart = async () => {
    const { id: productId } = product;
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

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white rounded shadow group">
      <div>
        <div className="relative">
          <Image
            width={230}
            height={170}
            alt="Product"
            className="w-full h-auto aspect-auto"
            src={product?.images?.at(0) || PlaceholderOne}
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 transition bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
            <Link
              href={`/products/${product?.id}`}
              className="flex items-center justify-center h-8 text-lg text-white transition rounded-full w-9 bg-primary hover:bg-gray-800"
              title="View Product"
            >
              <MagnifyingGlassIcon />
            </Link>

            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center h-8 text-lg text-white transition rounded-full w-9 bg-primary hover:bg-gray-800"
              title="Add to Wishlist"
            >
              <HeartIcon />
            </button>
          </div>
        </div>

        <div className="px-4 pt-4 pb-3">
          <Link href={`/products/${product?.id}`}>
            <h4 className="mb-2 text-xl font-medium text-gray-800 uppercase transition hover:text-primary">
              {product?.name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2">
            <p className="text-xl font-semibold text-primary">
              ${(product?.discountPrice || 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ${(product?.price || 0).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
              {ratings?.map((star) => (
                <span key={star}>
                  <StarIcon />
                </span>
              ))}
            </div>
            <div className="ml-3 text-xs text-gray-500">
              ({product?.totalReviews || 0})
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="block w-full py-1 text-center text-white transition border rounded-b bg-primary border-primary hover:bg-transparent hover:text-primary"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
