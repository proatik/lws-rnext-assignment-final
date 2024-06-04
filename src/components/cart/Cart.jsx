import Link from "next/link";
import { auth } from "@/auth";

// react components.
import ListItem from "./ListItem";

// actions.
import { getCart } from "@/actions/carts";

const Cart = async () => {
  const { user } = (await auth()) || {};
  const { data } = (await getCart(user?.id)) || {};
  const sortedItems =
    data?.items?.sort((a, b) => a?.productId - b?.productId) || [];

  const count = sortedItems?.length;

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:min-h-80">
      {!Boolean(count) && (
        <div className="flex items-center justify-center gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
          <span>Your cart is</span>
          <span className="text-violet-600">null</span>
        </div>
      )}

      {Boolean(count) && (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded bg-slate-100/20">
          <span className="text-xl">
            Total items : {String(count).padStart(2, "0")}
          </span>

          <Link
            href="/checkout"
            className="px-4 py-2 text-center text-white transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary"
          >
            Checkout Now
          </Link>
        </div>
      )}

      {Boolean(count) &&
        sortedItems?.map((product) => (
          <ListItem key={product?.productId} product={product} />
        ))}
    </div>
  );
};

export default Cart;
