const wwt = require("webworker-threads");
const { loop } = require("./utils");

const Worker = wwt.Worker;

function doWorkWorker() {
  return new Promise(resolve => {
    const worker = new Worker(function() {
      this.onmessage = function(event) {
        postMessage("Hi " + event.data);
        self.close();
      };
    });

    worker.onmessage = event => {
      console.log(event.data);
      resolve(event.data);
    };

    const r = Math.random();
    worker.postMessage(r);
  });
}

function doWorkEval() {
  return new Promise((resolve, reject) => {
    const t = wwt.create();
    t.eval(loop.toString());
    t.eval("loop()", function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      t.destroy();
    });
  });
}

setInterval(() => null, 100); // to invoke Promise processing

module.exports = {
  doWorkWorker,
  doWorkEval
};
