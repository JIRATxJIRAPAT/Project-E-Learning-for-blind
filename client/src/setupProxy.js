const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://e-learning-backends.onrender.com',
      changeOrigin: true,
    })
  );
};