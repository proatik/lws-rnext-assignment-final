"use client";

import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// icons/images.
import Logo from "/public/logo.svg";

// font-awesome.
import {
  faUser,
  faHeart,
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// custom hooks.
import useMainContext from "@/hooks/useMainContext";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [searchValue] = useDebounce(inputValue, 500);

  const { cart, wishlist, user } = useMainContext();

  const totalInCart = cart?.items?.length || 0;
  const totalInWishlist = wishlist?.items?.length || 0;

  const handleSearch = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (!inputValue) updatedParams.delete("search");
    else updatedParams.set("search", searchValue);

    if (updatedParams.size) router.push(`/shop/?${updatedParams.toString()}`);
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setInputValue(search);
  }, []);

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-32" />
        </Link>

        <div className="relative flex w-full max-w-xl">
          <span className="absolute hidden text-lg text-gray-400 md:inline left-4 top-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>

          <input
            value={inputValue}
            placeholder="search"
            onChange={(e) => setInputValue(e.target.value)}
            className="hidden w-full py-3 pl-12 pr-3 border border-r-0 border-primary rounded-l-md focus:outline-none md:flex"
          />
          <button className="items-center justify-center hidden px-8 text-white transition border bg-primary border-primary rounded-r-md hover:bg-transparent hover:text-primary md:flex">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/wishlist"
            className="relative flex flex-col items-center gap-1 px-2 py-1 text-center text-gray-700 transition rounded-md hover:text-primary"
          >
            <div className="text-2xl">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            {user && totalInWishlist > 0 && (
              <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 bg-primary">
                {totalInWishlist}
              </div>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex flex-col items-center gap-1 px-2 py-1 text-center text-gray-700 transition rounded-md hover:text-primary"
          >
            <div className="text-2xl">
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <div className="text-xs leading-3">Cart</div>
            {user && totalInCart > 0 && (
              <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -right-1 -top-1 bg-primary">
                {totalInCart}
              </div>
            )}
          </Link>

          <Link
            href="/account"
            className="relative flex flex-col items-center gap-1 px-2 py-1 text-center text-gray-700 transition rounded-md hover:text-primary"
          >
            <div className="text-2xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text-xs leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
