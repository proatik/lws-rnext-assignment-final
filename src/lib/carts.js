import { startSession } from "mongoose";

// cart, product and reservation models.
import Cart from "@/models/carts";
import Product from "@/models/products";
import Reservation from "@/models/reservations";

// database connection.
import { connectDatabase } from "@/services/mongo";

// NOTE: all working.

// get all the product from cart of a user.
export const getCart = async (userId) => {
  await connectDatabase();

  try {
    const cart = await Cart.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                quantity: "$$item.quantity",
                product: {
                  $first: {
                    $filter: {
                      input: "$productDetails",
                      as: "product",
                      cond: { $eq: ["$$product.id", "$$item.productId"] },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                productId: "$$item.product.id",
                quantity: "$$item.quantity",
                name: "$$item.product.name",
                images: "$$item.product.images",
                price: "$$item.product.price",
                discountPrice: "$$item.product.discountPrice",
              },
            },
          },
        },
      },
      { $project: { _id: 0, __v: 0, productDetails: 0 } },
    ]);

    return {
      ok: true,
      message: "Cart fetched successfully",
      data: cart[0] || null,
    };
  } catch (error) {
    return { ok: true, message: "Failed to fetch the wishlist", data: null };
  }
};

// add a product to the cart of a user.
export const addToCart = async (userId, item, op) => {
  await connectDatabase();

  const session = await startSession();
  session.startTransaction();

  try {
    // fetch the product and check stock.
    const product = await Product.findOne({ id: item.productId }).session(
      session
    );

    if (!product || product.stock < item.quantity) {
      throw new Error("Insufficient stock");
    }

    // find or create the cart.
    let cart = await Cart.findOne({ userId }).session(session);

    if (!cart) {
      cart = new Cart({
        userId,
        items: [item],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        ({ productId }) => productId === item.productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save({ session });

    // check for existing reservation.
    let reservation = await Reservation.findOne({
      userId,
      productId: item.productId,
    }).session(session);

    if (reservation) {
      const newQuantity = cart.items.find(
        ({ productId }) => productId === item.productId
      ).quantity;

      const quantityDifference = newQuantity - reservation.quantity;

      // ensure there is enough stock for the new quantity.
      if (product.stock < quantityDifference) {
        throw new Error("Insufficient stock");
      }

      reservation.quantity = newQuantity;
      reservation.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes for testing.

      await reservation.save({ session });

      // adjust product stock.
      product.stock -= quantityDifference;
    } else {
      // create new reservation.
      reservation = new Reservation({
        userId,
        productId: item.productId,
        quantity: item.quantity,
        reservedAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes for testing.
      });

      await reservation.save({ session });

      // adjust product stock.
      product.stock -= item.quantity;
    }

    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    let message = "Item added to the cart";

    if (op === "inc") message = `Item quantity increased by 1`;
    else if (op === "dec") message = `Item quantity decreased by 1`;

    return { ok: true, message };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return { ok: false, message: error.message };
  }
};

// remove a product from the cart of a user.
export const removeFromCart = async (userId, productId) => {
  await connectDatabase();

  const session = await startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter((item) => item.productId !== productId);

    if (cart.items.length === initialItemCount) {
      throw new Error("Item not found in the cart");
    }

    await cart.save({ session });

    // find the corresponding reservation.
    const reservation = await Reservation.findOne({
      userId,
      productId,
    }).session(session);

    if (reservation) {
      const product = await Product.findOne({ id: productId }).session(session);

      if (product) {
        product.stock += reservation.quantity;
        await product.save({ session });
      }

      // remove the reservation.
      await Reservation.deleteOne({ userId, productId }).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    return { ok: true, message: "Item removed from the cart" };
  } catch (error) {
    await session.abortTransaction();

    return { ok: false, message: error.message };
  }
};
