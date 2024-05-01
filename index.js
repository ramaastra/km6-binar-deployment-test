const express = require('express');
const router = require('./routes');
const app = express();

const port = 3000;

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Sucessfully connected to server',
    data: null
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `${req.method} ${req.url} is not registered`,
    data: null
  });
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
