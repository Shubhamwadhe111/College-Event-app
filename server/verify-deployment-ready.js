#!/usr/bin/env node

/**
 * Deployment Readiness Checker
 * Verifies that the backend is ready to be deployed to Render
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Backend Deployment Readiness...\n');

let allChecks = true;

// Check 1: package.json exists and has required scripts
console.log('1️⃣ Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  if (!packageJson.scripts || !packageJson.scripts.start) {
    console.log('   ❌ Missing "start" script in package.json');
    allChecks = false;
  } else {
    console.log('   ✅ package.json has start script');
  }
  
  const requiredDeps = ['express', 'mysql2', 'bcryptjs', 'cors', 'dotenv'];
  const missing = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missing.length > 0) {
    console.log(`   ❌ Missing dependencies: ${missing.join(', ')}`);
    allChecks = false;
  } else {
    console.log('   ✅ All required dependencies present');
  }
} catch (error) {
  console.log('   ❌ Error reading package.json:', error.message);
  allChecks = false;
}

// Check 2: server.js exists
console.log('\n2️⃣ Checking server.js...');
if (fs.existsSync(path.join(__dirname, 'server.js'))) {
  console.log('   ✅ server.js exists');
  
  // Check if it uses environment variables
  const serverContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
  if (serverContent.includes('process.env.PORT')) {
    console.log('   ✅ Uses PORT environment variable');
  } else {
    console.log('   ⚠️  Warning: Should use process.env.PORT');
  }
  
  // Check database.js for environment variables
  try {
    const dbContent = fs.readFileSync(path.join(__dirname, 'database.js'), 'utf8');
    if (dbContent.includes('process.env.DB_HOST')) {
      console.log('   ✅ Uses database environment variables');
    } else {
      console.log('   ❌ Missing database environment variables');
      allChecks = false;
    }
  } catch (error) {
    console.log('   ⚠️  Could not check database configuration');
  }
} else {
  console.log('   ❌ server.js not found');
  allChecks = false;
}

// Check 3: database.js exists
console.log('\n3️⃣ Checking database.js...');
if (fs.existsSync(path.join(__dirname, 'database.js'))) {
  console.log('   ✅ database.js exists');
} else {
  console.log('   ❌ database.js not found');
  allChecks = false;
}

// Check 4: .env.example or documentation
console.log('\n4️⃣ Checking environment variable documentation...');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  console.log('   ✅ .env file exists (for local development)');
  console.log('   ℹ️  Remember: You\'ll set these in Render dashboard, not .env');
} else {
  console.log('   ⚠️  No .env file (that\'s okay for deployment)');
}

// Check 5: render.yaml exists
console.log('\n5️⃣ Checking render.yaml...');
if (fs.existsSync(path.join(__dirname, 'render.yaml'))) {
  console.log('   ✅ render.yaml exists');
} else {
  console.log('   ⚠️  No render.yaml (optional, but helpful)');
}

// Check 6: Database schema exists
console.log('\n6️⃣ Checking database schema...');
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  console.log('   ✅ database/schema.sql exists');
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  const tableCount = (schemaContent.match(/CREATE TABLE/gi) || []).length;
  console.log(`   ℹ️  Found ${tableCount} tables in schema`);
} else {
  console.log('   ❌ database/schema.sql not found');
  allChecks = false;
}

// Check 7: CORS configuration
console.log('\n7️⃣ Checking CORS configuration...');
try {
  const serverContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
  if (serverContent.includes('shubhamwadhe111.github.io')) {
    console.log('   ✅ GitHub Pages URL in CORS allowlist');
  } else {
    console.log('   ⚠️  GitHub Pages URL not in CORS allowlist');
    console.log('   ℹ️  Add "https://shubhamwadhe111.github.io" to allowedOrigins');
  }
} catch (error) {
  console.log('   ⚠️  Could not check CORS configuration');
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecks) {
  console.log('✅ Backend is ready for deployment!');
  console.log('\n📋 Next steps:');
  console.log('   1. Create a cloud MySQL database (Aiven/PlanetScale/Railway)');
  console.log('   2. Import database/schema.sql to your cloud database');
  console.log('   3. Deploy to Render.com');
  console.log('   4. Set environment variables in Render dashboard');
  console.log('   5. Update frontend API URL in src/config/api.config.ts');
  console.log('   6. Deploy frontend: npm run deploy');
  console.log('\n📖 See DEPLOY_BACKEND_GUIDE.md for detailed instructions');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.');
  console.log('\n📖 See DEPLOY_BACKEND_GUIDE.md for help');
}
console.log('='.repeat(50) + '\n');

process.exit(allChecks ? 0 : 1);
