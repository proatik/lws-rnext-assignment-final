// product model.
import Product from "@/models/products";

// database connection.
import { connectDatabase } from "@/services/mongo";

// count the number of products category wise.
export const countProducts = async () => {
  try {
    await connectDatabase();

    const count = await Product.aggregate([
      {
        $group: {
          _id: "$categoryId",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "id",
          as: "category",
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          name: {
            $arrayElemAt: ["$category.name", 0],
          },
          id: {
            $arrayElemAt: ["$category.id", 0],
          },
        },
      },
      {
        $sort: { id: 1 },
      },
    ]);

    return count;
  } catch (error) {
    return null;
  }
};

// get products based on the given filter.
export const getProducts = async ({ filter = {}, skip = 0, limit = 10 }) => {
  try {
    await connectDatabase();

    const products = await Product.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: {
            $arrayElemAt: ["$category.name", 0],
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
      { $project: { _id: 0, __v: 0 } },
    ]);

    return products;
  } catch (error) {
    return null;
  }
};

// get only the new arrival products.
export const getNewArrivalProducts = async () => {
  const options = {
    filter: { isNewArrival: true },
    limit: 8,
  };

  return await getProducts(options);
};

// get only the trending products.
export const getTrendingProducts = async () => {
  const options = {
    filter: { isTrending: true },
    limit: 8,
  };

  return await getProducts(options);
};

// get a single product only.
export const getProduct = async (productId) => {
  const options = {
    filter: { id: Number(productId) },
    limit: 1,
  };

  const products = await getProducts(options);

  return products.length ? products[0] : null;
};

// get all the related products of a product.
export const getRelatedProducts = async (categoryId, productId) => {
  const options = {
    filter: { categoryId, id: { $ne: productId } },
    limit: 10,
  };

  return await getProducts(options);
};

// filter and search products.
export const filterAndSearch = async (query) => {
  try {
    await connectDatabase();

    const { categoryId, priceMin, priceMax, search, page } = query;

    const categories = categoryId ? categoryId.split("-").map(Number) : [];
    const min = priceMin ? parseFloat(priceMin) : 0;
    const max = priceMax ? parseFloat(priceMax) : 100000;
    const searchTerm = search ? search : "";
    const currentPage = page ? parseInt(page, 10) : 1;
    const limit = 9;
    const skip = (currentPage - 1) * limit;

    // build the query.
    const filter = {
      ...(categories.length > 0 && { categoryId: { $in: categories } }),
      price: { $gte: min, $lte: max },
      ...(searchTerm && { name: { $regex: searchTerm, $options: "i" } }),
    };

    // fetch products from the database.
    const products = await getProducts({ filter, skip, limit });

    // get the total count for pagination.
    const totalCount = await Product.countDocuments(filter);

    return {
      ok: true,
      products,
      totalCount,
      currentPage,
      totalPages: Math.ceil(totalCount / limit),
      message: "Products fetched successfully",
    };
  } catch (error) {
    return { ok: false, message: "Failed to fetch products" };
  }
};
