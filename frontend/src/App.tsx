import { type FormEvent, useEffect, useState } from "react";
import {
  createReport,
  getReports,
  type ReportResponse,
} from "./api/reportsApi";

function App() {
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("DRAFT");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadReports() {
    try {
      const reports_from_api = await getReports();
      setReports(reports_from_api);
    } catch {
      setErrorMessage("Could not load reports.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    async function loadInitialReports() {
      try {
        const reports_from_api = await getReports();
        setReports(reports_from_api);
      } catch {
        setErrorMessage("Could not load reports.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadInitialReports();
  }, []);

  async function handleCreateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed_title = newTitle.trim();

    if (trimmed_title.length === 0) {
      setErrorMessage("Report title is required.");
      return;
    }

    try {
      setIsCreating(true);
      setErrorMessage(null);

      await createReport({
        title: trimmed_title,
        status: newStatus,
      });

      setNewTitle("");
      setNewStatus("DRAFT");
      await loadReports();
    } catch {
      setErrorMessage("Could not create report.");
    } finally {
      setIsCreating(false);
    }
  }

  if (isLoading) {
    return (
        <main>
          <p>Loading reports...</p>
        </main>
    );
  }

  return (
      <main>
        <h1>Insight Reports</h1>

        <form onSubmit={handleCreateReport}>
          <input
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Report title"
          />

          <select
              value={newStatus}
              onChange={(event) => setNewStatus(event.target.value)}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>

          <button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Report"}
          </button>
        </form>

        {errorMessage !== null && <p>{errorMessage}</p>}

        {reports.length === 0 ? (
            <p>No reports found.</p>
        ) : (
            <ul>
              {reports.map((report) => (
                  <li key={report.id}>
                    <strong>{report.title}</strong> — {report.status}
                  </li>
              ))}
            </ul>
        )}
      </main>
  );
}

export default App;