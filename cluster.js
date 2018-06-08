const os = require('os');
const cluster = require('cluster');
const startWeb = require('./server');
const {
  getConfig,
  block,
  hash,
  read,
  requestDns,
  requestIP
} = require('./utils');

const cpus = os.cpus().length;

const config = getConfig({
  'simple': {
    // UV_THREADPOOL_SIZE: 1,
    clusters: 1,
    doWork: block,
  },
  'single': {
    UV_THREADPOOL_SIZE: 1,
    clusters: 1,
    doWork: block,
  },
  'cluster': {
    UV_THREADPOOL_SIZE: 1,
    clusters: 4,
    doWork: block,
  },

  'cpus': {
    UV_THREADPOOL_SIZE: 1,
    clusters: cpus,
    doWork: hash,
  },
  '2*cpus': {
    UV_THREADPOOL_SIZE: 1,
    clusters: cpus * 2,
    doWork: hash,
  }
});

const { UV_THREADPOOL_SIZE, clusters, doWork } = config;

if (UV_THREADPOOL_SIZE) {
  process.env.UV_THREADPOOL_SIZE = UV_THREADPOOL_SIZE;
}

if (cluster.isMaster) {
  console.log(`CPUs: ${cpus}`);
  console.log(`UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE || 4}`);
  console.log(`clusters: ${clusters}`);
  for (let i = 0; i < clusters; i++) {
    cluster.fork();
  }
} else {
  startWeb(doWork, cluster.worker);
}
