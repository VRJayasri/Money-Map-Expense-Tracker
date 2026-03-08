import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import actualsRoutes from "./routes/actualsRoutes";
import budgetPlanRoutes from "./routes/budgetPlanRoutes";


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/actuals", actualsRoutes);
app.use("/api/budgetplan", budgetPlanRoutes);

app.get("/", (_req, res) => res.send("Expense Tracker API running"));

export default app;