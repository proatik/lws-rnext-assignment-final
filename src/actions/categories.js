"use server";

// library functions.
import * as category from "@/lib/categories";

export const getCategories = async () => {
  return await category.getCategories();
};
