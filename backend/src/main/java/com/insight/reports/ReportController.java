package com.insight.reports;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReportController
{
    @GetMapping("/api/reports")
    public List<ReportResponse> getReports()
    {
        return List.of(
                new ReportResponse(
                        1L,
                        "Weekly Attendance Report",
                        "DRAFT"
                ),
                new ReportResponse(
                        2L,
                        "Monthly Funding Report",
                        "PUBLISHED"
                )
        );
    }
}