const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/orders',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );

  app.use(
    ['/auth', '/users'],
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
    })
  );
};
