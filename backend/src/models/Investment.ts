import { Schema, model } from "mongoose";

const InvestmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    category: {
      type: String,
      enum: ["FD", "SIP", "MutualFunds", "Others"],
      required: true,
    },

    app: {
      type: String,
      enum: ["Jupiter", "Upstox", "Others"],
      required: true,
    },

    amount: { type: Number, required: true },
    description: String,

    paymentMethod: {
      type: String,
      enum: ["Online", "Others"],
      required: true,
    },

    month: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Investment", InvestmentSchema);