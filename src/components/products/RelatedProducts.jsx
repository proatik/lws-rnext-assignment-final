// react components.
import ProductCard from "@/components/shared/ProductCard";

// library functions.
import { getRelatedProducts } from "@/lib/products";

const RelatedProducts = async ({ product }) => {
  const { id: productId, categoryId } = product;

  const products = await getRelatedProducts(categoryId, productId);

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        Related products
      </h2>

      {!products?.length && (
        <div className="flex items-center justify-center gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
          <span>Related products are not available</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
