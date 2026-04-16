import { jobs } from "./job.store";
import { getReport } from "../reports/registry/reports.registry";

export const runJob = async (jobId: string, reportId: string) => {
  const job = jobs.get(jobId);
  if (!job) return;

  job.status = "processing";

  try {
    const report = getReport(reportId);

    if (!report) {
      throw new Error(`Report not found: ${reportId}`);
    }

    const result = await report.generate();

    job.status = "done";
    job.result = result;
  } catch {
    job.status = "error";
  }
};
