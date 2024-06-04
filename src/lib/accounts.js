// account model.
import Account from "@/models/accounts";

// database connection.
import { connectDatabase } from "@/services/mongo";

// get the account of an user by userId.
export const getAccount = async (userId) => {
  try {
    await connectDatabase();

    const account = await Account.findOne({ userId });

    return account;
  } catch (error) {
    return null;
  }
};

// create an account for a user.
export const createAccount = async (userId, fullName, email) => {
  try {
    await connectDatabase();

    const account = new Account({
      userId,
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

    return await account.save();
  } catch (error) {
    return null;
  }
};

// update the account of a user.
export const updateAccount = async (userId, updateData) => {
  try {
    await connectDatabase();

    const updatedAccount = await Account.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true }
    );

    return updatedAccount;
  } catch (error) {
    return null;
  }
};
