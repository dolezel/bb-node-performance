const os = require('os');
const {
  log,
  hash,
  read,
  request,
} = require('./utils');

const cpus = os.cpus().length;
const DEFAULT_THREADPOOL_SIZE = 4;

const variant = process.argv[2];
if (!variant) {
  console.error('You need to specify variant');
  process.exit(1);
}

const config = {
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
    work: [request, read, ...Array(DEFAULT_THREADPOOL_SIZE).fill(hash)],
  }
}[variant];
if (!config) {
  console.error('Invalid variant');
  process.exit(1);
}

const { UV_THREADPOOL_SIZE, work } = config;

if (UV_THREADPOOL_SIZE) {
  process.env.UV_THREADPOOL_SIZE = UV_THREADPOOL_SIZE;
}

console.log(`CPUs: ${cpus}`);
console.log(`UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE || DEFAULT_THREADPOOL_SIZE}`);

for (let i = 0; i < work.length; i++) {
  log(work[i]);
}
