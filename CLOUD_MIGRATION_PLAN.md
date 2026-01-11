# 🚀 Cloud Database Migration Plan

## Goal
Connect all portals and pages to the cloud database (Aiven MySQL + Render backend)

## Current Status
- ✅ Backend deployed to Render
- ✅ Database hosted on Aiven
- ✅ Admin Organizers page connected
- ⏳ All other pages still using localStorage

## Components to Migrate

### 1. Authentication System
- [x] AuthContext.tsx - Login/Register/Logout
- [ ] Register.tsx - Student registration
- [ ] Login.tsx - Student login
- [ ] AdminRegister.tsx - Admin registration
- [ ] NexusadminLogin.tsx - Admin login
- [ ] NexusSuperLogin.tsx - Super admin login

### 2. Main Portal (Student-facing)
- [ ] Events.tsx - Browse events
- [ ] EventDetails.tsx - View event details
- [ ] CreateEvent.tsx - Create events (organizers)
- [ ] MyEvents.tsx - My registered events
- [ ] NotificationsPage.tsx - View notifications

### 3. Admin Portal
- [x] EnhancedOrganizersPage.tsx - Manage organizers ✅
- [ ] EnhancedEventsPage.tsx - Manage events
- [ ] EnhancedAdminDashboard.tsx - Dashboard stats
- [ ] EnhancedApprovalsPage.tsx - Approvals
- [ ] EnhancedAnalyticsPage.tsx - Analytics
- [ ] EnhancedNotificationsPage.tsx - Notifications

### 4. Super Admin Portal
- [ ] EnhancedAdminsPage.tsx - Manage admins
- [ ] EnhancedMasterEventsPage.tsx - All events
- [ ] EnhancedCollegesPage.tsx - Manage colleges
- [ ] SuperAdminHomePage.tsx - Dashboard

### 5. Context Providers
- [ ] AuthContext.tsx - Authentication state
- [ ] EventContext.tsx - Events state
- [ ] NotificationContext.tsx - Notifications state

## Migration Strategy

### Phase 1: Core Authentication (Priority 1)
1. Update AuthContext to use backend API
2. Update Register.tsx for student registration
3. Update Login.tsx for student login
4. Update organizer registration/login

### Phase 2: Main Portal (Priority 2)
1. Update Events.tsx to fetch from API
2. Update EventDetails.tsx to fetch from API
3. Update CreateEvent.tsx to post to API
4. Update MyEvents.tsx to fetch from API

### Phase 3: Admin Portal (Priority 3)
1. Update EnhancedEventsPage.tsx
2. Update EnhancedAdminDashboard.tsx
3. Update EnhancedApprovalsPage.tsx
4. Update other admin pages

### Phase 4: Super Admin Portal (Priority 4)
1. Update all super admin pages
2. Update admin management
3. Update system settings

## Implementation Approach

For each component:
1. ✅ Identify current localStorage usage
2. ✅ Find corresponding backend API endpoint
3. ✅ Update fetch logic to use API
4. ✅ Add fallback to localStorage (for offline mode)
5. ✅ Test functionality
6. ✅ Deploy changes

## API Endpoints Available

### Users
- POST /api/users/register - Register student
- POST /api/users/login - Login student
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- DELETE /api/users/:id - Delete user

### Organizers
- POST /api/organizers/register - Register organizer
- POST /api/organizers/login - Login organizer
- GET /api/admin/pending-organizers - Get pending organizers
- POST /api/admin/organizers/:id/approve - Approve/reject organizer

### Events
- POST /api/events - Create event
- GET /api/events - Get all approved events
- GET /api/events/:id - Get event by ID
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event
- GET /api/admin/pending-events - Get pending events
- POST /api/admin/events/:id/approve - Approve/reject event

### Registrations
- POST /api/registrations - Register for event
- GET /api/registrations/student/:studentId - Get student registrations
- GET /api/registrations/event/:eventId - Get event registrations

### Admins
- POST /api/admins/register - Register admin
- POST /api/admins/login - Login admin

## Testing Checklist

After each migration:
- [ ] Registration works
- [ ] Login works
- [ ] Data persists across devices
- [ ] Fallback to localStorage works
- [ ] No console errors
- [ ] UI updates correctly

## Deployment Steps

After completing migration:
1. Build frontend: `npm run build`
2. Deploy to GitHub Pages: `npm run deploy`
3. Commit to GitHub: `git add -A && git commit -m "message" && git push`
4. Test on live site
5. Verify all features work

## Rollback Plan

If issues occur:
1. Revert to previous commit
2. Redeploy previous version
3. Fix issues locally
4. Test thoroughly
5. Redeploy

---

**Status**: Ready to begin Phase 1
**Next Step**: Update AuthContext.tsx
