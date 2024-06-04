import { auth } from "@/auth";
import { redirect } from "next/navigation";

const PublicLayout = async ({ children }) => {
  const session = await auth();

  if (session) redirect("/account");

  return <>{children}</>;
};

export default PublicLayout;
