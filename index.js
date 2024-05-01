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

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
