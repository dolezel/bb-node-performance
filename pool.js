module.exports = ({
  limit = process.env.UV_THREADPOOL_SIZE || 4,
  init = () => undefined
} = {}) => {
  const workers = [];
  const queue = [];

  async function getOrCreateWorker() {
    let worker = workers.find(worker => worker.available);
    if (!worker && workers.length < limit) {
      worker = { available: true, object: await init() };
      workers.push(worker);
    }
    return worker;
  }

  async function runByWorker(worker, { resolve, reject, task }) {
    worker.available = false;
    try {
      resolve(await task(worker.object));
    } catch (e) {
      reject(e);
    }
    worker.available = true;

    if (queue.length > 0) {
      runByWorker(worker, queue.shift());
    }
  }

  return async task =>
    new Promise(async (resolve, reject) => {
      const enhancedTask = { resolve, reject, task };
      const worker = await getOrCreateWorker();

      if (worker) {
        runByWorker(worker, enhancedTask);
      } else {
        queue.push(enhancedTask);
      }
    });
};
