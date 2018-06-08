const { promisify } = require('util');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const http = require('http');

const pbkdf2 = promisify(crypto.pbkdf2);
const readFile = promisify(fs.readFile);

async function log(fn, message = fn.name) {
  const start = Date.now();
  await fn();
  console.log(`${message}: ${Date.now() - start}ms`);
}

function block(duration = 1000) {
  const start = Date.now();
  while (Date.now() - start < duration) ;
}

function hash(iterations = 120000) {
  return pbkdf2('a', 'b', iterations, 512, 'sha512');
}

function read(fileName = './package.json') {
  return readFile(fileName, 'utf8');
}

function requestDns(url = 'https://www.google.com/') {
  return new Promise((resolve, reject) =>
    https
      .request(url, res => {
          res.on('data', () => null);
          res.on('end', resolve);
        }
      )
      .on('error', reject)
      .end()
  );
}

function requestIP(url = 'http://172.217.23.206/') {
  return new Promise((resolve, reject) =>
    http
      .request(url, res => {
          res.on('data', () => null);
          res.on('end', resolve);
        }
      )
      .on('error', reject)
      .end()
  );
}

function getConfig(alternatives) {
  const variant = process.argv[2];
  const config = alternatives[variant];
  if (!config) {
    console.error('You need to specify one of variants:', Object.keys(alternatives).join(', '));
    process.exit(1);
  }
  return config;
}

module.exports = {
  getConfig,
  log,
  block,
  hash,
  read,
  requestDns,
  requestIP
};
