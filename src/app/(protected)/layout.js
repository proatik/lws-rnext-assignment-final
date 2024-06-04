import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }) => {
  const session = await auth();

  if (!session) redirect("/login");

  return <>{children}</>;
};

export default ProtectedLayout;
