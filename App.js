const express = require('express')
const app = express();
const connectDB = require('../q2/database/db')
var bodyParser = require('body-parser')
require('dotenv').config();

 
connectDB();

const userRoutes = require('../q2/routes/userRoutes');
app.use(bodyParser.json())

app.use('/', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
