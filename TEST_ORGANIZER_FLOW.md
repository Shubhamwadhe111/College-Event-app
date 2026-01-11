# 🧪 Test Organizer Approval Flow

**Quick test to verify the organizer registration and approval workflow**

---

## ✅ Prerequisites

1. Website deployed: https://shubhamwadhe111.github.io/College-Event-app/
2. Backend running: https://nexus-event-backend.onrender.com/api
3. Database connected (Aiven MySQL)

---

## 🧪 Test Steps

### Step 1: Register as Organizer (2 minutes)

1. Open: https://shubhamwadhe111.github.io/College-Event-app/
2. Click **"Sign Up"** button
3. Select **"Organizer"** tab
4. Fill in the form:
   ```
   Name: Test Organizer
   Club/Organization: Tech Club
   Email: testorg@example.com
   Phone: 9876543210
   Password: test123
   Confirm Password: test123
   ```
5. Click **"Create Organizer Account"**
6. ✅ **Expected**: Success message appears
   ```
   ✅ Organizer registration submitted successfully!
   
   Your request has been sent to the admin for approval.
   You will be able to login once approved.
   
   Please check back later or contact the admin.
   ```
7. ✅ **Expected**: Redirected to login page

---

### Step 2: Check Admin Portal (2 minutes)

1. Open: https://shubhamwadhe111.github.io/College-Event-app/nexusadmin
2. If not logged in as admin:
   - Click **"Sign Up"** (if no admin account)
   - Or click **"Sign In"** (if you have admin account)
   - Register/Login as admin
3. Click **"Organizers"** in the left sidebar
4. Click **"Pending Approval"** tab at the top
5. ✅ **Expected**: You should see "Test Organizer" in the list
6. ✅ **Expected**: Details should show:
   ```
   Name: Test Organizer
   Email: testorg@example.com
   Phone: 9876543210
   Department: Tech Club
   Status: Pending
   ```
7. Click **"Approve"** button
8. ✅ **Expected**: Success message appears
9. ✅ **Expected**: Organizer moves to "Active" tab

---

### Step 3: Login as Approved Organizer (1 minute)

1. Open: https://shubhamwadhe111.github.io/College-Event-app/
2. Click **"Sign In"** button
3. Select **"Organizer"** tab
4. Enter credentials:
   ```
   Email: testorg@example.com
   Password: test123
   ```
5. Click **"Sign In as Organizer"**
6. ✅ **Expected**: Login successful
7. ✅ **Expected**: Redirected to Create Event page
8. ✅ **Expected**: Can see "Create Event" form

---

## 🎯 Success Criteria

All these should be TRUE:

- [ ] Organizer registration shows success message
- [ ] Organizer appears in Admin Portal → Organizers → Pending Approval
- [ ] Admin can approve the organizer
- [ ] Approved organizer can login successfully
- [ ] Organizer is redirected to Create Event page after login

---

## 🐛 Troubleshooting

### Problem: "Network error" during registration
**Cause**: Backend is sleeping (Render free tier)  
**Solution**: Wait 30-60 seconds and try again

### Problem: Organizer not appearing in admin portal
**Cause**: Page not refreshed or backend delay  
**Solution**: 
1. Click "Refresh" button in admin portal
2. Wait 5 seconds and refresh browser
3. Check browser console for errors (F12)

### Problem: Can't login after approval
**Cause**: Approval didn't save or wrong credentials  
**Solution**:
1. Verify organizer is in "Active" tab in admin portal
2. Double-check email and password
3. Make sure "Organizer" tab is selected (not "Student")

### Problem: Backend not responding
**Cause**: Backend might be down  
**Solution**:
1. Check: https://nexus-event-backend.onrender.com/api/health
2. Should return: `{"status":"ok","message":"Backend is running"}`
3. If not, backend needs to be restarted

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Step 1: Register as Organizer
[ ] Registration form loads
[ ] Can fill in all fields
[ ] Submit button works
[ ] Success message appears
[ ] Redirected to login
Result: PASS / FAIL
Notes: ___________

Step 2: Check Admin Portal
[ ] Admin portal loads
[ ] Can login as admin
[ ] Organizers page loads
[ ] Pending tab shows organizer
[ ] Can see organizer details
[ ] Approve button works
[ ] Success message appears
Result: PASS / FAIL
Notes: ___________

Step 3: Login as Organizer
[ ] Login page loads
[ ] Can select Organizer type
[ ] Can enter credentials
[ ] Login button works
[ ] Login successful
[ ] Redirected to Create Event
Result: PASS / FAIL
Notes: ___________

Overall Result: PASS / FAIL
```

---

## 🔍 What to Check in Browser Console

Open browser console (F12 → Console) and look for:

### During Registration:
```
[AuthService] Registering organizer: testorg@example.com
[AuthService] Organizer registered successfully
```

### During Admin Portal Load:
```
=== LOADING ORGANIZERS FROM BACKEND ===
Fetched organizers from backend: [...]
Transformed organizers: [...]
```

### During Login:
```
[AuthService] Logging in organizer: testorg@example.com
[AuthService] Organizer login successful
```

---

## 📝 Notes

- This test verifies the complete organizer approval workflow
- All data is stored in cloud database (not localStorage)
- Backend may take 30-60 seconds on first request (cold start)
- Test can be repeated with different email addresses
- Previous test data can be deleted from admin portal

---

**Test Duration**: ~5 minutes  
**Difficulty**: Easy  
**Prerequisites**: None (just need internet connection)

🎉 Happy Testing!
