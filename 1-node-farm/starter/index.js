const fs = require("fs");

// Blocking synchronous way

const textIn = fs.readFileSync("./txt/input.txt", { encoding: "utf-8" });
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.
Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");

// Non-blocking asynchronous way

fs.readFile("./txt/start.txt", { encoding: "utf-8" }, (err, data1) => {
  if (err) return console.log("ERROR! 💥");
  fs.readFile(`./txt/${data1}.txt`, { encoding: "utf-8" }, (err, data2) => {
    fs.readFile(`./txt/append.txt`, { encoding: "utf-8" }, (err, data3) => {
      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}`,
        { encoding: "utf-8" },
        (err) => {
          console.log("File was written");
        }
      );
    });
  });
});
