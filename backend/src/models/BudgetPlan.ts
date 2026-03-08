import mongoose, { Document, Schema } from "mongoose";

interface IPlanCategory {
  id: string;
  label: string;
  type: "expense" | "saving";
  plannedAmount: number;
}

export interface IBudgetPlan extends Document {
  userId: mongoose.Types.ObjectId;
  month: number;
  year: number;
  income: number;
  categories: IPlanCategory[];
}

const budgetPlanSchema = new Schema<IBudgetPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    income: { type: Number, required: true },
    categories: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, enum: ["expense", "saving"], required: true },
        plannedAmount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

// One plan per user per month+year
budgetPlanSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model<IBudgetPlan>("BudgetPlan", budgetPlanSchema);