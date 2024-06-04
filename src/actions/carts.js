"use server";

import { revalidatePath } from "next/cache";

// library functions.
import * as cart from "@/lib/carts";

// NOTE: all working.

// get all the product from the cart of a user.
export const getCart = async (userId) => {
  const result = await cart.getCart(userId);

  return result;
};

// add a product to the cart of a user.
export const addToCart = async (userId, item, op) => {
  const result = await cart.addToCart(userId, item, op);

  if (result.ok) {
    revalidatePath("/cart", "page");
    revalidatePath("/products", "page");
  }

  return result;
};

// remove a product from the cart of a user.
export const removeFromCart = async (userId, productId) => {
  const result = await cart.removeFromCart(userId, productId);

  if (result.ok) {
    revalidatePath("/cart", "page");
    revalidatePath("/products", "page");
  }

  return result;
};
