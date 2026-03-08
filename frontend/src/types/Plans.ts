export type Expense = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export interface PlanCardProps {
  title: string;
  balanceLabel: string;
  balanceValue: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  expenses: Expense[];
  headerRight?: React.ReactNode;
  footerField: string;
  footerValue: number;
}
export type FormErrors = {
  category?: string;
  amount?: string;
  paymentMethod?: string;
};
export interface BudgetCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  type: "expense" | "saving";
  amount: string;
}
