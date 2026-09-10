const net = require('net');
const tls = require('tls');

function testPort(host, port, isTls) {
  return new Promise((resolve) => {
    console.log(`Connecting to ${host}:${port} (TLS: ${isTls})...`);
    const timer = setTimeout(() => {
      console.log(`[TIMEOUT] ${host}:${port}`);
      resolve(false);
    }, 3000);

    if (isTls) {
      const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
        console.log(`[CONNECTED TLS SUCCESS] ${host}:${port}`);
        clearTimeout(timer);
        socket.destroy();
        resolve(true);
      });
      socket.on('error', (err) => {
        console.log(`[ERROR TLS] ${host}:${port} - ${err.message}`);
        clearTimeout(timer);
        resolve(false);
      });
    } else {
      const socket = net.connect(port, host, () => {
        console.log(`[CONNECTED PLAIN SUCCESS] ${host}:${port}`);
        clearTimeout(timer);
        socket.destroy();
        resolve(true);
      });
      socket.on('error', (err) => {
        console.log(`[ERROR PLAIN] ${host}:${port} - ${err.message}`);
        clearTimeout(timer);
        resolve(false);
      });
    }
  });
}

async function run() {
  await testPort('smtp.gmail.com', 465, true);
  await testPort('smtp.gmail.com', 587, false);
  await testPort('smtp.gmail.com', 25, false);
}

run();
