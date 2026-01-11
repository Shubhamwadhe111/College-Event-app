# 🗄️ Aiven Database Schema Import Guide

## Option 1: Using Node.js Script (RECOMMENDED - EASIEST)

This is the simplest method and works on any system with Node.js installed.

### Steps:

1. **Open Command Prompt** in the `event-management-app` folder

2. **Run the import script**:
   ```bash
   node import-schema-node.js
   ```

3. **Enter your Aiven connection details** when prompted:
   - **Host**: Found in Aiven dashboard (e.g., `nexus-mysql-xxx.aivencloud.com`)
   - **Port**: Usually `27589` or similar
   - **User**: Usually `avnadmin`
   - **Password**: The password you set when creating the database
   - **Database**: Usually `defaultdb`

4. **Wait for completion** (30-60 seconds)

5. **Done!** You should see "✅ SUCCESS!" message

---

## Option 2: Using Aiven Web Interface

If you don't see a "Query Editor" option in Aiven, follow these steps:

### Finding the Query Editor in Aiven:

1. **Go to your Aiven dashboard**: https://console.aiven.io/

2. **Click on your MySQL service** (the one you created)

3. **Look for these tabs at the top**:
   - Overview
   - Databases
   - Users
   - Pools
   - **Query Editor** ← This is what you need
   - Backups
   - Logs

4. **If you don't see "Query Editor"**:
   - Make sure your service is **running** (green status)
   - Try refreshing the page
   - Check if you're on the free tier (some features might be limited)

### Using Query Editor:

1. **Click "Query Editor" tab**

2. **Connect to database**:
   - Select database: `defaultdb`
   - Click "Connect"

3. **Copy and paste the schema**:
   - Open `database/schema.sql` file
   - Copy ALL content (Ctrl+A, Ctrl+C)
   - Paste into Query Editor
   - Click "Run" or "Execute"

4. **Wait for execution** (may take 1-2 minutes)

5. **Check for errors**:
   - If you see errors about "DELIMITER", that's normal
   - As long as you see tables created, you're good!

---

## Option 3: Using MySQL Workbench (If You Have It)

### Steps:

1. **Open MySQL Workbench**

2. **Create New Connection**:
   - Connection Name: `Aiven Nexus`
   - Hostname: Your Aiven host (e.g., `nexus-mysql-xxx.aivencloud.com`)
   - Port: Your Aiven port (e.g., `27589`)
   - Username: `avnadmin`
   - Password: Click "Store in Vault" and enter your password

3. **Test Connection** (click "Test Connection" button)

4. **Connect to database**

5. **Import Schema**:
   - Go to: Server → Data Import
   - Select "Import from Self-Contained File"
   - Browse to: `event-management-app/database/schema.sql`
   - Default Target Schema: `defaultdb`
   - Click "Start Import"

6. **Wait for completion**

---

## Option 4: Using Command Line MySQL Client (Advanced)

If you have MySQL command line client installed:

```bash
mysql -h YOUR_AIVEN_HOST -P YOUR_PORT -u avnadmin -p defaultdb < database/schema.sql
```

Replace:
- `YOUR_AIVEN_HOST` with your Aiven host
- `YOUR_PORT` with your Aiven port
- Enter password when prompted

---

## Verifying the Import

After importing, verify that tables were created:

### Using Node.js:
```bash
cd server
node test-db.js
```

### Using Aiven Query Editor:
```sql
SHOW TABLES;
```

You should see **17 tables**:
1. Admins
2. Students
3. Organizers
4. Admin_Settings
5. Events
6. Event_Categories
7. Event_Category_Link
8. Registrations
9. Payments
10. Certificates
11. Teams
12. Team_Members
13. Feedback
14. Announcements
15. Notifications
16. Event_Approval_Log
17. Organizer_Approval_Log

---

## Troubleshooting

### "Can't connect to database"
- ✅ Check if Aiven service is running (green status)
- ✅ Verify connection details are correct
- ✅ Check if your IP is allowed (Aiven usually allows all IPs by default)
- ✅ Make sure you're using SSL/TLS connection

### "DELIMITER errors"
- ✅ This is normal with some tools
- ✅ Use the Node.js script instead (Option 1)
- ✅ The script handles DELIMITER statements correctly

### "Password not working"
- ✅ Copy password from Aiven dashboard (don't type it)
- ✅ Make sure there are no extra spaces
- ✅ Try resetting password in Aiven dashboard

### "No Query Editor in Aiven"
- ✅ Make sure service is fully started (not initializing)
- ✅ Try using Option 1 (Node.js script) instead
- ✅ Check if you're using the correct Aiven plan

---

## What to Do After Import

1. **Verify tables exist** (see "Verifying the Import" above)

2. **Update your `.env` file** in `server` folder:
   ```
   DB_HOST=your-aiven-host.aivencloud.com
   DB_PORT=27589
   DB_USER=avnadmin
   DB_PASSWORD=your-password
   DB_NAME=defaultdb
   ```

3. **Test backend connection**:
   ```bash
   cd server
   node test-db.js
   ```

4. **Proceed to Step 3**: Deploy backend to Render (see `DEPLOY_BACKEND_GUIDE.md`)

---

## Need Help?

If you're still stuck:

1. **Check Aiven service status** - Make sure it's running
2. **Try Option 1** (Node.js script) - It's the most reliable
3. **Check the logs** in Aiven dashboard
4. **Verify your connection details** are correct

---

**Recommended**: Use **Option 1** (Node.js script) - it's the easiest and most reliable method!
