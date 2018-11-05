const startWeb = require("./server");
const { getConfig } = require("./utils");

const config = getConfig({
  eval: () => require("./webworker-threads").eval(),
  worker: () => require("./webworker-threads").worker(),
  native: () => require("./worker_threads")(),
});

startWeb(config);
