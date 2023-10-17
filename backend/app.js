const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


// Parse JSON request bodies
app.use(bodyParser.json());

const apiRoutes = require('./routes/user');
app.use('/users', apiRoutes);


// ... other middleware and configurations ...


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

