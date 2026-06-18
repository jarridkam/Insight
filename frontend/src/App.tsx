import { type FormEvent, useEffect, useState } from "react";
import {
  createReport,
  deleteReport,
  getReports,
  type ReportResponse,
} from "./api/reportsApi";

function App() {
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("DRAFT");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingReportId, setDeletingReportId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadReports() {
    try {
      const reports_from_api = await getReports();
      setReports(reports_from_api);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not load reports.");
      }
    }
  }

  useEffect(() => {
    async function loadInitialReports() {
      try {
        const reports_from_api = await getReports();
        setReports(reports_from_api);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Could not load reports.");
        }
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
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not create report.");
      }
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDeleteReport(id: number) {
    try {
      setDeletingReportId(id);
      setErrorMessage(null);

      await deleteReport(id);

      await loadReports();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not delete report.");
      }
    } finally {
      setDeletingReportId(null);
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
                    {" "}
                    <button
                        type="button"
                        onClick={() => void handleDeleteReport(report.id)}
                        disabled={deletingReportId === report.id}
                    >
                      {deletingReportId === report.id ? "Deleting..." : "Delete"}
                    </button>
                  </li>
              ))}
            </ul>
        )}
      </main>
  );
}

export default App;