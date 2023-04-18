const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://https://e-learning-backends.onrender.com',
      changeOrigin: true,
    })
  );
};