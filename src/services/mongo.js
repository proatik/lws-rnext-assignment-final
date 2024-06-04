import mongoose from "mongoose";

let connection = null;

export const connectDatabase = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(process.env.MONGO_URI);

      console.log("Database Connected!");
    }

    return connection;
  } catch (error) {
    console.log(error);
  }
};
