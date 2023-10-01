const express = require('express')
const app = express()
const Jwt = require("jsonwebtoken")

const jwtKey = 'blogging'
const port = 3001
const bodyParser = require('body-parser');
const cors = require('cors');

// Correct usage
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./src/routes/userRoutes')
const blogRoutes = require('./src/routes/blogRoutes')

app.use('/users', userRoutes);
app.use('/blog', blogRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express with Routes and Controllers!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});