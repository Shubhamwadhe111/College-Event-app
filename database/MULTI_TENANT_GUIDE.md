# 🏢 Multi-College Event Management Platform
## SaaS Multi-Tenant Database Guide

---

## 🎯 Overview

This is a **startup-ready SaaS platform** where multiple colleges can sign up and use the event management system independently. All colleges share one central database with complete data isolation using `college_id`.

**Database Name:** `Nexusxrcpit_Platform`

---

## 🏗️ Architecture

### Three-Tier Admin System

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM ADMIN                           │
│              (Your Startup/Company)                         │
│  - Manage all colleges                                      │
│  - Billing & subscriptions                                  │
│  - System-wide analytics                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  College 1  │  │  College 2  │  │  College 3  │
│   (RCPIT)   │  │   (VJTI)    │  │   (SPIT)    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│College Admin│  │College Admin│  │College Admin│
│  - Manage   │  │  - Manage   │  │  - Manage   │
│  organizers │  │  organizers │  │  organizers │
│  - Approve  │  │  - Approve  │  │  - Approve  │
│  events     │  │  events     │  │  events     │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 📊 Database Structure

### 16 Tables

**Platform Level (1):**
1. Platform_Admins - Your company admins

**College Level (2):**
2. Colleges - Tenant information
3. College_Admins - Per-college admins

**User Level (2):**
4. Organizers - Event organizers (multi-tenant)
5. Students - Students (multi-tenant)

**Event Management (6):**
6. Events - Events (multi-tenant)
7. Registrations - Event registrations (multi-tenant)
8. Payments - Payment tracking (multi-tenant)
9. Certificates - Certificates (multi-tenant)
10. Feedback - Event feedback (multi-tenant)
11. Announcements - College announcements (multi-tenant)

**System (5):**
12. Notifications - User notifications (multi-tenant)
13. Plans - Subscription plans
14. Subscriptions - College subscriptions
15. Tenant_Settings - Per-college configuration
16. Audit_Log - System-wide audit trail

---

## 🔑 Key Features

### 1. Complete Data Isolation
Every table (except Platform_Admins and Plans) has `college_id` to ensure data isolation.

```sql
-- Students can only see their college's data
SELECT * FROM Events WHERE college_id = 1 AND approval_status = 'approved';

-- College admins can only manage their college
SELECT * FROM Organizers WHERE college_id = 1 AND account_status = 'pending';
```

### 2. Subscription Plans

**4 Plans Available:**
- **Free**: 5 events/month, 100 students, 2 organizers
- **Starter**: 25 events/month, 500 students, 10 organizers (₹999/month)
- **Premium**: 100 events/month, 2000 students, 50 organizers (₹2999/month)
- **Enterprise**: Unlimited everything (₹9999/month)

### 3. Multi-Domain Support
Each college can have:
- Subdomain: `rcpit.nexusxrcpit.com`
- Custom domain: `events.rcpit.edu`

### 4. Flexible Workflows
Each college can configure:
- Organizer signup flow (require approval / instant login)
- Event approval requirements
- Cross-college event visibility
- Custom branding (logo, theme color)

---

## 🚀 Quick Setup

### Step 1: Create Database
```bash
mysql -u root -p < multi-tenant-schema.sql
```

### Step 2: Verify Setup
```sql
USE Nexusxrcpit_Platform;
SHOW TABLES;
-- Should show 16 tables

SELECT * FROM Plans;
-- Should show 4 subscription plans
```

### Step 3: Create First College
```sql
CALL sp_register_college(
    'RCPIT College',           -- college_name
    'rcpit',                   -- domain
    'admin@rcpit.edu',         -- contact_email
    '9876543210',              -- contact_phone
    '123 College St, Mumbai',  -- address
    'RCPIT Admin',             -- admin_name
    'admin@rcpit.edu',         -- admin_email
    '$2b$10$hashedpassword',   -- admin_password
    @college_id,               -- OUT: college_id
    @admin_id                  -- OUT: admin_id
);

SELECT @college_id, @admin_id;
```

---

## 📝 Common Operations

### Register New College
```sql
CALL sp_register_college(
    'New College Name',
    'domain',
    'contact@college.edu',
    '1234567890',
    'Address',
    'Admin Name',
    'admin@college.edu',
    'hashed_password',
    @college_id,
    @admin_id
);
```

### Approve Organizer
```sql
CALL sp_approve_organizer(
    2,                    -- organizer_id
    1,                    -- admin_id
    'Verified credentials' -- remarks
);
```

### Approve Event
```sql
CALL sp_approve_event(
    5,                    -- event_id
    1,                    -- admin_id
    'Event approved'      -- remarks
);
```

### Suspend College
```sql
CALL sp_suspend_college(
    1,                    -- college_id
    1,                    -- platform_admin_id
    'Payment overdue'     -- reason
);
```

### Upgrade College Plan
```sql
CALL sp_upgrade_college_plan(
    1,                    -- college_id
    'Premium',            -- new_plan_name
    12                    -- duration_months
);
```

---

## 🔍 Important Views

### View Active Colleges
```sql
SELECT * FROM v_active_colleges;
```

### View Pending Organizers (All Colleges)
```sql
SELECT * FROM v_pending_organizers_by_college;
```

### View Pending Events (All Colleges)
```sql
SELECT * FROM v_pending_events_by_college;
```

### View College Statistics
```sql
SELECT * FROM v_college_statistics WHERE college_id = 1;
```

### View Platform Statistics
```sql
SELECT * FROM v_platform_statistics;
```

---

## 🎨 Tenant Customization

Each college can customize:

```sql
-- Set organizer workflow
INSERT INTO Tenant_Settings (college_id, setting_key, setting_value)
VALUES (1, 'organizer_signup_flow', 'instant_login');

-- Set theme color
INSERT INTO Tenant_Settings (college_id, setting_key, setting_value)
VALUES (1, 'theme_color', '#3b82f6');

-- Set logo
INSERT INTO Tenant_Settings (college_id, setting_key, setting_value)
VALUES (1, 'logo_url', 'https://cdn.example.com/rcpit-logo.png');

-- Allow cross-college events
INSERT INTO Tenant_Settings (college_id, setting_key, setting_value)
VALUES (1, 'allow_cross_college_events', 'true');
```

---

## 🔐 Security & Data Isolation

### Row-Level Security
Every query must include `college_id`:

```sql
-- ✅ CORRECT: Filtered by college_id
SELECT * FROM Events WHERE college_id = 1;

-- ❌ WRONG: No college_id filter (security risk)
SELECT * FROM Events;
```

### API Layer Enforcement
```javascript
// Middleware to inject college_id
const enforceCollegeId = (req, res, next) => {
  const collegeId = req.user.college_id;
  req.query.college_id = collegeId;
  next();
};

// All queries automatically filtered
app.get('/api/events', enforceCollegeId, async (req, res) => {
  const events = await db.query(
    'SELECT * FROM Events WHERE college_id = ?',
    [req.query.college_id]
  );
  res.json(events);
});
```

---

## 📈 Subscription Management

### Check College Subscription
```sql
SELECT 
    c.college_name,
    p.plan_name,
    s.status,
    s.start_date,
    s.end_date,
    DATEDIFF(s.end_date, CURDATE()) as days_remaining
FROM Colleges c
JOIN Subscriptions s ON c.college_id = s.college_id
JOIN Plans p ON s.plan_id = p.plan_id
WHERE c.college_id = 1 AND s.status = 'active';
```

### Check Plan Limits
```sql
SELECT 
    c.college_name,
    p.plan_name,
    JSON_EXTRACT(p.limits, '$.max_events_per_month') as max_events,
    JSON_EXTRACT(p.limits, '$.max_students') as max_students,
    JSON_EXTRACT(p.limits, '$.max_organizers') as max_organizers,
    COUNT(DISTINCT e.event_id) as current_events,
    COUNT(DISTINCT st.student_id) as current_students,
    COUNT(DISTINCT o.organizer_id) as current_organizers
FROM Colleges c
JOIN Subscriptions s ON c.college_id = s.college_id
JOIN Plans p ON s.plan_id = p.plan_id
LEFT JOIN Events e ON c.college_id = e.college_id 
    AND MONTH(e.created_at) = MONTH(CURDATE())
LEFT JOIN Students st ON c.college_id = st.college_id
LEFT JOIN Organizers o ON c.college_id = o.college_id
WHERE c.college_id = 1 AND s.status = 'active'
GROUP BY c.college_id;
```

---

## 🎯 Business Logic

### Automatic Triggers

**1. On College Registration:**
- Creates trial subscription (14 days)
- Creates default tenant settings
- Logs college creation

**2. On Organizer Registration:**
- Checks college's organizer_signup_flow
- Notifies college admins if approval required
- Logs organizer registration

**3. On Event Creation:**
- Checks subscription limits
- Sets approval_status = 'pending'
- Notifies college admins
- Logs event creation

**4. On Payment Success:**
- Updates registration payment_status
- Notifies student
- Logs payment

**5. On Subscription Expiry:**
- Suspends college access
- Notifies college admins

---

## 🌐 Multi-Domain Routing

### Subdomain Routing
```javascript
// Express middleware for subdomain routing
app.use((req, res, next) => {
  const subdomain = req.hostname.split('.')[0];
  
  // Find college by subdomain
  const college = await db.query(
    'SELECT * FROM Colleges WHERE domain = ?',
    [subdomain]
  );
  
  if (college) {
    req.college = college;
    req.college_id = college.college_id;
  }
  
  next();
});

// Routes automatically scoped to college
app.get('/events', async (req, res) => {
  const events = await db.query(
    'SELECT * FROM Events WHERE college_id = ? AND approval_status = "approved"',
    [req.college_id]
  );
  res.json(events);
});
```

---

## 📊 Analytics & Reporting

### Platform-Wide Analytics
```sql
-- Total revenue by plan
SELECT 
    p.plan_name,
    COUNT(DISTINCT s.college_id) as colleges,
    SUM(p.price_per_month) as monthly_revenue
FROM Subscriptions s
JOIN Plans p ON s.plan_id = p.plan_id
WHERE s.status = 'active'
GROUP BY p.plan_id;

-- Growth metrics
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as new_colleges
FROM Colleges
GROUP BY month
ORDER BY month DESC;
```

### Per-College Analytics
```sql
-- College performance
SELECT 
    c.college_name,
    COUNT(DISTINCT e.event_id) as total_events,
    COUNT(DISTINCT r.registration_id) as total_registrations,
    AVG(f.rating) as avg_rating,
    SUM(p.amount) as total_revenue
FROM Colleges c
LEFT JOIN Events e ON c.college_id = e.college_id
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
LEFT JOIN Payments p ON r.registration_id = p.registration_id AND p.payment_status = 'success'
WHERE c.college_id = 1
GROUP BY c.college_id;
```

---

## 🔧 Maintenance

### Clean Up Expired Trials
```sql
UPDATE Colleges
SET status = 'suspended'
WHERE status = 'trialing' 
AND expiry_date < CURDATE();
```

### Archive Old Data
```sql
-- Archive completed events older than 1 year
CREATE TABLE Events_Archive LIKE Events;

INSERT INTO Events_Archive
SELECT * FROM Events
WHERE status = 'completed' 
AND end_date < DATE_SUB(CURDATE(), INTERVAL 1 YEAR);

DELETE FROM Events
WHERE status = 'completed' 
AND end_date < DATE_SUB(CURDATE(), INTERVAL 1 YEAR);
```

---

## 🚀 Deployment Checklist

- [ ] Database created and schema imported
- [ ] Platform admin account created
- [ ] Subscription plans configured
- [ ] Email service configured
- [ ] Payment gateway integrated
- [ ] Subdomain routing configured
- [ ] SSL certificates for all domains
- [ ] Backup strategy implemented
- [ ] Monitoring and alerts setup
- [ ] Rate limiting configured
- [ ] GDPR compliance measures
- [ ] Terms of service and privacy policy

---

## 📞 Support

For detailed API implementation, see:
- `multi-tenant-api-guide.md` - API endpoints
- `multi-tenant-frontend-guide.md` - Frontend integration

---

**Your Multi-College SaaS Platform is Ready! 🎉**
