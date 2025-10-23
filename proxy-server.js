// Simple Node.js proxy server for local development
// Run with: node proxy-server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Proxy middleware for SwitchBot API
app.use('/api', createProxyMiddleware({
    target: 'https://api.switch-bot.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/v1.1'
    },
    onProxyReq: (proxyReq, req, res) => {
        // Forward all headers from the original request
        console.log('Proxying request to:', proxyReq.path);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Response status:', proxyRes.statusCode);
    }
}));

// Serve static files
app.use(express.static('.'));

app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
    console.log(`📱 SwitchBot API proxy available at http://localhost:${PORT}/api`);
    console.log(`🌐 Open http://localhost:${PORT} to access ShockMoot`);
});