export type ReportResponse = {
    id: number;
    title: string;
    status: string;
};

export type CreateResponseRequest = {
    title: string;
    status: string;
};

export type UpdateReportRequest = {
    title: string;
    status: string;
};

const API_BASE_URL = "http://localhost:8080";

async function getErrorMessage(response : Response): Promise<string>
{
    try
    {
        const error_body = await response.json();

        if(typeof error_body.message === "string")
        {return error_body.message;}
        return "Something went wrong."
    }
    catch {return "Something went wrong."}
}

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


export async function deleteReport(id: number): Promise<void>
{
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}`,
        {
            method: "DELETE",
        });
    if(!response.ok)
    {
        const error_message = await getErrorMessage(response);
        throw new Error(error_message);
    }
}

export async function updateReport(
    id: number,
    request: UpdateReportRequest,
): Promise<ReportResponse>
{
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if(!response.ok)
    {
        throw new Error("Failed to update report");
    }

    return response.json();
}