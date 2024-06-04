import { Schema, models, model } from "mongoose";

// define the user schema for the user model.
const userSchema = new Schema({
  id: {
    type: Number,
    default: () => {
      return Date.now();
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
    enum: ["google", "credentials"],
  },
});

// create index on the id field.
userSchema.index({ id: 1 });

// create the user model based on the user schema.
const User = models?.user ?? model("user", userSchema);

export default User;
