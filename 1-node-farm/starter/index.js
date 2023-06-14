const fs = require("fs");
const http = require("http");
const url = require("url");

// 🎯🎯🎯🎯🎯🎯 simple API

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, {
  encoding: "utf-8",
});
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listening to requests in port 8000");
});

// 🎯🎯🎯🎯🎯🎯 Routing

// const server = http.createServer((req, res) => {
//   const pathName = req.url;
//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OVERVIEW");
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// server.listen(8000, "localhost", () => {
//   console.log("Listening to requests in port 8000");
// });

// 🎯🎯🎯🎯🎯🎯 Node server

// const server = http.createServer((req, res) => {
//   res.end("Hello from the server!!!!!");
// });

// server.listen(8000, "localhost", () => {
//   console.log("Listening to requests in port 8000");
// });

// 🎯🎯🎯🎯🎯🎯 File System

// 🎯 Blocking synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", { encoding: "utf-8" });
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.
// Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// 🎯 Non-blocking asynchronous way

// fs.readFile("./txt/start.txt", { encoding: "utf-8" }, (err, data1) => {
//   if (err) return console.log("ERROR! 💥");
//   fs.readFile(`./txt/${data1}.txt`, { encoding: "utf-8" }, (err, data2) => {
//     fs.readFile(`./txt/append.txt`, { encoding: "utf-8" }, (err, data3) => {
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         { encoding: "utf-8" },
//         (err) => {
//           console.log("File was written");
//         }
//       );
//     });
//   });
// });
