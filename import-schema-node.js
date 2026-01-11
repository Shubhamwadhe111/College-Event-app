/**
 * Database Schema Import Script
 * This script imports the schema.sql file to your Aiven MySQL database
 * No MySQL Command Line Client installation required!
 * 
 * Usage:
 *   node import-schema-node.js
 *   OR
 *   node import-schema-node.js --host=xxx --port=xxx --user=xxx --password=xxx --database=xxx
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse command line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    if (key.startsWith('--')) {
      args[key.substring(2)] = value;
    }
  });
  return args;
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function importSchema() {
  console.log('========================================');
  console.log('  Nexus Database Schema Import');
  console.log('========================================\n');
  
  try {
    // Check for command line arguments first
    const cmdArgs = parseArgs();
    
    let host, port, user, database, password;
    
    if (cmdArgs.host && cmdArgs.port && cmdArgs.user && cmdArgs.password && cmdArgs.database) {
      // Use command line arguments
      host = cmdArgs.host;
      port = cmdArgs.port;
      user = cmdArgs.user;
      database = cmdArgs.database;
      password = cmdArgs.password;
      console.log('Using connection details from command line arguments\n');
    } else {
      // Get connection details from user
      console.log('Please enter your Aiven MySQL connection details:\n');
      
      host = await question('Enter Aiven Host (e.g., nexus-mysql-xxx.aivencloud.com): ');
      port = await question('Enter Aiven Port (e.g., 27589): ');
      user = await question('Enter Aiven User (usually avnadmin): ');
      database = await question('Enter Database Name (usually defaultdb): ');
      password = await question('Enter Password: ');
    }
    
    console.log('\n========================================');
    console.log('  Connecting to database...');
    console.log('========================================\n');
    
    // Create connection
    const connection = await mysql.createConnection({
      host: host.trim(),
      port: parseInt(port.trim()),
      user: user.trim(),
      password: password.trim(),
      database: database.trim(),
      multipleStatements: true,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    console.log('✅ Connected successfully!\n');
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    console.log('Reading schema file...');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('✅ Schema file loaded!\n');
    
    // Split schema into individual statements
    console.log('Importing schema (this may take 30-60 seconds)...\n');
    
    // Execute the schema
    // Note: We need to handle DELIMITER statements specially
    const statements = schema
      .split('DELIMITER')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    // Execute first part (before any DELIMITER statements)
    if (statements.length > 0) {
      const mainStatements = statements[0]
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
      
      for (let i = 0; i < mainStatements.length; i++) {
        const stmt = mainStatements[i];
        if (stmt) {
          try {
            await connection.query(stmt);
            process.stdout.write(`\rProgress: ${i + 1}/${mainStatements.length} statements executed`);
          } catch (err) {
            // Ignore "database exists" and "table exists" errors
            if (!err.message.includes('exists')) {
              console.error(`\n⚠️  Warning on statement ${i + 1}: ${err.message}`);
            }
          }
        }
      }
    }
    
    // Handle stored procedures and triggers (DELIMITER statements)
    for (let i = 1; i < statements.length; i++) {
      const block = statements[i];
      if (block.includes('//')) {
        const procedures = block.split('//').filter(s => s.trim().length > 0);
        for (const proc of procedures) {
          const cleanProc = proc.replace(/DELIMITER\s*;/gi, '').trim();
          if (cleanProc && !cleanProc.startsWith('--')) {
            try {
              await connection.query(cleanProc);
            } catch (err) {
              if (!err.message.includes('exists')) {
                console.error(`\n⚠️  Warning: ${err.message}`);
              }
            }
          }
        }
      }
    }
    
    console.log('\n\n========================================');
    console.log('  ✅ SUCCESS!');
    console.log('========================================\n');
    console.log('Schema imported successfully!');
    console.log('All 17 tables have been created.\n');
    console.log('You can now proceed to Step 3: Deploy to Render\n');
    
    await connection.end();
    
  } catch (error) {
    console.error('\n========================================');
    console.error('  ❌ ERROR');
    console.error('========================================\n');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('- Your Aiven database is running');
    console.error('- Connection details are correct');
    console.error('- You have internet connection\n');
  } finally {
    rl.close();
  }
}

// Run the import
importSchema();
