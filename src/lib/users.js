import bcrypt from "bcryptjs";
import { startSession } from "mongoose";

// user and account models.
import User from "@/models/users";
import Account from "@/models/accounts";

// database connection.
import { connectDatabase } from "@/services/mongo";

// get an user by email and provider.
export const getUser = async (email, provider) => {
  try {
    await connectDatabase();

    return await User.findOne({ email, provider });
  } catch (error) {
    return null;
  }
};

// create a new user with.
export const createUserAndAccount = async (userData) => {
  await connectDatabase();

  const session = await startSession();
  session.startTransaction();

  try {
    // create the user.
    const user = new User(userData);

    if (userData.provider === "credentials") {
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      user.password = hashedPassword;
    }

    const { id, fullName, email, provider } = await user.save({ session });

    // create the account.
    const account = new Account({
      userId: id,
      fullName,
      email,
      phone: "",
      shippingAddress: {
        fullName: "",
        address: "",
        phone: "",
      },
      billingAddress: {
        fullName: "",
        address: "",
        phone: "",
      },
    });

    await account.save({ session });

    // commit the transaction.
    await session.commitTransaction();
    session.endSession();

    return { id, fullName, email, provider };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return null;
  }
};
