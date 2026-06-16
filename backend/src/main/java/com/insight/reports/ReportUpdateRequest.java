package com.insight.reports;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ReportUpdateRequest
{
    @NotBlank(message = "Title is required.")
    private String title;

    @NotNull(message = "Status is required.")
    private ReportStatus status;
}