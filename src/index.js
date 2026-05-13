const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Secure CI/CD Pipeline Demo',
    pipeline: 'Docker + Jenkins + Trivy',
    status: 'live',
    version: process.env.APP_VERSION || '1.0.0',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
