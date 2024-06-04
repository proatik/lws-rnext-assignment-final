"use client";

import Image from "next/image";
import { useState } from "react";
import localforage from "@/utils/localforage";
import { usePathname, useRouter } from "next/navigation";

// icons/images.
import PlaceholderTwo from "/public/placeholder-2.png";
import PlaceholderThree from "/public/placeholder-3.png";

// font-awesome
import {
  faStar,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// react-share buttons.
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

// actions.
import { getCart, addToCart } from "@/actions/carts";
import { getWishlist, addToWishlist } from "@/actions/wishlists";

// utility function.
import { notify } from "@/utils";

import configs from "@/configs";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setCart, setWishlist } = useMainContext();

  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const ratings = Array.from(
    { length: Math.round(product?.ratings || 0) },
    (_, i) => i + 1
  );

  const isInStock = (product?.stock || 0) > 0;
  const url = process.env.NEXT_PUBLIC_BASE_URL + pathname;

  console.log(url);

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
    <div className="container grid grid-cols-2 gap-6">
      <div>
        <Image
          priority
          width={612}
          height={553}
          alt="feature image"
          className="w-full border"
          src={product?.images?.at(selected) || PlaceholderTwo}
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {product?.images?.map((image, index) => (
            <Image
              key={index}
              height={80}
              width={108}
              alt={`image-${index + 1}`}
              src={image || PlaceholderThree}
              onClick={() => setSelected(index)}
              className={`w-full border cursor-pointer ${
                index === selected ? "border-primary opacity-50" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-3xl font-medium uppercase">
          {product?.name || ""}
        </h2>
        <div className="flex items-center mb-4">
          <div className="flex gap-1 text-sm text-yellow-400">
            {ratings?.map((star) => (
              <span key={star}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            ))}
          </div>
          <div className="ml-3 text-xs text-gray-500">
            ({product?.totalReviews || 0}) Reviews
          </div>
        </div>

        <div className="space-y-2">
          <p className="space-x-2 font-semibold text-gray-800">
            Availability:{" "}
            {isInStock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <p className="space-x-2">
            <span className="font-semibold text-gray-800">Brand: </span>
            <span className="text-gray-600">{product?.brand || ""}</span>
          </p>
          <p className="space-x-2">
            <span className="font-semibold text-gray-800">Category: </span>
            <span className="text-gray-600">{product?.category || ""}</span>
          </p>
          <p className="space-x-2">
            <span className="font-semibold text-gray-800">SKU: </span>
            <span className="text-gray-600">{product?.sku || ""}</span>
          </p>
        </div>

        <div className="flex items-baseline mt-4 mb-1 space-x-2 font-roboto">
          <p className="text-xl font-semibold text-primary">
            ${product?.discountPrice || 0}
          </p>
          <p className="text-base text-gray-400 line-through">
            ${product?.price || 0}
          </p>
        </div>
        <p className="mt-4 text-gray-600">{product?.description || ""}</p>

        {/* quantity */}
        <div className="mt-4">
          <h3 className="mb-1 text-sm text-gray-800 uppercase">Quantity</h3>
          <div className="flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max">
            <button
              disabled={quantity < 2}
              onClick={() => setQuantity(quantity - 1)}
              className="flex items-center justify-center w-8 h-8 text-xl transition-all cursor-pointer select-none hover:bg-slate-200 disabled:hover:cursor-not-allowed disabled:bg-slate-200/50 disabled:hover:bg-slate-200/50"
            >
              -
            </button>
            <div className="flex items-center justify-center w-8 h-8 text-base">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex items-center justify-center w-8 h-8 text-xl transition-all cursor-pointer select-none hover:bg-slate-200 disabled:hover:cursor-not-allowed disabled:bg-slate-200/50 disabled:hover:bg-slate-200/50"
            >
              +
            </button>
          </div>
        </div>

        {/* cart & wishlist  */}
        <div className="flex gap-3 pt-5 pb-5 mt-6 border-b border-gray-200">
          <button
            disabled={!isInStock}
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-8 py-2 font-medium text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary"
          >
            <FontAwesomeIcon icon={faBagShopping} />
            <i className="fa-solid fa-bag-shopping" /> Add to cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-2 px-8 py-2 font-medium text-gray-600 uppercase transition border border-gray-300 rounded hover:text-primary"
          >
            <FontAwesomeIcon icon={faHeart} /> Wishlist
          </button>
        </div>

        {/* social share */}
        <div className="flex gap-3 mt-4">
          <FacebookShareButton url={url}>
            <span className="flex items-center justify-center w-10 h-10 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
              <Image
                width={40}
                height={40}
                alt="faceook"
                src="/facebook.png"
                title="Facebook Share"
              />
            </span>
          </FacebookShareButton>

          <LinkedinShareButton url={url}>
            <span className="flex items-center justify-center w-10 h-10 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
              <Image
                width={40}
                height={40}
                alt="linkedin"
                src="/linkedin.png"
                title="Linkedin Share"
              />
            </span>
          </LinkedinShareButton>

          <TelegramShareButton url={url}>
            <span className="flex items-center justify-center w-10 h-10 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
              <Image
                width={40}
                height={40}
                alt="telegram"
                src="/telegram.png"
                title="Telegram Share"
              />
            </span>
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
