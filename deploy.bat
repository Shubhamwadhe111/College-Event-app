@echo off
echo 🚀 Deploying Nexus Events Platform...
echo.

echo 📦 Building the project...
call npm run build

echo.
echo ✅ Build complete! 

echo.
echo 🌐 Choose your deployment option:
echo 1. GitHub Pages (Recommended)
echo 2. Netlify (Drag & Drop)
echo 3. Vercel (CLI)
echo.

echo For GitHub Pages:
echo 1. Create a GitHub repository named 'nexus-events'
echo 2. Run: git init
echo 3. Run: git add .
echo 4. Run: git commit -m "Deploy Nexus Events"
echo 5. Run: git remote add origin https://github.com/yourusername/nexus-events.git
echo 6. Run: git push -u origin main
echo 7. Run: npm run deploy
echo.

echo For Netlify:
echo 1. Go to https://netlify.com
echo 2. Drag the 'build' folder to deploy
echo 3. Change site name to 'nexus-events'
echo.

echo 🎉 Your site will be live and searchable as "Nexus Events"!

pause