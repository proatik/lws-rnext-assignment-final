// product model.
import Wishlist from "@/models/wishlists";

// database connection.
import { connectDatabase } from "@/services/mongo";

// NOTE: all working.

// get all the product from the wishlist of a user.
export const getWishlist = async (userId) => {
  try {
    await connectDatabase();

    const wishlist = await Wishlist.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "products",
          localField: "items",
          foreignField: "id",
          as: "items",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                productId: "$$item.id",
                name: "$$item.name",
                images: "$$item.images",
                price: "$$item.price",
                stock: "$$item.stock",
                discountPrice: "$$item.discountPrice",
              },
            },
          },
        },
      },
      { $project: { _id: 0, __v: 0 } },
    ]);

    return {
      ok: true,
      message: "Wishlist fetched successfully",
      data: wishlist[0] || null,
    };
  } catch (error) {
    return { ok: true, message: "Failed to fetch the wishlist", data: null };
  }
};

// add a product to the wishlist of a user.
export const addToWishlist = async (userId, productId) => {
  try {
    await connectDatabase();

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      const newWishlist = new Wishlist({
        userId,
        items: [productId],
      });

      wishlist = await newWishlist.save();
    } else {
      const isExist = wishlist.items.includes(productId);

      if (!isExist) {
        wishlist.items.push(productId);
        await wishlist.save();
      }
    }

    return { ok: true, message: "Item added to the wishlist" };
  } catch (error) {
    return { ok: false, message: "Failed to add item to the wishlist" };
  }
};

// remove a product from the wishlist of a user.
export const removeFromWishlist = async (userId, productId) => {
  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) return { ok: false, message: "Wishlist not found" };

    const isExist = wishlist.items.includes(productId);

    if (isExist) {
      wishlist.items.pull(productId);

      await wishlist.save();
    }

    return { ok: true, message: "Item removed form the wishlist" };
  } catch (error) {
    return { ok: false, message: "Failed to remove item from the wishlist" };
  }
};
