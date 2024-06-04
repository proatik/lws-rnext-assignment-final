"use client";

import Link from "next/link";
import Image from "next/image";
import localforage from "@/utils/localforage";

// icons/images.
import Sofa from "/public/icons/sofa.svg";
import Terrace from "/public/icons/terrace.svg";
import Bed from "/public/icons/bed.svg";
import Office from "/public/icons/office.svg";
import Outdoor from "/public/icons/outdoor.svg";
import Mattress from "/public/icons/mattress.svg";

// font-awesome.
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//  custom hooks.
import useMainContext from "@/hooks/useMainContext";

// actions.
import { signOutNow } from "@/actions/auth";

// utility functions.
import { notify } from "@/utils";

const Navbar = () => {
  const { user, setUser } = useMainContext();

  // logout user.
  const handleLogout = async () => {
    try {
      const { ok, message } = await signOutNow();

      if (ok) {
        localforage.removeItem("user");
        setUser(null);

        notify({ type: "success", message });

        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
    } catch (error) {
      notify({ type: "error", message: "Something went wrong" });
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="relative items-center hidden px-8 py-4 cursor-pointer bg-primary md:flex group">
          <span className="inline-block text-white">
            <FontAwesomeIcon icon={faBars} />
          </span>

          {/* dropdown */}
          <div
            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: 300 }}
          >
            <Link
              href="/shop?categoryId=1"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image src={Sofa} alt="Sofa" className="object-contain w-5 h-5" />
              <span className="ml-6 text-sm text-gray-600">Sofa</span>
            </Link>

            <Link
              href="/shop?categoryId=2"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Terrace}
                alt="Terrace"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Terrace</span>
            </Link>

            <Link
              href="/shop?categoryId=3"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image alt="Bed" src={Bed} className="object-contain w-5 h-5" />
              <span className="ml-6 text-sm text-gray-600">Bed</span>
            </Link>

            <Link
              href="/shop?categoryId=4"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image
                alt="Office"
                src={Office}
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Office</span>
            </Link>

            <Link
              href="/shop?categoryId=5"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Outdoor}
                alt="Outdoor"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Outdoor</span>
            </Link>

            <Link
              href="/shop?categoryId=6"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image
                alt="Mattress"
                src={Mattress}
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Mattress</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between flex-grow h-16 md:pl-12">
          <div className="flex items-center h-full capitalize">
            <Link
              href="/"
              className="flex items-center justify-center h-full px-3 text-gray-200 transition hover:text-white hover:bg-primary/70"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="flex items-center justify-center h-full px-3 text-gray-200 transition hover:text-white hover:bg-primary/70"
            >
              Shop
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-full px-3 text-gray-200 transition hover:text-white hover:bg-primary/70"
            >
              About us
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-full px-3 text-gray-200 transition hover:text-white hover:bg-primary/70"
            >
              Contact us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xl font-bold text-orange-500">
                {user?.fullName || ""}
              </span>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-3 py-2 transition border rounded-md text-primary border-primary hover:bg-primary hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center px-3 py-2 text-green-500 transition border border-green-500 rounded-md hover:bg-green-500 hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
