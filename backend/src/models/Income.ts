import { Schema, model } from "mongoose";

const IncomeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    month: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default model("Income", IncomeSchema);