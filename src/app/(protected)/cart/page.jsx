// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import Cart from "@/components/cart/Cart";

export const metadata = {
  title: "Lws Kart | Cart",
  description:
    "Review and manage the items in your shopping cart. All selected products will be included in your order. Happy shopping!",
};

const CartPage = () => {
  return (
    <>
      <Breadcrumb label="Cart" />
      <div className="container gap-6 pt-4 pb-16">
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
