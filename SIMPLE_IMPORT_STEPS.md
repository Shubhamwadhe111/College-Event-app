# 🚀 Simple Database Import - Step by Step

## What You Need

From your Aiven dashboard, get these 5 things:

1. **Host** - Something like: `nexus-mysql-xxx.aivencloud.com`
2. **Port** - Usually: `27589`
3. **User** - Usually: `avnadmin`
4. **Password** - The password you created
5. **Database** - Usually: `defaultdb`

---

## Step 1: Test Your Connection First

Before importing, let's make sure you can connect:

```bash
cd event-management-app
node test-aiven-connection.js
```

**Enter your 5 details when asked.**

### Expected Result:
- ✅ "Connection successful!"
- Shows MySQL version
- Shows "0 tables found" (because we haven't imported yet)

### If it fails:
- Double-check your password (copy-paste from Aiven)
- Make sure Aiven service is running (green status)
- Check internet connection

---

## Step 2: Import the Schema

Once connection test works, import the schema:

```bash
node import-schema-node.js
```

**Enter the same 5 details again.**

### Expected Result:
- ✅ "Schema imported successfully!"
- "All 17 tables have been created"

### This will take 30-60 seconds.

---

## Step 3: Verify Import Worked

Test again to see the tables:

```bash
node test-aiven-connection.js
```

### Expected Result:
- ✅ "Connection successful!"
- Shows "17 tables found"
- Lists all table names

---

## Step 4: Update Your Backend Config

Now update your backend to use Aiven:

1. **Open**: `server/.env` file

2. **Update these lines**:
   ```
   DB_HOST=your-aiven-host.aivencloud.com
   DB_PORT=27589
   DB_USER=avnadmin
   DB_PASSWORD=your-password
   DB_NAME=defaultdb
   ```

3. **Save the file**

---

## Step 5: Test Backend Connection

```bash
cd server
node test-db.js
```

### Expected Result:
- ✅ "Database connection successful!"
- Shows database name and version

---

## Step 6: Deploy to Render

Now you're ready to deploy! Follow the Render deployment guide:

1. Go to: https://render.com
2. Sign up / Log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `nexus-event-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `event-management-app/server`

6. Add Environment Variables (same as your `.env` file):
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `DB_HOST` = your Aiven host
   - `DB_PORT` = `27589`
   - `DB_USER` = `avnadmin`
   - `DB_PASSWORD` = your password
   - `DB_NAME` = `defaultdb`

7. Click "Create Web Service"

8. Wait 3-5 minutes for deployment

---

## Troubleshooting

### "Password not working"
- Copy password from Aiven (don't type it)
- Make sure no extra spaces
- Try resetting password in Aiven dashboard

### "Can't connect"
- Check Aiven service status (must be green/running)
- Verify all 5 connection details
- Check internet connection

### "DELIMITER errors"
- Ignore these - they're harmless
- As long as you see "17 tables created", you're good

### "Script hangs at password"
- Press Enter after typing password
- Or use Ctrl+C to cancel and try again

---

## Quick Reference

### All Commands in Order:

```bash
# 1. Test connection
cd event-management-app
node test-aiven-connection.js

# 2. Import schema
node import-schema-node.js

# 3. Verify import
node test-aiven-connection.js

# 4. Test backend
cd server
node test-db.js
```

---

## What's Next?

After successful import:

1. ✅ Database is ready
2. ✅ 17 tables created
3. ✅ Backend can connect
4. 🚀 Deploy to Render
5. 🎉 Your app is live!

---

## Need Help?

If stuck at any step:

1. **Check Aiven dashboard** - Service must be running
2. **Verify connection details** - Copy-paste, don't type
3. **Run test script first** - `node test-aiven-connection.js`
4. **Check error messages** - They usually tell you what's wrong

---

**Remember**: The password prompt might not show asterisks (*) when you type. That's normal - just type and press Enter!
