import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  monthlyIncome: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, default: "Default User" },
    monthlyIncome: { type: Number, default: 22000 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);