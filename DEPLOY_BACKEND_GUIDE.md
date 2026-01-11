# 🚀 Complete Backend Deployment Guide

## Current Status
Your app is running in **DEMO MODE** using localStorage. This guide will help you deploy the backend to get **persistent data** across all devices.

## What You'll Get After Deployment
✅ Data persists across devices and browsers  
✅ Real user authentication with secure passwords  
✅ Organizer approval workflow works properly  
✅ All users can access the same events and data  
✅ Professional production setup  

---

## Step 1: Create Free Cloud MySQL Database

You need a MySQL database first. Choose ONE option:

### Option A: Aiven (Recommended - Easiest)

1. Go to https://aiven.io
2. Click "Sign up" → Use GitHub or email
3. After signup, click "Create service"
4. Select:
   - **Service**: MySQL
   - **Cloud**: AWS
   - **Region**: Choose closest to you (e.g., US East)
   - **Plan**: Hobbyist (FREE)
   - **Service name**: `nexus-mysql`
5. Click "Create service" (takes 2-3 minutes to start)
6. Once running, click on your service
7. Go to "Overview" tab and copy:
   - **Host** (e.g., `nexus-mysql-xxx.aivencloud.com`)
   - **Port** (usually `12345`)
   - **User** (usually `avnadmin`)
   - **Password** (click "Show" to reveal)
   - **Database** (usually `defaultdb`)

### Option B: PlanetScale

1. Go to https://planetscale.com
2. Sign up with GitHub
3. Create new database: `nexusxrcpit`
4. Click "Connect" → "Create password"
5. Copy connection details

### Option C: Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Add MySQL
4. Copy connection details from Variables tab

---

## Step 2: Import Database Schema

After your database is running, import the schema:

### Using Aiven Console (Easiest)
1. In Aiven dashboard, go to your MySQL service
2. Click "Query Editor" tab
3. Copy ALL content from `event-management-app/database/schema.sql`
4. Paste into Query Editor
5. Click "Run" or press Ctrl+Enter
6. You should see "Query executed successfully"

### Using MySQL Workbench (Alternative)
1. Download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Create new connection with your database details
3. File → Run SQL Script → Select `database/schema.sql`
4. Execute

---

## Step 3: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Sign up** with your GitHub account
3. **Click "New +"** → Select "Web Service"
4. **Connect Repository**:
   - Click "Connect account" if needed
   - Find and select: `shubhamwadhe111/College-Event-app`
   - Click "Connect"

5. **Configure Service**:
   ```
   Name: nexus-event-backend
   Region: Choose closest to you
   Branch: master
   Root Directory: event-management-app/server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

6. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   
   Add these variables with YOUR database details:
   ```
   PORT = 5001
   NODE_ENV = production
   DB_HOST = [Your database host from Step 1]
   DB_PORT = [Your database port, usually 3306 or 12345]
   DB_USER = [Your database username]
   DB_PASSWORD = [Your database password]
   DB_NAME = [Your database name, e.g., defaultdb or nexusxrcpit]
   ```

7. **Click "Create Web Service"**

8. **Wait for deployment** (2-5 minutes)
   - You'll see build logs
   - Wait for "Your service is live 🎉"

9. **Copy your Render URL**:
   - It will be something like: `https://nexus-event-backend.onrender.com`
   - **IMPORTANT**: Save this URL!

---

## Step 4: Update Frontend Configuration

Now update your frontend to use the deployed backend:

1. **Open** `event-management-app/src/config/api.config.ts`

2. **Find this line** (around line 10):
   ```typescript
   ? 'https://nexus-event-backend.onrender.com/api'
   ```

3. **Replace with YOUR Render URL**:
   ```typescript
   ? 'https://YOUR-ACTUAL-RENDER-URL.onrender.com/api'
   ```
   
   Example:
   ```typescript
   ? 'https://nexus-event-backend-abc123.onrender.com/api'
   ```

4. **Save the file**

---

## Step 5: Deploy Updated Frontend

Now deploy your updated frontend to GitHub Pages:

```bash
cd event-management-app
npm run build
npm run deploy
```

Wait for deployment to complete (1-2 minutes).

---

## Step 6: Test Your Deployment

1. **Visit your site**: https://shubhamwadhe111.github.io/College-Event-app/

2. **Register a new account**:
   - Go to Register page
   - Create a student account
   - Submit

3. **Check if it worked**:
   - You should see "Registration successful"
   - Try logging in with your new account
   - If it works, your backend is connected! 🎉

4. **Test organizer approval**:
   - Register as an organizer
   - Login to admin portal
   - Check Organizers page → Pending tab
   - You should see the organizer request!

---

## Troubleshooting

### ❌ "Failed to connect to backend"

**Check Render Logs**:
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for errors

**Common issues**:
- Database credentials wrong → Check environment variables
- Database not running → Check Aiven/PlanetScale dashboard
- Schema not imported → Re-run Step 2

### ❌ "Invalid credentials" after signup

**Database connection issue**:
1. Check Render logs for database errors
2. Verify all environment variables are correct
3. Test database connection in Aiven console

### ⏰ Backend is slow (30-60 seconds)

**This is normal for free tier**:
- Render free tier "sleeps" after 15 minutes of inactivity
- First request wakes it up (takes 30-60 seconds)
- Subsequent requests are fast
- This is expected behavior for free hosting

### 🔒 CORS errors in browser console

**Update CORS settings**:
1. Open `event-management-app/server/server.js`
2. Find `allowedOrigins` array
3. Make sure it includes your GitHub Pages URL
4. Redeploy to Render

---

## Free Tier Limits

**Render Free Tier**:
- ✅ 750 hours/month (enough for 24/7)
- ⚠️ Sleeps after 15 min inactivity
- ✅ Automatic HTTPS
- ✅ Automatic deployments from GitHub

**Aiven Free Tier**:
- ✅ 1 CPU, 1GB RAM
- ✅ 5GB storage
- ✅ Enough for 1000+ users
- ✅ Daily backups

**Perfect for college projects!**

---

## Maintenance

### Update Backend Code
1. Make changes to `server/` files
2. Commit and push to GitHub
3. Render auto-deploys (takes 2-3 minutes)

### Update Frontend
```bash
cd event-management-app
npm run deploy
```

### View Logs
- Render Dashboard → Your Service → Logs tab
- Real-time logs of all requests and errors

### Backup Database
- Aiven: Automatic daily backups
- Manual: Export from Query Editor

---

## Need Help?

**Check these in order**:
1. ✅ Render logs (most common issues show here)
2. ✅ Browser console (F12) for frontend errors
3. ✅ Network tab (F12) to see API requests
4. ✅ Aiven dashboard to verify database is running

**Common Error Messages**:
- `ECONNREFUSED` → Database not accessible
- `ER_ACCESS_DENIED` → Wrong database credentials
- `CORS error` → Frontend URL not in allowed origins
- `502 Bad Gateway` → Backend is starting up (wait 30 sec)

---

## Success Checklist

After deployment, verify:
- [ ] Render service shows "Live" status
- [ ] Database shows "Running" in Aiven
- [ ] Can register new account on website
- [ ] Can login with registered account
- [ ] Data persists after logout/login
- [ ] Organizer approval shows in admin portal
- [ ] No localStorage warnings in console

---

## What's Next?

Once deployed, you can:
- ✅ Share your website with anyone
- ✅ Users can register and login from any device
- ✅ Admins can approve organizers
- ✅ Events are visible to all users
- ✅ Data is backed up automatically

**Your app is now production-ready!** 🚀
