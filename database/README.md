# College Event Registration and Management System
## Complete Database & Backend Implementation

---

## 📋 Overview

This is a complete database schema and backend implementation for a College Event Registration and Management System with **dual organizer workflow support**.

### Key Features
- ✅ Three user types: Students, Organizers, Admins
- ✅ Dual organizer workflows (configurable)
- ✅ Event approval system
- ✅ Payment tracking
- ✅ Certificate management
- ✅ Team registration
- ✅ Feedback system
- ✅ Real-time notifications
- ✅ Comprehensive audit logs

---

## 🎯 Dual Organizer Workflows

### Workflow A: Require Admin Approval
```
Organizer Registers → Pending Status → Admin Approves → Can Login → Create Events
```
- `account_status = 'pending'`
- `is_active = false`
- Cannot login until admin approves
- Admins receive notification

### Workflow B: Instant Login
```
Organizer Registers → Auto-Approved → Can Login Immediately → Create Events
```
- `account_status = 'approved'`
- `is_active = true`
- Can login immediately
- Events still require admin approval

### Configuration
Change workflow in `Admin_Settings` table:
```sql
UPDATE Admin_Settings 
SET setting_value = 'instant_login'  -- or 'require_admin_approval'
WHERE setting_key = 'organizer_signup_flow';
```

---

## 📁 Files Included

### 1. `schema.sql` (Complete Database Schema)
- 17 tables with relationships
- Triggers for business logic
- Stored procedures for common operations
- Views for optimized queries
- Sample data for testing

### 2. `api-endpoints.md` (API Documentation)
- Complete REST API endpoints
- Request/response examples
- Role-based access control
- Error handling
- Testing commands

### 3. `IMPLEMENTATION_GUIDE.md` (Step-by-Step Guide)
- Project structure
- Setup instructions
- Core implementation examples
- Workflow service details
- Testing strategies

### 4. `QUICK_REFERENCE.md` (Quick Commands)
- SQL queries
- API test commands
- Troubleshooting guide
- Performance optimization
- Security best practices

### 5. `sample-backend-code.js` (Working Code)
- Complete Node.js/Express implementation
- Workflow service
- Controllers
- Middleware
- Authentication

---

## 🚀 Quick Start

### Step 1: Setup Database
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE event_management;"

# Import schema
mysql -u root -p event_management < schema.sql
```

### Step 2: Install Dependencies
```bash
npm init -y
npm install express mysql2 bcrypt jsonwebtoken dotenv cors
```

### Step 3: Configure Environment
Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=event_management
JWT_SECRET=your-secret-key
PORT=3000
```

### Step 4: Run Server
```bash
node sample-backend-code.js
```

### Step 5: Test API
```bash
# Register organizer
curl -X POST http://localhost:3000/api/auth/organizer/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@college.edu","password":"test123"}'
```

---

## 📊 Database Schema

### Core Tables
1. **Admins** - System administrators
2. **Students** - Student users
3. **Organizers** - Event organizers
4. **Admin_Settings** - System configuration
5. **Events** - Event information
6. **Registrations** - Student event registrations
7. **Payments** - Payment tracking
8. **Certificates** - Certificate management
9. **Notifications** - User notifications
10. **Feedback** - Event feedback

### Supporting Tables
11. **Event_Categories** - Event categorization
12. **Event_Category_Link** - Many-to-many relationship
13. **Teams** - Team-based events
14. **Team_Members** - Team membership
15. **Announcements** - Admin announcements
16. **Event_Approval_Log** - Event approval history
17. **Organizer_Approval_Log** - Organizer approval history

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ SQL injection prevention (prepared statements)
- ✅ Input validation
- ✅ Audit logging
- ✅ Secure password requirements

---

## 📈 Key Business Rules

### Organizer Registration
1. Check `Admin_Settings.organizer_signup_flow`
2. Set `account_status` and `is_active` accordingly
3. Notify admins if approval required
4. Trigger `after_organizer_insert`

### Organizer Login
1. Verify credentials
2. Check `is_active = true`
3. Check `account_status = 'approved'`
4. Generate JWT token

### Event Creation
1. Check organizer `is_active` status
2. Set `approval_status = 'pending'`
3. Notify admins
4. Trigger `after_event_insert`

### Event Approval
1. Admin reviews event
2. Update `approval_status`
3. Log in `Event_Approval_Log`
4. Notify organizer and students
5. Trigger `after_event_approval`

---

## 🧪 Testing

### Test Workflow A (Require Approval)
```sql
-- Set workflow
UPDATE Admin_Settings SET setting_value = 'require_admin_approval' 
WHERE setting_key = 'organizer_signup_flow';

-- Register organizer (via API)
-- Check status
SELECT account_status, is_active FROM Organizers WHERE email = 'test@college.edu';
-- Should show: pending, false

-- Approve organizer
CALL sp_approve_organizer(2, 1, 'Approved');

-- Check status again
-- Should show: approved, true
```

### Test Workflow B (Instant Login)
```sql
-- Set workflow
UPDATE Admin_Settings SET setting_value = 'instant_login' 
WHERE setting_key = 'organizer_signup_flow';

-- Register organizer (via API)
-- Check status
SELECT account_status, is_active FROM Organizers WHERE email = 'test2@college.edu';
-- Should show: approved, true
```

---

## 📱 API Endpoints Summary

### Authentication
- `POST /api/auth/student/register`
- `POST /api/auth/student/login`
- `POST /api/auth/organizer/register`
- `POST /api/auth/organizer/login`
- `POST /api/auth/admin/login`

### Student
- `GET /api/student/events` - View approved events
- `POST /api/student/events/:id/register` - Register for event
- `POST /api/student/payments` - Submit payment
- `POST /api/student/events/:id/feedback` - Submit feedback

### Organizer
- `POST /api/organizer/events` - Create event
- `GET /api/organizer/events` - View my events
- `GET /api/organizer/events/:id/registrations` - View registrations
- `POST /api/organizer/events/:id/attendance` - Mark attendance
- `POST /api/organizer/certificates` - Issue certificate

### Admin
- `GET /api/admin/organizers/pending` - View pending organizers
- `POST /api/admin/organizers/:id/approve` - Approve organizer
- `POST /api/admin/organizers/:id/reject` - Reject organizer
- `GET /api/admin/events/pending` - View pending events
- `POST /api/admin/events/:id/approve` - Approve event
- `GET /api/admin/settings` - View settings
- `PUT /api/admin/settings/:key` - Update setting

---

## 🎨 Frontend Integration

### React Example
```javascript
// Register organizer
const registerOrganizer = async (data) => {
  const response = await fetch('http://localhost:3000/api/auth/organizer/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (result.data.requires_approval) {
    alert('Your account is pending approval');
  } else {
    alert('You can login now!');
  }
};

// Login with token
const loginOrganizer = async (email, password) => {
  const response = await fetch('http://localhost:3000/api/auth/organizer/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const result = await response.json();
  
  if (result.success) {
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));
  }
};

// Create event (with auth)
const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/organizer/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData)
  });
  
  return await response.json();
};
```

---

## 🔧 Troubleshooting

### Issue: Organizer can't login
```sql
-- Check status
SELECT account_status, is_active FROM Organizers WHERE email = 'user@college.edu';

-- Fix: Approve manually
UPDATE Organizers SET account_status = 'approved', is_active = TRUE WHERE email = 'user@college.edu';
```

### Issue: Events not visible
```sql
-- Check approval status
SELECT approval_status, status FROM Events WHERE event_id = 5;

-- Fix: Approve event
CALL sp_approve_event(5, 1, 'Approved');
```

### Issue: Notifications not working
```sql
-- Check triggers
SHOW TRIGGERS;

-- Recreate if needed
DROP TRIGGER IF EXISTS after_organizer_insert;
-- Then run schema.sql again
```

---

## 📚 Additional Resources

- **MySQL Documentation**: https://dev.mysql.com/doc/
- **Express.js Guide**: https://expressjs.com/
- **JWT Best Practices**: https://jwt.io/
- **Node.js Security**: https://nodejs.org/en/docs/guides/security/

---

## 🤝 Support

For questions or issues:
1. Check `QUICK_REFERENCE.md` for common solutions
2. Review `IMPLEMENTATION_GUIDE.md` for detailed explanations
3. Test with `sample-backend-code.js`
4. Check database triggers and stored procedures

---

## 📝 License

This is a sample implementation for educational purposes.

---

## ✅ Checklist

- [x] Complete database schema with 17 tables
- [x] Dual organizer workflow support
- [x] Triggers for business logic
- [x] Stored procedures for operations
- [x] Views for optimized queries
- [x] Complete API documentation
- [x] Working backend code examples
- [x] Authentication & authorization
- [x] Role-based access control
- [x] Notification system
- [x] Audit logging
- [x] Testing examples
- [x] Troubleshooting guide
- [x] Security best practices

---

**Ready to use! Start with `schema.sql` and follow `IMPLEMENTATION_GUIDE.md`** 🚀
