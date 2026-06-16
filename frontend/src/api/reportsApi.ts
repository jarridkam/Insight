export type ReportResponse = {
    id: number;
    title: string;
    status: string;
};

export type CreateResponseRequest = {
    title: string;
    status: string;
}

const API_BASE_URL = "http://localhost:8080";

export async function getReports(): Promise<ReportResponse[]>
{
    const response = await fetch(`${API_BASE_URL}/api/reports`);

    if (!response.ok) {throw new Error("Failed to fetch reports.");}

    return response.json();
}

export async function createReport(request: CreateResponseRequest): Promise<ReportResponse>
{
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(request),
    });

    if(!response.ok){throw new Error("Failed to create report");}
    return response.json();
}

