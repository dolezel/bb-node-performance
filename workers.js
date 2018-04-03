const wwt = require('webworker-threads');
const startWeb = require('./server');

const Worker = wwt.Worker;

function doWorkWorker() {
  return new Promise(resolve => {
    const worker = new Worker(function () {
      this.onmessage = function (event) {
        postMessage('Hi ' + event.data);
        self.close();
      };
    });

    worker.onmessage = (event) => {
      console.log(event.data);
      resolve(event.data);
    };

    const r = Math.random();
    worker.postMessage(r);
  });
}

function myFunc() {
  let c = 0;
  while (c < 1e9) {
    c++;
  }
  return c;
}

function doWorkEval() {
  return new Promise((resolve, reject) => {
    const t = wwt.create();
    t.eval(myFunc.toString());
    t.eval("myFunc()", function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
      t.destroy();
    });
  });
}

setInterval(() => null, 100); // to invoke Promise processing

startWeb(doWorkEval);
