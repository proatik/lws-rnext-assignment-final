import { Schema, models, model } from "mongoose";

// define the item schema for the cart items.
const itemSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// define the cart schema for the cart model.
const cartSchema = new Schema(
  {
    id: {
      type: Number,
      default: Date.now(),
    },
    userId: {
      type: Number,
      required: true,
    },
    items: {
      type: [itemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// create indexes on the id and userId fields.
cartSchema.index({ id: 1 });
cartSchema.index({ userId: 1 });

// create the cart model based on the cart schema.
const Cart = models?.cart ?? model("cart", cartSchema);

export default Cart;
