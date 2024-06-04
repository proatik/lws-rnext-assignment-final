import { auth } from "@/auth";

// react components.
import ListItem from "./ListItem";

// actions.
import { getWishlist } from "@/actions/wishlists";

const Wishlist = async () => {
  const { user } = (await auth()) || {};
  const { data } = (await getWishlist(user?.id)) || {};
  const sortedItems =
    data?.items?.sort((a, b) => a?.productId - b?.productId) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:min-h-80">
      {!sortedItems?.length && (
        <div className="flex items-center justify-center gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
          <span>Your wishlist is</span>
          <span className="text-violet-600">null</span>
        </div>
      )}

      {sortedItems?.map((product) => (
        <ListItem key={product?.productId} product={product} />
      ))}
    </div>
  );
};

export default Wishlist;
