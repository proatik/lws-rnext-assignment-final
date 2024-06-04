// category model.
import Category from "@/models/categories";

// database connection.
import { connectDatabase } from "@/services/mongo";

// get all the categories.
export const getCategories = async () => {
  try {
    await connectDatabase();

    const categories = await Category.find({}).select("-_id");

    return categories;
  } catch (error) {
    return null;
  }
};
