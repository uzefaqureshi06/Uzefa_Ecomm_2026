import mongoose from "mongoose";

const URI =
  "mongodb+srv://uzefa06:uzefa123@jewelry.jqvj6hs.mongodb.net/?appName=jewelry";
export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);

    console.log("DATA BASE IS CONNECTED");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
