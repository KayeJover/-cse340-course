
-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

INSERT INTO project
(organization_id, title, description, location, project_date)
VALUES

-- BrightFuture Builders
(1, 'Community Park Renovation',
 'Renovate the neighborhood park with new benches and playground equipment.',
 'Cebu City', '2026-08-10'),

(1, 'School Repair Project',
 'Repair classrooms and repaint public school buildings.',
 'Bacolod City', '2026-09-05'),

(1, 'Bridge Maintenance',
 'Assist in repairing small community bridges.',
 'Iloilo City', '2026-09-25'),

(1, 'Housing Assistance',
 'Build homes for families affected by natural disasters.',
 'Dumaguete City', '2026-10-15'),

(1, 'Road Cleanup',
 'Repair sidewalks and clean public roads.',
 'Bohol', '2026-11-08'),

-- GreenHarvest Growers
(2, 'Tree Planting Drive',
 'Plant native trees in urban communities.',
 'Bacolod City', '2026-08-15'),

(2, 'Community Garden',
 'Create vegetable gardens for local residents.',
 'Cebu City', '2026-09-12'),

(2, 'Urban Farming Workshop',
 'Teach sustainable gardening techniques.',
 'Dumaguete City', '2026-10-03'),

(2, 'River Clean-up',
 'Remove trash from rivers and waterways.',
 'Iloilo City', '2026-10-20'),

(2, 'Composting Seminar',
 'Educate families about composting organic waste.',
 'Bohol', '2026-11-15'),

-- UnityServe Volunteers
(3, 'Food Distribution',
 'Distribute food packs to low-income families.',
 'Bacolod City', '2026-08-18'),

(3, 'Medical Mission',
 'Provide free health consultations and medicines.',
 'Cebu City', '2026-09-20'),

(3, 'Blood Donation Drive',
 'Coordinate community blood donation activities.',
 'Iloilo City', '2026-10-11'),

(3, 'Youth Leadership Camp',
 'Train young volunteers in leadership and service.',
 'Dumaguete City', '2026-10-30'),

(3, 'Christmas Outreach',
 'Provide gifts and meals for children during Christmas.',
 'Bohol', '2026-12-15');

 SELECT * FROM project;