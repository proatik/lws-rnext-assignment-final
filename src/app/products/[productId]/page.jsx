// react components.
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductDetails from "@/components/products/ProductDetails";
import Description from "@/components/products/Description";
import RelatedProducts from "@/components/products/RelatedProducts";

// library function.
import { getProduct } from "@/lib/products";

export async function generateMetadata({ params: { productId } }) {
  const product = await getProduct(productId);

  const shareUrl = process.env.BASE_URL + `/products/${productId}`;

  return {
    title: `Lws Kart | ${product?.name || "404"}`,
    description: product?.description || "Product doesn't exist.",
    brand: product?.brand,
    openGraph: {
      title: product?.name,
      description: product?.description,
      type: "article",
      url: shareUrl,
      images: [{ url: product?.images?.at(0) }],
    },
  };
}

const ProductPage = async ({ params: { productId } }) => {
  const product = await getProduct(productId);

  return (
    <>
      <Breadcrumb label="Products" />
      <ProductDetails product={product} />
      <Description />
      <RelatedProducts product={product} />
    </>
  );
};

export default ProductPage;
