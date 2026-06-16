package com.insight.reports;

public class ReportNotFoundException extends RuntimeException
{
    public ReportNotFoundException(Long id)
    {
        super("Report with id " + id + " was not found. ");
    }
}
