import { Report } from "../domain/report.interface";

export class UsersReport implements Report {
  id = "users";
  name = "Users Report";

  async generate(): Promise<Buffer> {
    const data = [{ name: "John" }, { name: "Anna" }];
    return Buffer.from(JSON.stringify(data, null, 2));
  }
}
