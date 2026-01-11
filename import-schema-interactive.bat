@echo off
echo ========================================
echo   Nexus Database Schema Import
echo ========================================
echo.
echo This script will help you import the database schema to Aiven MySQL
echo.
echo You will need:
echo   1. Aiven Host (e.g., nexus-mysql-xxx.aivencloud.com)
echo   2. Aiven Port (e.g., 27589)
echo   3. Aiven User (usually: avnadmin)
echo   4. Aiven Password
echo   5. Database Name (usually: defaultdb)
echo.
pause
echo.

set /p DB_HOST="Enter Aiven Host: "
set /p DB_PORT="Enter Aiven Port: "
set /p DB_USER="Enter Aiven User (usually avnadmin): "
set /p DB_PASSWORD="Enter Aiven Password: "
set /p DB_NAME="Enter Database Name (usually defaultdb): "

echo.
echo ========================================
echo   Connection Details
echo ========================================
echo Host: %DB_HOST%
echo Port: %DB_PORT%
echo User: %DB_USER%
echo Database: %DB_NAME%
echo.
echo Starting import...
echo.

node import-schema-node.js --host=%DB_HOST% --port=%DB_PORT% --user=%DB_USER% --password=%DB_PASSWORD% --database=%DB_NAME%

echo.
echo ========================================
echo   Import Complete!
echo ========================================
echo.
pause
