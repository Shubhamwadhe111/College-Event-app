/**
 * Comprehensive Website Connectivity Check
 * Tests all backend endpoints and connections used by the website
 */

const https = require('https');
const http = require('http');

const BACKEND_URL = 'https://nexus-event-backend.onrender.com';
const TIMEOUT = 10000; // 10 seconds

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: TIMEOUT
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', (error) => reject(error));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testEndpoint(name, url, method = 'GET', data = null) {
  process.stdout.write(`${colors.cyan}Testing ${name}...${colors.reset} `);
  
  try {
    const startTime = Date.now();
    const response = await makeRequest(url, method, data);
    const duration = Date.now() - startTime;
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`${colors.green}✓ OK${colors.reset} (${response.status}) - ${duration}ms`);
      return { success: true, status: response.status, duration };
    } else if (response.status >= 400 && response.status < 500) {
      console.log(`${colors.yellow}⚠ Client Error${colors.reset} (${response.status}) - ${duration}ms`);
      return { success: false, status: response.status, duration, error: 'Client error' };
    } else {
      console.log(`${colors.red}✗ Server Error${colors.reset} (${response.status}) - ${duration}ms`);
      return { success: false, status: response.status, duration, error: 'Server error' };
    }
  } catch (error) {
    console.log(`${colors.red}✗ FAILED${colors.reset} - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runConnectivityTests() {
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   NEXUS EVENT MANAGEMENT - CONNECTIVITY CHECK${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.cyan}Backend URL:${colors.reset} ${BACKEND_URL}`);
  console.log(`${colors.cyan}Timeout:${colors.reset} ${TIMEOUT}ms\n`);

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    tests: []
  };

  // 1. Health Check
  console.log(`\n${colors.yellow}━━━ 1. HEALTH CHECK ━━━${colors.reset}`);
  const health = await testEndpoint('Health Endpoint', `${BACKEND_URL}/api/health`);
  results.tests.push({ name: 'Health Check', ...health });
  results.total++;
  if (health.success) results.passed++; else results.failed++;

  // 2. Authentication Endpoints
  console.log(`\n${colors.yellow}━━━ 2. AUTHENTICATION ENDPOINTS ━━━${colors.reset}`);
  
  const authTests = [
    { name: 'Student Login', url: `${BACKEND_URL}/api/users/login`, method: 'POST', data: { email: 'test@test.com', password: 'test' } },
    { name: 'Student Register', url: `${BACKEND_URL}/api/users/register`, method: 'POST', data: { name: 'Test', email: 'test@test.com', password: 'test123' } },
    { name: 'Organizer Login', url: `${BACKEND_URL}/api/organizers/login`, method: 'POST', data: { email: 'test@test.com', password: 'test' } },
    { name: 'Organizer Register', url: `${BACKEND_URL}/api/organizers/register`, method: 'POST', data: { name: 'Test', email: 'test@test.com', password: 'test123', phone: '1234567890', department: 'Test', designation: 'Test' } },
    { name: 'Admin Login', url: `${BACKEND_URL}/api/admin/login`, method: 'POST', data: { email: 'test@test.com', password: 'test' } },
    { name: 'Admin Register', url: `${BACKEND_URL}/api/admin/register`, method: 'POST', data: { name: 'Test', email: 'test@test.com', password: 'test123', phone: '1234567890', department: 'Test', secretCode: 'test' } }
  ];

  for (const test of authTests) {
    const result = await testEndpoint(test.name, test.url, test.method, test.data);
    results.tests.push({ name: test.name, ...result });
    results.total++;
    if (result.success || result.status === 400 || result.status === 401) results.passed++; else results.failed++;
  }

  // 3. Events Endpoints
  console.log(`\n${colors.yellow}━━━ 3. EVENTS ENDPOINTS ━━━${colors.reset}`);
  
  const eventsTests = [
    { name: 'Get All Events', url: `${BACKEND_URL}/api/events` },
    { name: 'Get Event by ID', url: `${BACKEND_URL}/api/events/1` }
  ];

  for (const test of eventsTests) {
    const result = await testEndpoint(test.name, test.url);
    results.tests.push({ name: test.name, ...result });
    results.total++;
    if (result.success || result.status === 404) results.passed++; else results.failed++;
  }

  // 4. Admin Endpoints
  console.log(`\n${colors.yellow}━━━ 4. ADMIN ENDPOINTS ━━━${colors.reset}`);
  
  const adminTests = [
    { name: 'Get Admin Stats', url: `${BACKEND_URL}/api/admin/stats` },
    { name: 'Get Pending Organizers', url: `${BACKEND_URL}/api/admin/pending-organizers` },
    { name: 'Get Pending Events', url: `${BACKEND_URL}/api/admin/pending-events` }
  ];

  for (const test of adminTests) {
    const result = await testEndpoint(test.name, test.url);
    results.tests.push({ name: test.name, ...result });
    results.total++;
    if (result.success || result.status === 401) results.passed++; else results.failed++;
  }

  // 5. Database Connection (via backend)
  console.log(`\n${colors.yellow}━━━ 5. DATABASE CONNECTION ━━━${colors.reset}`);
  const dbTest = await testEndpoint('Database via Backend', `${BACKEND_URL}/api/health`);
  results.tests.push({ name: 'Database Connection', ...dbTest });
  results.total++;
  if (dbTest.success) results.passed++; else results.failed++;

  // Summary
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   CONNECTIVITY TEST SUMMARY${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.cyan}Total Tests:${colors.reset} ${results.total}`);
  console.log(`${colors.green}Passed:${colors.reset} ${results.passed}`);
  console.log(`${colors.red}Failed:${colors.reset} ${results.failed}`);
  
  const successRate = ((results.passed / results.total) * 100).toFixed(1);
  console.log(`${colors.cyan}Success Rate:${colors.reset} ${successRate}%`);

  // Average response time
  const responseTimes = results.tests.filter(t => t.duration).map(t => t.duration);
  if (responseTimes.length > 0) {
    const avgTime = (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(0);
    console.log(`${colors.cyan}Average Response Time:${colors.reset} ${avgTime}ms`);
  }

  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);

  // Status
  if (results.failed === 0) {
    console.log(`${colors.green}✓ ALL SYSTEMS OPERATIONAL${colors.reset}\n`);
  } else if (results.passed > results.failed) {
    console.log(`${colors.yellow}⚠ SOME ISSUES DETECTED${colors.reset}`);
    console.log(`${colors.yellow}Backend may be sleeping (Render free tier). Wait 30-60 seconds and retry.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}✗ CRITICAL ISSUES DETECTED${colors.reset}`);
    console.log(`${colors.red}Backend server may be down or unreachable.${colors.reset}\n`);
  }

  return results;
}

// Run the tests
runConnectivityTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
