const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the renderer build
app.use(express.static(path.join(__dirname, 'out/renderer')));

// Proxy API requests if needed (for future backend integration)
app.use('/api', createProxyMiddleware({
  target: process.env.API_URL || 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  }
}));

// Handle all other routes with the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out/renderer', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AionUi Web server running on port ${PORT}`);
});

module.exports = app;
