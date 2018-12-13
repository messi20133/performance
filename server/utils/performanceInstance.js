const {
  performance,
  PerformanceObserver
} = require('perf_hooks');

const Performance = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());
  performance.clearMarks();
});
Performance.observe({ entryTypes: ['measure'], buffered: true });
module.exports = Performance;