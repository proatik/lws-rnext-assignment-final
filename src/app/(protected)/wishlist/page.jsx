// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import Wishlist from "@/components/wishlist/Wishlist";

export const metadata = {
  title: "Lws Kart | Wishlist",
  description:
    "Keep track of your favorite items and dream purchases with our wishlist feature. Add products you love and explore them later. Happy shopping!",
};

const WishlistPage = () => {
  return (
    <>
      <Breadcrumb label="Wishlist" />
      <div className="container gap-6 pt-4 pb-16">
        <Wishlist />
      </div>
    </>
  );
};

export default WishlistPage;
