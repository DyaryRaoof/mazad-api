const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

require('./startup/db')();
require('./startup/routes')(app);

app.get('/', (req, res) => {
  res.json({ payload: 'this is your first payload' });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
