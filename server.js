const express = require('express');
const app = express();
const port = 3000;


const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// ... other middleware and configurations ...


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

