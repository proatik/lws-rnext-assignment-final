"use server";

import { revalidatePath } from "next/cache";

// library functions.
import * as wishlist from "@/lib/wishlists";

// NOTE: all working.

// get all the product from the wishlist of a user.
export const getWishlist = async (userId) => {
  const result = await wishlist.getWishlist(userId);

  return result;
};

// add a product to the wishlist of a user.
export const addToWishlist = async (userId, item) => {
  const result = await wishlist.addToWishlist(userId, item);

  if (result.ok) revalidatePath("/wishlist", "page");

  return result;
};

// remove a product from the wishlist of a user.
export const removeFromWishlist = async (userId, productId) => {
  const result = await wishlist.removeFromWishlist(userId, productId);

  if (result.ok) revalidatePath("/wishlist", "page");

  return result;
};
