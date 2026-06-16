export type ReportResponse = {
    id: number;
    title: string;
    status: string;
};

export async function getReports(): Promise<ReportResponse[]> {
    const response = await fetch("http://localhost:8080/api/reports");

    if (!response.ok) {
        throw new Error("Failed to fetch reports.");
    }

    return response.json();
}