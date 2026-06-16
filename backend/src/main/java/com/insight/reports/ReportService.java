package com.insight.reports;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService
{
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository)
    {
        this.reportRepository = reportRepository;
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
        Report report = new Report(
                request.getTitle(),
                request.getStatus()
        );

        Report savedReport = reportRepository.save(report);

        return new ReportResponse(
                savedReport.getId(),
                savedReport.getTitle(),
                savedReport.getStatus()
        );
    }

    public ReportResponse updateReport(Long id, ReportUpdateRequest request)
    {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ReportNotFoundException(id));

        report.setTitle(request.getTitle());
        report.setStatus(request.getStatus());

        Report savedReport = reportRepository.save(report);

        return new ReportResponse(
                savedReport.getId(),
                savedReport.getTitle(),
                savedReport.getStatus()
        );
    }

    public void deleteReport(Long id)
    {
        if (!reportRepository.existsById(id))
        {
            throw new ReportNotFoundException(id);
        }

        reportRepository.deleteById(id);
    }
}