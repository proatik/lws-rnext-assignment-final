// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import AccountInfo from "@/components/account/AccountInfo";

export const metadata = {
  title: "Lws Kart | Shop",
  description:
    "Welcome to Lws Kart, your one-stop destination for high-quality furniture! Explore our wide range of stylish and functional pieces, from sofas and dining sets to bedroom furniture and home decor. Shop with confidence at Lws Kart and transform your living spaces today!",
};

const AccountPage = async () => {
  return (
    <>
      <Breadcrumb label="Account" />
      <AccountInfo />
    </>
  );
};

export default AccountPage;
