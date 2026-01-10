# Deploy Backend to Render (Free Tier)

This guide will help you deploy your backend to Render so your GitHub Pages website can save user data permanently.

## Why You Need This

GitHub Pages is **static hosting** - it can only serve HTML, CSS, and JavaScript files. It cannot:
- Run Node.js servers
- Connect to MySQL databases
- Store user data permanently

Your current setup uses **localStorage** as a fallback, which only saves data in your browser (not across devices).

## Step 1: Set Up a Cloud MySQL Database

Since Render's free tier doesn't include MySQL, you need a free cloud MySQL database.

### Option A: PlanetScale (Recommended - Free Tier)
1. Go to https://planetscale.com
2. Sign up for free account
3. Create a new database called `nexusxrcpit`
4. Go to "Connect" → "Create password"
5. Copy the connection details (host, username, password, database)

### Option B: Railway MySQL (Free Tier)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Add MySQL
4. Copy connection details from the Variables tab

### Option C: Aiven MySQL (Free Tier)
1. Go to https://aiven.io
2. Sign up for free
3. Create MySQL service (free tier)
4. Copy connection details

## Step 2: Import Your Database Schema

After creating your cloud database, import your schema:

1. Open your database console/CLI
2. Run the SQL from `database/schema.sql`

Or use a tool like MySQL Workbench to connect and import.

## Step 3: Deploy Backend to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository: `shubhamwadhe111/College-Event-app`
5. Configure:
   - **Name**: `nexus-event-backend`
   - **Root Directory**: `event-management-app/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:
   - `PORT`: `5001`
   - `DB_HOST`: (from your cloud MySQL)
   - `DB_USER`: (from your cloud MySQL)
   - `DB_PASSWORD`: (from your cloud MySQL)
   - `DB_NAME`: `nexusxrcpit`
   - `NODE_ENV`: `production`

7. Click "Create Web Service"

8. Wait for deployment (takes 2-5 minutes)

9. Copy your Render URL (e.g., `https://nexus-event-backend.onrender.com`)

## Step 4: Update Frontend Configuration

After deployment, update the API URL in your frontend:

1. Open `src/config/api.config.ts`
2. Replace the production URL:

```typescript
BASE_URL: process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? 'https://YOUR-RENDER-URL.onrender.com/api'  // Replace with your actual Render URL
    : 'http://localhost:5001/api'
),
```

3. Rebuild and deploy to GitHub Pages:
```bash
cd event-management-app
npm run deploy
```

## Step 5: Test Your Deployment

1. Visit your GitHub Pages site: https://shubhamwadhe111.github.io/College-Event-app/
2. Try registering a new account
3. Log out and log back in
4. Your data should now persist!

## Troubleshooting

### "Invalid credentials" after signup
- Check if your cloud database is running
- Verify environment variables in Render dashboard
- Check Render logs for errors

### Backend not responding
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier

### CORS errors
- Make sure your GitHub Pages URL is in the allowed origins
- The server.js has been updated to allow your domain

## Free Tier Limitations

- **Render**: Sleeps after 15 min inactivity, 750 hours/month
- **PlanetScale**: 5GB storage, 1 billion row reads/month
- **Railway**: $5 free credit/month

For a college project, these limits are more than enough!

## Need Help?

If you get stuck, check:
1. Render dashboard logs
2. Browser console for errors
3. Network tab for failed API requests
