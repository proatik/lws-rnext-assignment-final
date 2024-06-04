// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import CheckoutInfo from "@/components/checkout/CheckoutInfo";
import OrderSummary from "@/components/checkout/OrderSummary";

export const metadata = {
  title: "Lws Kart | Checkout",
  description:
    "Review and complete all necessary information before placing your order. Happy shopping!",
};

const CheckoutPage = () => {
  return (
    <>
      <Breadcrumb label="Checkout" />
      <div className="container grid items-start grid-cols-12 gap-6 pt-4 pb-16">
        <CheckoutInfo />
        <OrderSummary />
      </div>
    </>
  );
};

export default CheckoutPage;
