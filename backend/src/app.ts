import express from "express";
import cors from "cors";
import reportsRouter from "./modules/reports/controllers/reports.controller";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reports", reportsRouter);

export default app;
