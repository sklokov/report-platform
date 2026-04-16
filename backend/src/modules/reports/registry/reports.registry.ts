import { UsersReport } from "../implementations/users.report";
import { SalesReport } from "../implementations/sales.report";

export const reports = [new UsersReport(), new SalesReport()];

export const getReport = (id: string) => reports.find((r) => r.id === id);
