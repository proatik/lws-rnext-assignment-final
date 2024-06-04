// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import Sidebar from "@/components/shop/Sidebar";
import Products from "@/components/shop/Products";

export const metadata = {
  title: "Lws Kart | Shop",
  description:
    "Welcome to Lws Kart, your one-stop destination for high-quality furniture! Explore our wide range of stylish and functional pieces, from sofas and dining sets to bedroom furniture and home decor. Shop with confidence at Lws Kart and transform your living spaces today!",
};

// library functions.
import { countProducts, filterAndSearch } from "@/lib/products";

const ShopPage = async ({ searchParams }) => {
  const count = await countProducts();
  const { products, ...stats } = await filterAndSearch(searchParams);

  return (
    <>
      <Breadcrumb label="Shop" />
      <div className="container grid items-start grid-cols-2 gap-6 pt-4 pb-16 md:grid-cols-4">
        <Sidebar count={count} />
        <Products products={products} stats={stats} />
      </div>
    </>
  );
};

export default ShopPage;
