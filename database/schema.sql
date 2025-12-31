-- ============================================================================
-- Nexusxrcpit - College Event Registration and Management System
-- Database Schema
-- ============================================================================
-- Supports dual organizer workflows:
--   A) Require admin approval before organizer login
--   B) Instant login with event-level approval
-- ============================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS nexusxrcpit;
USE nexusxrcpit;

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS Organizer_Approval_Log;
DROP TABLE IF EXISTS Event_Approval_Log;
DROP TABLE IF EXISTS Notifications;
DROP TABLE IF EXISTS Announcements;
DROP TABLE IF EXISTS Feedback;
DROP TABLE IF EXISTS Team_Members;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Certificates;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Registrations;
DROP TABLE IF EXISTS Event_Category_Link;
DROP TABLE IF EXISTS Event_Categories;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Admin_Settings;
DROP TABLE IF EXISTS Organizers;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Admins;

-- ============================================================================
-- 1. ADMINS TABLE
-- ============================================================================
CREATE TABLE Admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'event_manager', 'reviewer') NOT NULL DEFAULT 'reviewer',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. STUDENTS TABLE
-- ============================================================================
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    studentId VARCHAR(50) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    department VARCHAR(100),
    year ENUM('1', '2', '3', '4', 'Graduate') NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_department (department),
    INDEX idx_year (year),
    INDEX idx_studentId (studentId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. ORGANIZERS TABLE
-- ============================================================================
CREATE TABLE Organizers (
    organizer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    department VARCHAR(100),
    designation VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    account_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    approved_by_admin INT NULL,
    approval_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (approved_by_admin) REFERENCES Admins(admin_id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_account_status (account_status),
    INDEX idx_is_active (is_active),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. ADMIN_SETTINGS TABLE
-- ============================================================================
CREATE TABLE Admin_Settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value VARCHAR(255) NOT NULL,
    description TEXT,
    updated_by_admin INT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by_admin) REFERENCES Admins(admin_id) ON DELETE SET NULL,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default organizer signup flow setting
INSERT INTO Admin_Settings (setting_key, setting_value, description) VALUES
('organizer_signup_flow', 'require_admin_approval', 'Controls organizer account approval workflow: require_admin_approval | instant_login | instant_with_event_approval'),
('event_approval_required', 'true', 'Whether all events require admin approval before going public'),
('registration_open', 'true', 'Global toggle for student registrations'),
('max_events_per_organizer', '10', 'Maximum number of events an organizer can create');

-- ============================================================================
-- 5. EVENTS TABLE
-- ============================================================================
CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(200) NOT NULL,
    short_description VARCHAR(255),
    event_type ENUM('technical', 'cultural', 'sports', 'workshop', 'seminar', 'competition') NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    time TIME NOT NULL,
    venue VARCHAR(200) NOT NULL,
    organizer_id INT NOT NULL,
    registration_fee DECIMAL(10, 2) DEFAULT 0.00,
    max_participants INT DEFAULT NULL,
    approval_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
    images TEXT,
    tags TEXT,
    prizes TEXT,
    requirements TEXT,
    contact_info TEXT,
    payment_info TEXT,
    social_links TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES Organizers(organizer_id) ON DELETE CASCADE,
    INDEX idx_organizer (organizer_id),
    INDEX idx_approval_status (approval_status),
    INDEX idx_status (status),
    INDEX idx_event_type (event_type),
    INDEX idx_start_date (start_date),
    INDEX idx_venue (venue),
    CONSTRAINT chk_dates CHECK (end_date >= start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. EVENT_CATEGORIES TABLE
-- ============================================================================
CREATE TABLE Event_Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO Event_Categories (category_name, description) VALUES
('Technology', 'Tech-related events including coding, AI, robotics'),
('Arts & Culture', 'Cultural performances, art exhibitions, music'),
('Sports & Fitness', 'Athletic competitions and fitness activities'),
('Academic', 'Workshops, seminars, guest lectures'),
('Social', 'Community service, awareness campaigns'),
('Entertainment', 'Fun events, games, competitions');

-- ============================================================================
-- 7. EVENT_CATEGORY_LINK TABLE
-- ============================================================================
CREATE TABLE Event_Category_Link (
    link_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Event_Categories(category_id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_category (event_id, category_id),
    INDEX idx_event (event_id),
    INDEX idx_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. REGISTRATIONS TABLE
-- ============================================================================
CREATE TABLE Registrations (
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('paid', 'unpaid', 'refunded') NOT NULL DEFAULT 'unpaid',
    attendance_status ENUM('present', 'absent', 'not_marked') NOT NULL DEFAULT 'not_marked',
    certificate_issued BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_event (student_id, event_id),
    INDEX idx_student (student_id),
    INDEX idx_event (event_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_registration_date (registration_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. PAYMENTS TABLE
-- ============================================================================
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    registration_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('UPI', 'card', 'cash', 'net_banking') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('success', 'failed', 'pending', 'refunded') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (registration_id) REFERENCES Registrations(registration_id) ON DELETE CASCADE,
    INDEX idx_registration (registration_id),
    INDEX idx_transaction (transaction_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. CERTIFICATES TABLE
-- ============================================================================
CREATE TABLE Certificates (
    certificate_id INT PRIMARY KEY AUTO_INCREMENT,
    registration_id INT NOT NULL,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (registration_id) REFERENCES Registrations(registration_id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration_cert (registration_id),
    INDEX idx_registration (registration_id),
    INDEX idx_verified (verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 11. TEAMS TABLE
-- ============================================================================
CREATE TABLE Teams (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(100) NOT NULL,
    event_id INT NOT NULL,
    leader_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (leader_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    INDEX idx_event (event_id),
    INDEX idx_leader (leader_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 12. TEAM_MEMBERS TABLE
-- ============================================================================
CREATE TABLE Team_Members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT NOT NULL,
    student_id INT NOT NULL,
    joined_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    UNIQUE KEY unique_team_student (team_id, student_id),
    INDEX idx_team (team_id),
    INDEX idx_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 13. FEEDBACK TABLE
-- ============================================================================
CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    student_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_event_feedback (student_id, event_id),
    INDEX idx_event (event_id),
    INDEX idx_student (student_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 14. ANNOUNCEMENTS TABLE
-- ============================================================================
CREATE TABLE Announcements (
    announcement_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    posted_by_admin INT NOT NULL,
    posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by_admin) REFERENCES Admins(admin_id) ON DELETE CASCADE,
    INDEX idx_posted_by (posted_by_admin),
    INDEX idx_posted_on (posted_on)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 15. NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_type ENUM('student', 'organizer', 'admin') NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    type ENUM('event_update', 'payment', 'reminder', 'admin_notice', 'organizer_approval', 'event_approval', 'registration') NOT NULL,
    status ENUM('read', 'unread') NOT NULL DEFAULT 'unread',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_type, user_id),
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_sent_at (sent_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 16. EVENT_APPROVAL_LOG TABLE
-- ============================================================================
CREATE TABLE Event_Approval_Log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    reviewed_by_admin INT NOT NULL,
    decision ENUM('approved', 'rejected') NOT NULL,
    remarks TEXT,
    decision_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by_admin) REFERENCES Admins(admin_id) ON DELETE CASCADE,
    INDEX idx_event (event_id),
    INDEX idx_admin (reviewed_by_admin),
    INDEX idx_decision_date (decision_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 17. ORGANIZER_APPROVAL_LOG TABLE
-- ============================================================================
CREATE TABLE Organizer_Approval_Log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_id INT NOT NULL,
    reviewed_by_admin INT NOT NULL,
    decision ENUM('approved', 'rejected') NOT NULL,
    remarks TEXT,
    decision_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES Organizers(organizer_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by_admin) REFERENCES Admins(admin_id) ON DELETE CASCADE,
    INDEX idx_organizer (organizer_id),
    INDEX idx_admin (reviewed_by_admin),
    INDEX idx_decision_date (decision_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TRIGGERS FOR BUSINESS LOGIC
-- ============================================================================

-- Trigger: After Organizer Registration
DELIMITER //
CREATE TRIGGER after_organizer_insert
AFTER INSERT ON Organizers
FOR EACH ROW
BEGIN
    DECLARE signup_flow VARCHAR(50);
    
    -- Get current signup flow setting
    SELECT setting_value INTO signup_flow 
    FROM Admin_Settings 
    WHERE setting_key = 'organizer_signup_flow';
    
    -- If require_admin_approval, notify all admins
    IF signup_flow = 'require_admin_approval' THEN
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        SELECT 'admin', admin_id, 
               CONCAT('New organizer registration: ', NEW.full_name, ' (', NEW.email, ') requires approval'),
               'organizer_approval', 'unread'
        FROM Admins;
    END IF;
END//
DELIMITER ;

-- Trigger: After Organizer Approval Status Change
DELIMITER //
CREATE TRIGGER after_organizer_approval
AFTER UPDATE ON Organizers
FOR EACH ROW
BEGIN
    -- If account_status changed to approved or rejected
    IF OLD.account_status != NEW.account_status AND NEW.account_status IN ('approved', 'rejected') THEN
        -- Notify the organizer
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        VALUES (
            'organizer', 
            NEW.organizer_id,
            CASE 
                WHEN NEW.account_status = 'approved' THEN 'Congratulations! Your organizer account has been approved. You can now login and create events.'
                ELSE CONCAT('Your organizer account has been rejected. Reason: ', IFNULL(NEW.approval_date, 'Not specified'))
            END,
            'organizer_approval',
            'unread'
        );
    END IF;
END//
DELIMITER ;

-- Trigger: After Event Creation
DELIMITER //
CREATE TRIGGER after_event_insert
AFTER INSERT ON Events
FOR EACH ROW
BEGIN
    -- Notify all admins about new event
    INSERT INTO Notifications (user_type, user_id, message, type, status)
    SELECT 'admin', admin_id,
           CONCAT('New event created: ', NEW.event_name, ' by organizer ID ', NEW.organizer_id, ' - Requires approval'),
           'admin_notice', 'unread'
    FROM Admins;
    
    -- Notify organizer
    INSERT INTO Notifications (user_type, user_id, message, type, status)
    VALUES (
        'organizer',
        NEW.organizer_id,
        CONCAT('Your event "', NEW.event_name, '" has been created and is pending admin approval'),
        'event_update',
        'unread'
    );
END//
DELIMITER ;

-- Trigger: After Event Approval Status Change
DELIMITER //
CREATE TRIGGER after_event_approval
AFTER UPDATE ON Events
FOR EACH ROW
BEGIN
    -- If approval_status changed
    IF OLD.approval_status != NEW.approval_status AND NEW.approval_status IN ('approved', 'rejected') THEN
        -- Notify organizer
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        VALUES (
            'organizer',
            NEW.organizer_id,
            CASE 
                WHEN NEW.approval_status = 'approved' THEN CONCAT('Your event "', NEW.event_name, '" has been approved and is now visible to students!')
                ELSE CONCAT('Your event "', NEW.event_name, '" has been rejected.')
            END,
            'event_approval',
            'unread'
        );
        
        -- If approved, notify all students
        IF NEW.approval_status = 'approved' THEN
            INSERT INTO Notifications (user_type, user_id, message, type, status)
            SELECT 'student', student_id,
                   CONCAT('New event available: ', NEW.event_name, ' on ', DATE_FORMAT(NEW.start_date, '%M %d, %Y')),
                   'event_update', 'unread'
            FROM Students;
        END IF;
    END IF;
END//
DELIMITER ;

-- Trigger: After Student Registration
DELIMITER //
CREATE TRIGGER after_registration_insert
AFTER INSERT ON Registrations
FOR EACH ROW
BEGIN
    -- Notify student
    INSERT INTO Notifications (user_type, user_id, message, type, status)
    SELECT 'student', NEW.student_id,
           CONCAT('Successfully registered for event: ', e.event_name),
           'registration', 'unread'
    FROM Events e WHERE e.event_id = NEW.event_id;
    
    -- Notify organizer
    INSERT INTO Notifications (user_type, user_id, message, type, status)
    SELECT 'organizer', e.organizer_id,
           CONCAT('New registration for your event: ', e.event_name),
           'registration', 'unread'
    FROM Events e WHERE e.event_id = NEW.event_id;
END//
DELIMITER ;

-- Trigger: After Payment Success
DELIMITER //
CREATE TRIGGER after_payment_success
AFTER UPDATE ON Payments
FOR EACH ROW
BEGIN
    -- If payment status changed to success
    IF OLD.payment_status != 'success' AND NEW.payment_status = 'success' THEN
        -- Update registration payment status
        UPDATE Registrations 
        SET payment_status = 'paid' 
        WHERE registration_id = NEW.registration_id;
        
        -- Notify student
        INSERT INTO Notifications (user_type, user_id, message, type, status)
        SELECT 'student', r.student_id,
               CONCAT('Payment confirmed for event: ', e.event_name, '. Amount: ₹', NEW.amount),
               'payment', 'unread'
        FROM Registrations r
        JOIN Events e ON r.event_id = e.event_id
        WHERE r.registration_id = NEW.registration_id;
    END IF;
END//
DELIMITER ;

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Pending Organizers (for admin panel)
CREATE OR REPLACE VIEW v_pending_organizers AS
SELECT 
    o.organizer_id,
    o.full_name,
    o.email,
    o.phone,
    o.department,
    o.designation,
    o.account_status,
    o.created_at,
    DATEDIFF(CURRENT_DATE, DATE(o.created_at)) as days_pending
FROM Organizers o
WHERE o.account_status = 'pending'
ORDER BY o.created_at ASC;

-- View: Pending Events (for admin panel)
CREATE OR REPLACE VIEW v_pending_events AS
SELECT 
    e.event_id,
    e.event_name,
    e.event_type,
    e.start_date,
    e.venue,
    o.full_name as organizer_name,
    o.email as organizer_email,
    e.created_at,
    DATEDIFF(CURRENT_DATE, DATE(e.created_at)) as days_pending
FROM Events e
JOIN Organizers o ON e.organizer_id = o.organizer_id
WHERE e.approval_status = 'pending'
ORDER BY e.created_at ASC;

-- View: Approved Events (for students)
CREATE OR REPLACE VIEW v_approved_events AS
SELECT 
    e.event_id,
    e.event_name,
    e.event_type,
    e.description,
    e.start_date,
    e.end_date,
    e.time,
    e.venue,
    e.registration_fee,
    e.max_participants,
    e.status,
    o.full_name as organizer_name,
    o.department as organizer_department,
    COUNT(DISTINCT r.registration_id) as registered_count,
    AVG(f.rating) as avg_rating
FROM Events e
JOIN Organizers o ON e.organizer_id = o.organizer_id
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE e.approval_status = 'approved'
GROUP BY e.event_id
ORDER BY e.start_date ASC;

-- View: Event Statistics (for organizers)
CREATE OR REPLACE VIEW v_event_statistics AS
SELECT 
    e.event_id,
    e.event_name,
    e.organizer_id,
    COUNT(DISTINCT r.registration_id) as total_registrations,
    SUM(CASE WHEN r.payment_status = 'paid' THEN 1 ELSE 0 END) as paid_registrations,
    SUM(CASE WHEN r.attendance_status = 'present' THEN 1 ELSE 0 END) as attendees,
    SUM(CASE WHEN r.certificate_issued = TRUE THEN 1 ELSE 0 END) as certificates_issued,
    COALESCE(SUM(p.amount), 0) as total_revenue,
    AVG(f.rating) as avg_rating,
    COUNT(DISTINCT f.feedback_id) as feedback_count
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Payments p ON r.registration_id = p.registration_id AND p.payment_status = 'success'
LEFT JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id;

-- ============================================================================
-- SAMPLE DATA FOR TESTING
-- ============================================================================

-- Note: No sample data included in production schema
-- Use clean_setup.sql to initialize with essential admin accounts only

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

-- Procedure: Approve Organizer
DELIMITER //
CREATE PROCEDURE sp_approve_organizer(
    IN p_organizer_id INT,
    IN p_admin_id INT,
    IN p_remarks TEXT
)
BEGIN
    -- Update organizer status
    UPDATE Organizers 
    SET account_status = 'approved',
        is_active = TRUE,
        approved_by_admin = p_admin_id,
        approval_date = CURRENT_TIMESTAMP
    WHERE organizer_id = p_organizer_id;
    
    -- Log the approval
    INSERT INTO Organizer_Approval_Log (organizer_id, reviewed_by_admin, decision, remarks)
    VALUES (p_organizer_id, p_admin_id, 'approved', p_remarks);
END//
DELIMITER ;

-- Procedure: Reject Organizer
DELIMITER //
CREATE PROCEDURE sp_reject_organizer(
    IN p_organizer_id INT,
    IN p_admin_id INT,
    IN p_remarks TEXT
)
BEGIN
    -- Update organizer status
    UPDATE Organizers 
    SET account_status = 'rejected',
        is_active = FALSE,
        approved_by_admin = p_admin_id,
        approval_date = CURRENT_TIMESTAMP
    WHERE organizer_id = p_organizer_id;
    
    -- Log the rejection
    INSERT INTO Organizer_Approval_Log (organizer_id, reviewed_by_admin, decision, remarks)
    VALUES (p_organizer_id, p_admin_id, 'rejected', p_remarks);
END//
DELIMITER ;

-- Procedure: Approve Event
DELIMITER //
CREATE PROCEDURE sp_approve_event(
    IN p_event_id INT,
    IN p_admin_id INT,
    IN p_remarks TEXT
)
BEGIN
    -- Update event status
    UPDATE Events 
    SET approval_status = 'approved'
    WHERE event_id = p_event_id;
    
    -- Log the approval
    INSERT INTO Event_Approval_Log (event_id, reviewed_by_admin, decision, remarks)
    VALUES (p_event_id, p_admin_id, 'approved', p_remarks);
END//
DELIMITER ;

-- Procedure: Reject Event
DELIMITER //
CREATE PROCEDURE sp_reject_event(
    IN p_event_id INT,
    IN p_admin_id INT,
    IN p_remarks TEXT
)
BEGIN
    -- Update event status
    UPDATE Events 
    SET approval_status = 'rejected'
    WHERE event_id = p_event_id;
    
    -- Log the rejection
    INSERT INTO Event_Approval_Log (event_id, reviewed_by_admin, decision, remarks)
    VALUES (p_event_id, p_admin_id, 'rejected', p_remarks);
END//
DELIMITER ;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
