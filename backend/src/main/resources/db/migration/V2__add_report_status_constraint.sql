ALTER TABLE reports
    ADD CONSTRAINT reports_status_check
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));