package com.insight.reports;

import lombok.Getter;

@Getter
public class ReportResponse
{
    private final Long id;
    private final String title;
    private final ReportStatus status;

    public ReportResponse(Long id, String title, ReportStatus status)
    {
        this.id = id;
        this.title = title;
        this.status = status;
    }
}