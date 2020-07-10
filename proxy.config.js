const PROXY_CONFIG = {
  '/users/**': {
    target: 'https://api.github.com',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
    }
  },
  '/admin/**': {
    target: 'http://localhost:9090',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
    },
  },
};

module.exports = PROXY_CONFIG;
