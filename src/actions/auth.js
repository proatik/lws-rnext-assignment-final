"use server";

import { auth, signIn, signOut } from "@/auth";

// library functions.
import { getUser, createUserAndAccount } from "@/lib/users";

// register a new with credentials.
export const registerUser = async (userData) => {
  try {
    const { fullName, email, password } = userData;

    if (!fullName) throw new Error("Full Name is required");
    if (!email) throw new Error("Email address is required");
    if (!password) throw new Error("Password is required");

    const existingUser = await getUser(email, "credentials");

    if (existingUser) throw new Error("This email is already registered");

    await createUserAndAccount({
      fullName,
      email,
      password,
      provider: "credentials",
    });

    return { ok: true, message: "Account successfully created" };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

// sign in with the credentials.
export const signInWithCredentials = async ({ email, password }) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return { ok: true, message: "Successfully logged in" };
  } catch (error) {
    return { ok: false, message: error.cause };
  }
};

export const signOutNow = async () => {
  try {
    await signOut({ redirect: false });

    return { ok: true, message: "Successfully logged out" };
  } catch (error) {
    return { ok: false, message: "Something went wrong" };
  }
};

// get and return the current session.
export const getSession = async () => {
  try {
    return await auth();
  } catch (error) {
    return null;
  }
};
