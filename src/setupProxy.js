const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/emails',
    createProxyMiddleware({
      target: 'https://api.resend.com',
      changeOrigin: true,
    })
  );
};
