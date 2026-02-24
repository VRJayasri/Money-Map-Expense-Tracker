import { Schema, model } from "mongoose";

const ExpenseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    category: {
      type: String,
      enum: ["Food", "Accessories", "Travel", "Others"],
      required: true,
    },

    amount: { type: Number, required: true },
    description: String,

    paymentMethod: {
      type: String,
      enum: ["Online", "InHand"],
      required: true,
    },

    month: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default model("Expense", ExpenseSchema);