import { Router } from "express";
import { reports } from "../registry/reports.registry";
import { createJob } from "../../jobs/job.service";
import { jobs } from "../../jobs/job.store";

const router = Router();

router.get("/", (req, res) => {
  res.json(reports);
});

router.post("/:id/run", (req, res) => {
  const jobId = createJob(req.params.id);
  res.json({ jobId });
});

router.get("/jobs/:id", (req, res) => {
  res.json(jobs.get(req.params.id));
});

router.get("/jobs/:id/download", (req, res) => {
  const job = jobs.get(req.params.id);

  if (!job || job.status !== "done") {
    return res.status(400).send("Not ready");
  }

  res.send(job.result);
});

export default router;
