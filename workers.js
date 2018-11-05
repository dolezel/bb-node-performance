const startWeb = require("./server");
const { getConfig } = require("./utils");
const { doWorkEval, doWorkWorker } = require("./webworker-threads");
const nativeWorker = require("./worker_threads");

const config = getConfig({
  eval: doWorkEval,
  worker: doWorkWorker,
  native: nativeWorker
});

startWeb(config);
