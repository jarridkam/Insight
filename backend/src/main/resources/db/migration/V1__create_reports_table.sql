CREATE TABLE reports (
                         id BIGSERIAL PRIMARY KEY,
                         title VARCHAR(255) NOT NULL,
                         status VARCHAR(50) NOT NULL
);

INSERT INTO reports (title, status)
VALUES
    ('Weekly Attendance Report', 'DRAFT'),
    ('Monthly Funding Report', 'PUBLISHED');