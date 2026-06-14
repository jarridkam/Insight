package com.insight.reports;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController
{
    private final ReportService reportService;

    public ReportController(ReportService reportService) {this.reportService = reportService;}

    @GetMapping("/api/reports")
    public List<ReportResponse> getReports(){return reportService.getReports();}

    @PostMapping("/api/reports")
    public ReportResponse createReport(@RequestBody ReportCreateRequest request) {return reportService.createReport(request);}

    @PutMapping("/api/reports/{id}")
    public ReportResponse updateReport(
            @PathVariable Long id,
            @RequestBody ReportUpdateRequest request
    )
    {
        return reportService.updateReport(id, request);
    }

    @DeleteMapping("/api/reports/{id}")
    public void deleteReport(@PathVariable Long id){reportService.deleteReport(id);}
}