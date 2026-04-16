import { Report } from "../domain/report.interface";

export class SalesReport implements Report {
  id = "sales";
  name = "Sales Report";

  async generate(): Promise<Buffer> {
    const data = [{ total: 100 }, { total: 200 }];
    return Buffer.from(JSON.stringify(data, null, 2));
  }
}
