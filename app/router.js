
// app/router.js
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/heapdump', controller.heap.index);
  };
