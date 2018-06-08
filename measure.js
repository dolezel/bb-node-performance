const os = require('os');
const {
  getConfig,
  log,
  hash,
  read,
  requestDns,
  requestIP
} = require('./utils');

const cpus = os.cpus().length;
const DEFAULT_THREADPOOL_SIZE = 4;

const config = getConfig({
  'simple': {
    // UV_THREADPOOL_SIZE: 4,
    work: [hash],
  },
  'single': {
    UV_THREADPOOL_SIZE: 1,
    work: [hash],
  },
  'queue': {
    UV_THREADPOOL_SIZE: 1,
    work: [hash, hash],
  },
  'pool': {
    // UV_THREADPOOL_SIZE: 4,
    work: Array(DEFAULT_THREADPOOL_SIZE).fill(hash),
  },
  'pool+1': {
    // UV_THREADPOOL_SIZE: 1,
    work: Array(DEFAULT_THREADPOOL_SIZE + 1).fill(hash),
  },
  '2*pool': {
    // UV_THREADPOOL_SIZE: 4,
    work: Array(DEFAULT_THREADPOOL_SIZE * 2).fill(hash),
  },
  'cpus': {
    UV_THREADPOOL_SIZE: cpus,
    work: Array(cpus).fill(hash),
  },
  'cpus-2': {
    UV_THREADPOOL_SIZE: cpus - 2,
    work: Array(cpus - 2).fill(hash),
  },
  quiz: {
    // UV_THREADPOOL_SIZE: 4,
    work: [read, ...Array(DEFAULT_THREADPOOL_SIZE).fill(hash), requestDns, requestIP],
  }
});

const { UV_THREADPOOL_SIZE, work } = config;

if (UV_THREADPOOL_SIZE) {
  process.env.UV_THREADPOOL_SIZE = UV_THREADPOOL_SIZE;
}

console.log(`CPUs: ${cpus}`);
console.log(`UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE || DEFAULT_THREADPOOL_SIZE}`);

for (let i = 0; i < work.length; i++) {
  log(work[i]);
}
