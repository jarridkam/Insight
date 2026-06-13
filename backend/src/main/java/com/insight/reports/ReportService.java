package com.insight.reports;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportService
{
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository _reportRepository){
        this.reportRepository = _reportRepository;
    }

    public List<ReportResponse> getReports()
    {
        return reportRepository.findAll()
                .stream()
                .map(report -> new ReportResponse(
                        report.getId(),
                        report.getTitle(),
                        report.getStatus()
                ))
                .toList();
    }

    public ReportResponse createReport(ReportCreateRequest request)
    {
        
    }
}
