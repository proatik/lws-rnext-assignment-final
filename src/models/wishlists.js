import { Schema, models, model } from "mongoose";

// define the wishlist schema for the wishlist model.
const wishlistSchema = new Schema({
  id: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  userId: {
    type: Number,
    required: true,
  },
  items: {
    type: [Number],
    default: [],
  },
});

// create indexes on the id and userId fields.
wishlistSchema.index({ id: 1 });
wishlistSchema.index({ userId: 1 });

// create the wishlist model based on the wishlist schema.
const Wishlist = models?.wishlist ?? model("wishlist", wishlistSchema);

export default Wishlist;
