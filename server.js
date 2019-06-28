const express = require('express');
const app = express();


app.get('/api/users', (req, res) => {
  const { name, email, pass } = req.query;
  console.log(name, email, pass)
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);