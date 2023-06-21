const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', (err, data) => {
    callback(err, data);
    setImmediate(() => console.log('Event loop tick after readFile'));
  });
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
  setImmediate(() => console.log('Event loop tick after setTimeout'));
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});

setImmediate(() => console.log('Event loop tick after starting someAsyncOperation'));
