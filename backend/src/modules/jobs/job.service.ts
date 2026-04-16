import { v4 as uuid } from "uuid";
import { jobs } from "./job.store";
import { runJob } from "./worker";

export const createJob = (reportId: string) => {
  const id = uuid();

  jobs.set(id, { id, status: "pending" });

  runJob(id, reportId);

  return id;
};
