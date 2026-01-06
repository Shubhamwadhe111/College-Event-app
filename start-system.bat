@echo off
echo ========================================
echo   NEXUS EVENT MANAGEMENT SYSTEM
echo   Permanent Connection Setup
echo ========================================
echo.

echo Starting Backend Server...
cd server
start "Backend Server" cmd /k "npm start"
cd ..

echo Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo Starting Frontend Application...
start "Frontend App" cmd /k "npm start"

echo.
echo ========================================
echo   SYSTEM STARTUP COMPLETE
echo ========================================
echo.
echo Frontend: http://localhost:3000/College-Event-app
echo Backend:  http://localhost:5001/api
echo Admin:    http://localhost:3000/College-Event-app/nexusadmin.html
echo.
echo Both services are now running in separate windows.
echo Close this window when done.
echo ========================================

pause