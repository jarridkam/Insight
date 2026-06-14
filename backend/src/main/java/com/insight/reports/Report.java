package com.insight.reports;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reports")
@Getter
public class Report
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    private String title;
    @Setter
    private String status;

    protected Report(){}

    public Report(String _title, String _status)
    {
        this.title = _title;
        this.status = _status;
    }
}
