import { Schema, models, model } from "mongoose";

// define the product schema for the product model.
const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create indexes on the id and categoryId fields.
productSchema.index({ id: 1 });
productSchema.index({ categoryId: 1 });

// create the product model based on the product schema.
const Product = models?.product ?? model("product", productSchema);

export default Product;
