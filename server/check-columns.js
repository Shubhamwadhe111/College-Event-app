const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkColumns() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  console.log('Checking students table structure:\n');
  const [columns] = await connection.query('DESCRIBE students');
  
  console.log('Columns in students table:');
  columns.forEach(col => {
    console.log(`  - ${col.Field} (${col.Type})`);
  });
  
  await connection.end();
}

checkColumns();
