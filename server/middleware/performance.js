const {
  performance
} = require('perf_hooks');

const PerformanceInstance = require('../utils/performanceInstance');

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time * 1000)
  });
}

const map = {
  'yu': 'yu',
  'home': 'home'
}

module.exports = async (ctx, next) => {
  
  // performance.mark('A');
  // await sleep(3);
  // performance.mark('B');
  // performance.measure('A-B', 'A', 'B');
  // PerformanceInstance.observe({ entryTypes: ['measure'], buffered: true });

  let url = ctx.request.url;
  url = url.replace(/\//g, '');
  if (!url) url = 'home';

  performance.mark('A');
  await next();
  performance.mark('B');
  performance.measure(url, 'A', 'B');
}