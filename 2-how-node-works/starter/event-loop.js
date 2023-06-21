const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 1;

const start = Date.now();

setTimeout(() => console.log("2. Timer 1 finished"), 0); // 2
setImmediate(() => console.log("5. Immediate 1 finished")); // 5
fs.readFile("test-file.txt", (err, data) => {
  console.log("3. I/O finished"); // 3
  setTimeout(() => console.log("7. Timer 2 finished"), 0); // 7
  setTimeout(() => console.log("8. Timer 3 finished"), 200); // 8
  setImmediate(() => console.log("6. Immediate 2 finished finished")); // 6
  process.nextTick(() => console.log("4. Process.nextTick()")); // 4
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});
console.log("1. Hello from the top-level code"); // 1
