const Koa = require('koa');
const { log } = require('./utils');

module.exports = (doWork, { id = '-' } = {}) => {
  const app = new Koa();

  app.use(async ctx => {
//    if (ctx.url !== '/favicon.ico') {
    console.log(`Worker ${id} doWork start`);
    await log(doWork, `Worker ${id} doWork finish`);
    ctx.body = 'Work done';
// }
  });

  app.listen(3000, () => console.log(`Worker ${id} listening`));
};
