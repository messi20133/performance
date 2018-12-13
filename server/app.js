const Koa = require('koa')
const app = new Koa()
const staticCache = require('koa-static-cache')
const path = require('path');
app.use(staticCache(
  path.join( __dirname,  '../dist'), {
    maxAge: 30 * 86400 * 1000
  }
));
app.use( async (ctx, next) => {
  let url = ctx.request.url;
  console.log(url);
  switch (url) {
    case '/api/test1': 
      await sleep();
      ctx.body = '1'
      break;
    case '/api/test2':
      await sleep();
      ctx.body = '2'
      break;
    case '/api/test3':
      await sleep();
      ctx.body = '3'
      break;
  }
})
app.use((ctx) => {
  ctx.body = 'home';
});
app.listen(1988)
console.log("server in running")

function sleep() {
  var time =  (Math.random() * 10).toFixed(2);
  return new Promise((res, reject) => {
    setTimeout(() => {
      res();
    }, time / 2 * 1000)
  });
}
