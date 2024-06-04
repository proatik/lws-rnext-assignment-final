import { Schema, models, model } from "mongoose";

// define the category schema for the category model.
const categorySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// create index on the id field.
categorySchema.index({ id: 1 });

// create the category model based on the category schema.
const Category = models?.category ?? model("category", categorySchema);

export default Category;
