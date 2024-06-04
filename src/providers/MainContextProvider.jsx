"use client";

import { useEffect, useState } from "react";
import localforage from "@/utils/localforage";

// main context.
import { MainContext } from "@/contexts/MainContext";

// actions.
import { getCart } from "@/actions/carts";
import { getWishlist } from "@/actions/wishlists";

const MainContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState({});

  const initiateData = async () => {
    const { data: cart } = await getCart(user?.id);
    const { data: wishlist } = await getWishlist(user?.id);

    setCart(cart);
    setWishlist(wishlist);
  };

  const updateUser = async () => {
    const loggedInUser = localforage.getItem("user");
    if (loggedInUser) setUser(loggedInUser);
  };

  const states = {
    user,
    cart,
    wishlist,

    setUser,
    setCart,
    setWishlist,
  };

  useEffect(() => {
    if (user) initiateData();
  }, [user]);

  useEffect(() => {
    updateUser();
  }, []);

  return <MainContext.Provider value={states}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
