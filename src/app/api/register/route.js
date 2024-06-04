import { NextResponse } from "next/server";

// database connection.
import { connectDatabase } from "@/services/mongo";

// library functions.
import { getUser, createUserAndAccount } from "@/lib/users";

export async function POST(req) {
  const { fullName, email, password } = await req.json();

  if (!fullName) {
    return NextResponse.json(
      { ok: false, message: "Full Name address is required" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, message: "Email address is required" },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { ok: false, message: "Password is required" },
      { status: 400 }
    );
  }

  await connectDatabase();

  const existingUser = await getUser(email, "credentials");

  if (existingUser) {
    return NextResponse.json(
      { ok: false, message: "This email is already registered" },
      { status: 409 }
    );
  }

  await createUserAndAccount({
    fullName,
    email,
    password,
    provider: "credentials",
  });

  return NextResponse.json(
    { ok: true, message: "Account successfully created" },
    { status: 201 }
  );
}
