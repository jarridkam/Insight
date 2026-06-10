package com.insight.reports;

import lombok.Getter;

@Getter
public class ReportResponse {
    private final Long id;
    private final String title;
    private final String status;

    public ReportResponse(Long _id, String _title, String _status){
        this.id = _id;
        this.title = _title;
        this.status = _status;
    }

}
