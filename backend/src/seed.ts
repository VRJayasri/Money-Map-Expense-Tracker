import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import User from "./models/User";

const seed = async () => {
  await connectDB();
  const existing = await User.findOne();
  if (!existing) {
    const user = await User.create({ name: "Default User", monthlyIncome: 22000 });
    console.log("Seeded user:", user._id);
    console.log("Copy this USER_ID to your .env → DEFAULT_USER_ID=", user._id);
  } else {
    console.log("User already exists:", existing._id);
  }
  process.exit(0);
};

seed();