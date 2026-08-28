const http = require('http');

const data = JSON.stringify({ prompt: 'transfer 50k to charlie' });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/agent',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.write(data);
req.end();
