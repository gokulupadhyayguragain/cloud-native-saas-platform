const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Auth Service is running!');
});

app.listen(3000, () => {
  console.log('Auth service listening on port 3000');
});
