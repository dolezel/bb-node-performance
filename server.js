const Koa = require('koa');
const { log } = require('./utils');

module.exports = (worker, doWork) => {
  const app = new Koa();

  app.use(async ctx => {
    console.log(`Worker ${worker.id} doWork start`);
    await log(doWork, `Worker ${worker.id} doWork finish`);
    ctx.body = 'Work done';
  });

  app.listen(3000, () => console.log(`Worker ${worker.id} listening`));
};
