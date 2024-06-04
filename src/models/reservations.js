import { Schema, models, model } from "mongoose";

// configurations.
import config from "@/configs/index";

// define the reservation schema for reservation model.
const reservationSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  reservedAt: {
    type: Date,
    default: new Date(),
  },
  expiresAt: {
    type: Date,
    default: () => {
      return new Date(new Date().getTime() + config.reservationTime);
    },
  },
});

// create indexes on the userId and productId fields.
reservationSchema.index({ userId: 1 });
reservationSchema.index({ productId: 1 });

// create the reservation model based on the reservation schema.
const Reservation =
  models?.reservation ?? model("reservation", reservationSchema);

export default Reservation;
