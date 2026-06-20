import { type FormEvent, useEffect, useState } from "react";
import {
  createReport,
  deleteReport,
  getReports,
  updateReport,
  type ReportResponse,
} from "./api/reportsApi";

function App() {
  const [reports, setReports] = useState<ReportResponse[]>([]);

  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("DRAFT");

  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("DRAFT");

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingReportId, setDeletingReportId] = useState<number | null>(null);
  const [updatingReportId, setUpdatingReportId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  async function loadReports() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const loadedReports = await getReports();

      setReports(loadedReports);
    } catch {
      setErrorMessage("Could not load reports.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadReports();
  }, []);

  async function handleCreateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsCreating(true);
      setErrorMessage("");

      const createdReport = await createReport({
        title: newTitle,
        status: newStatus,
      });

      setReports((currentReports) => [...currentReports, createdReport]);

      setNewTitle("");
      setNewStatus("DRAFT");
    } catch {
      setErrorMessage("Could not create report.");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDeleteReport(id: number) {
    try {
      setDeletingReportId(id);
      setErrorMessage("");

      await deleteReport(id);

      setReports((currentReports) =>
          currentReports.filter((report) => report.id !== id)
      );
    } catch {
      setErrorMessage("Could not delete report.");
    } finally {
      setDeletingReportId(null);
    }
  }

  function handleStartEditing(report: ReportResponse) {
    setEditingReportId(report.id);
    setEditTitle(report.title);
    setEditStatus(report.status);
    setErrorMessage("");
  }

  function handleCancelEditing() {
    setEditingReportId(null);
    setEditTitle("");
    setEditStatus("DRAFT");
  }

  async function handleUpdateReport(id: number) {
    try {
      setUpdatingReportId(id);
      setErrorMessage("");

      const updatedReport = await updateReport(id, {
        title: editTitle,
        status: editStatus,
      });

      setReports((currentReports) =>
          currentReports.map((report) =>
              report.id === id ? updatedReport : report
          )
      );

      setEditingReportId(null);
      setEditTitle("");
      setEditStatus("DRAFT");
    } catch {
      setErrorMessage("Could not update report.");
    } finally {
      setUpdatingReportId(null);
    }
  }

  return (
      <main>
        <h1>Insight Reports</h1>

        {errorMessage !== "" && <p>{errorMessage}</p>}

        <section>
          <h2>Create Report</h2>

          <form onSubmit={handleCreateReport}>
            <div>
              <label htmlFor="new-title">Title</label>
              <input
                  id="new-title"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="new-status">Status</label>
              <select
                  id="new-status"
                  value={newStatus}
                  onChange={(event) => setNewStatus(event.target.value)}
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>

            <button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </button>
          </form>
        </section>

        <section>
          <h2>Reports</h2>

          {isLoading ? (
              <p>Loading reports...</p>
          ) : (
              <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                      {editingReportId === report.id ? (
                          <>
                            <input
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                            />

                            <select
                                value={editStatus}
                                onChange={(event) => setEditStatus(event.target.value)}
                            >
                              <option value="DRAFT">DRAFT</option>
                              <option value="PUBLISHED">PUBLISHED</option>
                            </select>

                            <button
                                type="button"
                                onClick={() => void handleUpdateReport(report.id)}
                                disabled={updatingReportId === report.id}
                            >
                              {updatingReportId === report.id ? "Saving..." : "Save"}
                            </button>

                            <button type="button" onClick={handleCancelEditing}>
                              Cancel
                            </button>
                          </>
                      ) : (
                          <>
                            <strong>{report.title}</strong> — {report.status}{" "}

                            <button
                                type="button"
                                onClick={() => handleStartEditing(report)}
                            >
                              Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => void handleDeleteReport(report.id)}
                                disabled={deletingReportId === report.id}
                            >
                              {deletingReportId === report.id
                                  ? "Deleting..."
                                  : "Delete"}
                            </button>
                          </>
                      )}
                    </li>
                ))}
              </ul>
          )}
        </section>
      </main>
  );
}

export default App;