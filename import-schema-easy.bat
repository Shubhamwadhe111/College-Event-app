@echo off
echo ========================================
echo  Nexus Database Schema Import (Node.js)
echo ========================================
echo.
echo This will import your database schema using Node.js
echo No MySQL installation required!
echo.
pause

cd /d "%~dp0"
node import-schema-node.js

echo.
pause
