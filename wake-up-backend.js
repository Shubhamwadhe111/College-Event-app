/**
 * Backend Wake-Up Script
 * Sends requests to wake up the sleeping Render backend
 */

const https = require('https');

const BACKEND_URL = 'https://nexus-event-backend.onrender.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 20000; // 20 seconds

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      timeout: 65000 // 65 seconds
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: body
        });
      });
    });

    req.on('error', (error) => reject(error));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function wakeUpBackend() {
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   WAKING UP BACKEND SERVER${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.cyan}Backend URL:${colors.reset} ${BACKEND_URL}`);
  console.log(`${colors.cyan}Max Retries:${colors.reset} ${MAX_RETRIES}`);
  console.log(`${colors.cyan}Expected Time:${colors.reset} 30-60 seconds\n`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`${colors.yellow}━━━ Attempt ${attempt}/${MAX_RETRIES} ━━━${colors.reset}`);
    console.log(`${colors.cyan}Sending wake-up request...${colors.reset}`);
    
    const startTime = Date.now();
    
    try {
      const response = await makeRequest(`${BACKEND_URL}/api/health`);
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      if (response.status === 200) {
        console.log(`${colors.green}✓ Backend is AWAKE!${colors.reset}`);
        console.log(`${colors.cyan}Response Time:${colors.reset} ${duration}s`);
        console.log(`${colors.cyan}Status Code:${colors.reset} ${response.status}`);
        
        try {
          const data = JSON.parse(response.body);
          console.log(`${colors.cyan}Response:${colors.reset}`, data);
        } catch (e) {
          console.log(`${colors.cyan}Response:${colors.reset}`, response.body);
        }
        
        console.log(`\n${colors.green}✓ SUCCESS! Backend is now operational.${colors.reset}`);
        console.log(`${colors.cyan}The backend will stay awake for 15 minutes.${colors.reset}\n`);
        return true;
      } else {
        console.log(`${colors.yellow}⚠ Unexpected status: ${response.status}${colors.reset}`);
        console.log(`${colors.cyan}Response Time:${colors.reset} ${duration}s\n`);
      }
    } catch (error) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`${colors.red}✗ Failed: ${error.message}${colors.reset}`);
      console.log(`${colors.cyan}Time Elapsed:${colors.reset} ${duration}s\n`);
      
      if (attempt < MAX_RETRIES) {
        console.log(`${colors.yellow}Waiting ${RETRY_DELAY/1000} seconds before retry...${colors.reset}\n`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  console.log(`${colors.red}✗ Failed to wake up backend after ${MAX_RETRIES} attempts.${colors.reset}`);
  console.log(`${colors.yellow}This may indicate:${colors.reset}`);
  console.log(`  1. Backend is experiencing issues`);
  console.log(`  2. Network connectivity problems`);
  console.log(`  3. Render service is down\n`);
  console.log(`${colors.cyan}Try again in a few minutes or check Render dashboard.${colors.reset}\n`);
  
  return false;
}

// Run the wake-up
wakeUpBackend()
  .then((success) => process.exit(success ? 0 : 1))
  .catch((error) => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
