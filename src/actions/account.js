"use server";

// library functions.
import * as account from "@/lib/accounts";

// get all the product from the cart of a user.
export const getCart = async (userId) => {
  const result = await account.getAccount(userId);

  return result;
};

// update the account of a user.
export const updateAccount = async (userId, updateDate) => {
  const result = await account.updateAccount(userId, updateDate);

  return result;
};
