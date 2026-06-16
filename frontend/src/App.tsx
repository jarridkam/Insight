import { useEffect, useState } from "react";
import { getReports, type ReportResponse } from "./api/reportsApi";

function App() {
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
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

    loadReports();
  }, []);

  if (isLoading) {
    return (
        <main>
          <p>Loading reports...</p>
        </main>
    );
  }

  if (errorMessage !== null) {
    return (
        <main>
          <p>{errorMessage}</p>
        </main>
    );
  }

  return (
      <main>
        <h1>Insight Reports</h1>

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