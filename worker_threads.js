const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const createPool = require("./pool");
  const pool = createPool({
    init: () => new Worker(__filename)
  });
  module.exports = (message = "Master") =>
    pool(
      worker =>
        new Promise((resolve, reject) => {
          const bind = method => {
            worker[method]("message", onMessage);
            worker[method]("error", onError);
            worker[method]("exit", onExit);
          };

          const onMessage = message => {
            bind("off");
            resolve(message);
          };
          const onError = message => {
            bind("off");
            reject(message);
          };
          const onExit = code => {
            bind("off");
            if (code !== 0)
              reject(new Error(`Worker stopped with exit code ${code}`));
          };

          bind("on");

          worker.postMessage(message);
        })
    );
} else {
  parentPort.on("message", async message => {
    const { hash } = require("./utils");

    await hash();

    parentPort.postMessage(`Hi ${message}`);
  });
}
