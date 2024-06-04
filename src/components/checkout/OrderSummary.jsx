import { getCart } from "@/actions/carts";

const OrderSummary = async () => {
  const { data } = (await getCart(1)) || {};
  const sortedItems =
    data?.items?.sort((a, b) => a?.productId - b?.productId) || [];

  const totalPrice = sortedItems?.reduce(
    (total, { discountPrice, quantity }) => {
      return total + discountPrice * quantity;
    },
    0
  );

  return (
    <div className="col-span-4 p-4 border border-gray-200 rounded">
      <h4 className="mb-4 text-lg font-medium text-gray-800 uppercase">
        order summary
      </h4>
      <div className="space-y-4">
        {sortedItems?.map((item) => (
          <table className="w-full">
            <tbody>
              <tr className="py-1">
                <td className="w-2/3 text-ellipsis text-nowrap">
                  {item?.name || ""}
                </td>
                <td className="text-center">x{item?.quantity || 0}</td>
                <td className="text-right">${item?.price || 0}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      <div className="flex justify-between py-3 mt-1 font-medium text-gray-800 border-b border-gray-200 uppercas">
        <p>subtotal</p>
        <p>${totalPrice}</p>
      </div>
      <div className="flex justify-between py-3 mt-1 font-medium text-gray-800 border-b border-gray-200 uppercas">
        <p>shipping</p>
        <p>Free</p>
      </div>

      <div className="flex justify-between py-3 font-medium text-gray-800 uppercas">
        <p className="font-semibold">Total</p>
        <p>${totalPrice}</p>
      </div>

      <div className="flex items-center mt-2 mb-4">
        <input
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="w-3 h-3 rounded-sm cursor-pointer text-primary focus:ring-transparent"
        />
        <label
          htmlFor="aggrement"
          className="ml-3 text-sm text-gray-600 cursor-pointer"
        >
          I agree to the{" "}
          <a href="#" className="text-primary">
            terms &amp; conditions
          </a>
        </label>
      </div>

      <button className="block w-full px-4 py-3 font-medium text-center text-white transition border rounded-md bg-primary border-primary hover:bg-transparent hover:text-primary">
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;
