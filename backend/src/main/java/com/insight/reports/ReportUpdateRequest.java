package com.insight.reports;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ReportUpdateRequest
{
    @NotBlank(message = "Title is required.")
    private String title;

    @NotBlank(message = "Status is required.")
    private String status;
}