@echo off
echo ========================================
echo  Nexus Database Schema Import
echo ========================================
echo.
echo This script will import the database schema to your Aiven MySQL database.
echo.
echo Please enter your Aiven connection details:
echo.

set /p DB_HOST="Enter Aiven Host (e.g., nexus-mysql-xxx.aivencloud.com): "
set /p DB_PORT="Enter Aiven Port (e.g., 27589): "
set /p DB_USER="Enter Aiven User (usually avnadmin): "
set /p DB_NAME="Enter Database Name (usually defaultdb): "

echo.
echo Connecting to: %DB_HOST%:%DB_PORT%
echo Database: %DB_NAME%
echo User: %DB_USER%
echo.
echo You will be prompted for your password...
echo.

mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p %DB_NAME% < database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Schema imported successfully!
    echo ========================================
    echo.
    echo You can now proceed to Step 3: Deploy to Render
    echo.
) else (
    echo.
    echo ========================================
    echo  ERROR: Schema import failed
    echo ========================================
    echo.
    echo Please check:
    echo - Your Aiven database is running
    echo - Connection details are correct
    echo - MySQL client is installed
    echo.
)

pause
