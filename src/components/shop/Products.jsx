// react components.
import Pagination from "./Pagination";
import ProductCard from "@/components/shared/ProductCard";

const Products = ({ products, stats }) => {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {!Boolean(products?.length) && (
          <div className="flex items-center justify-center col-span-3 gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
            <span>
              Oops! It seems there are no products matching your search
            </span>
          </div>
        )}

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {Boolean(products?.length) && <Pagination stats={stats} />}
    </div>
  );
};

export default Products;
