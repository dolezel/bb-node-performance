const { promisify } = require("util");
const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const http = require("http");

const pbkdf2 = promisify(crypto.pbkdf2);
const readFile = promisify(fs.readFile);

async function log(fn, message = fn.name) {
  const start = Date.now();
  const result = (await fn()) || "";
  console.log(`${message} (${Date.now() - start}ms): ${result}`);
}

function block(duration = 1000) {
  const start = Date.now();
  while (Date.now() - start < duration);
  return "blocked";
}

function loop() {
  let c = 0;
  while (c < 1e9) {
    c++;
  }
  return c;
}

async function hash(iterations = 125000) {
  await pbkdf2("a", "b", iterations, 512, "sha512");
  return "hashed";
}

async function read(fileName = "./package.json") {
  const content = await readFile(fileName, "utf8");
  return content.replace(/[\s\r\n]+/g, " ").substr(0, 100);
}

function request(url) {
  return new Promise((resolve, reject) =>
    (url[4] === "s" ? https : http)
      .request(url, res => {
        res.on("data", () => null);
        res.on("end", () => resolve(url));
      })
      .on("error", reject)
      .end()
  );
}

const requestDns = () => request("https://www.google.com/");
const requestIP = () => request("http://172.217.23.206/");

function getConfig(alternatives) {
  const variant = process.argv[2];
  const config = alternatives[variant];
  if (!config) {
    console.error(
      "You need to specify one of variants:",
      Object.keys(alternatives).join(", ")
    );
    process.exit(1);
  }
  return config;
}

module.exports = {
  getConfig,
  log,
  block,
  loop,
  hash,
  read,
  requestDns,
  requestIP
};
