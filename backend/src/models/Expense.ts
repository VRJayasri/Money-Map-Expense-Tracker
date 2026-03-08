import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  amount: number;
  notes: string;
  paymentMethod: "Online" | "In Hand";
  month: number;
  year: number;
  date: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Food","Travel","Accessories","Friend Loan","Home","Rent","Savings","Others"],
      required: true,
    },
    amount: { type: Number, required: true },
    notes: { type: String, default: "" },
    paymentMethod: { type: String, enum: ["Online", "In Hand"], required: true },
    month: { type: Number, required: true },   
    year: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);