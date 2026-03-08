import mongoose, { Document, Schema } from "mongoose";

export interface IInvestment extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  app: string;
  amount: number;
  notes: string;
  paymentMethod: "Online" | "Others";
  month: number;
  year: number;
  date: Date;
}

const investmentSchema = new Schema<IInvestment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: ["FD", "SIP", "Mutual Funds", "Others"], required: true },
    app: { type: String, enum: ["Jupyter", "Uptox", "Others"], required: true },
    amount: { type: Number, required: true },
    notes: { type: String, default: "" },
    paymentMethod: { type: String, enum: ["Online", "Others"], required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IInvestment>("Investment", investmentSchema);