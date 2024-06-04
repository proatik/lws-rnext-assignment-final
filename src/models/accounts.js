import { Schema, models, model } from "mongoose";

// define the address schema for the shipping and billing addresses.
const addressSchema = new Schema({
  fullName: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

// define the account schema for the account model.
const accountSchema = new Schema(
  {
    id: {
      type: Number,
      default: () => {
        return Date.now();
      },
    },
    userId: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    shippingAddress: {
      type: addressSchema,
    },
    billingAddress: {
      type: addressSchema,
    },
  },
  { timestamps: true }
);

// Create indexes on the id and userId fields.
accountSchema.index({ id: 1 });
accountSchema.index({ useId: 1 });

// Create the account model based on the account schema.
const Account = models?.account ?? model("account", accountSchema);

export default Account;
