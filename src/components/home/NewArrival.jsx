// react components.
import ProductCard from "../shared/ProductCard";

// library function.
import { getNewArrivalProducts } from "@/lib/products";

const NewArrival = async () => {
  const products = await getNewArrivalProducts();

  return (
    <div>
      <div className="container pb-16">
        <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
          Top New Arrival
        </h2>

        {!products?.length && (
          <div className="flex items-center justify-center gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
            <span>New Arrival products are not available</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
