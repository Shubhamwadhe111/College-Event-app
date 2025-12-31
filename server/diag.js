
const { exec } = require('child_process');

console.log('--- Starting Diagnostic Script ---');

console.log('\n--- Running Database Test ---');
const dbTest = exec('node test-db.js');

dbTest.stdout.on('data', (data) => {
  console.log(data);
});

dbTest.stderr.on('data', (data) => {
  console.error(data);
});

dbTest.on('close', (code) => {
  console.log(`--- Database Test Finished with Code ${code} ---`);
  if (code === 0) {
    console.log('\n--- Database Test Successful, Starting Server ---');
    const server = exec('npm start');

    server.stdout.on('data', (data) => {
      console.log(data);
    });

    server.stderr.on('data', (data) => {
      console.error(data);
    });

    server.on('close', (code) => {
      console.log(`--- Server Process Finished with Code ${code} ---`);
    });
  } else {
    console.error('\n--- Database Test Failed. Server will not be started. ---');
  }
});
