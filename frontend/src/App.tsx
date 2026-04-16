import { useEffect, useState } from "react";

const API = "http://localhost:3000";

export default function App() {
  const [reports, setReports] = useState<any[]>([]);
  const [status, setStatus] = useState<any>({});

  useEffect(() => {
    fetch(`${API}/reports`)
      .then((r) => r.json())
      .then(setReports);
  }, []);

  const run = async (id: string) => {
    setStatus((s: any) => ({ ...s, [id]: "pending" }));
    const res = await fetch(`${API}/reports/${id}/run`, {
      method: "POST",
    });

    const { jobId } = await res.json();

    const interval = setInterval(async () => {
      const job = await fetch(`${API}/reports/jobs/${jobId}`).then((r) =>
        r.json(),
      );

      setStatus((s: any) => ({ ...s, [id]: job.status }));
      if (job.status === "done") {
        clearInterval(interval);
        setStatus((s: any) => ({ ...s, [id]: "done" }));

        setTimeout(() => {
          window.open(`${API}/reports/jobs/${jobId}/download`);
        }, 500);

        setTimeout(() => {
          setStatus((s: any) => ({ ...s, [id]: undefined }));
        }, 2000);
      }
    }, 1000);
  };

  return (
    <div>
      <h1>Reports</h1>

      {reports.map((r) => {
        const st = status[r.id];

        return (
          <div
            key={r.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
            }}
          >
            <div style={{ width: 180 }}>{r.name}</div>

            <button onClick={() => run(r.id)} disabled={st === "processing"}>
              {st === "processing" ? "Running..." : "Run"}
            </button>

            <div
              style={{
                minWidth: 100,
                fontWeight: 500,
                color:
                  st === "done"
                    ? "green"
                    : st === "error"
                      ? "red"
                      : st === "processing"
                        ? "orange"
                        : "#999",
              }}
            >
              {st || ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}
