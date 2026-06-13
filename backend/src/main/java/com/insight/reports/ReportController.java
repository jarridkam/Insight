package com.insight.reports;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReportController
{
    private final ReportService reportService;

    public ReportController(ReportService reportService) {this.reportService = reportService;}

    @GetMapping("/api/reports")
    public List<ReportResponse> getReports() {return reportService.getReports();}
}