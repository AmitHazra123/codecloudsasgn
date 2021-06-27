const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan = require("morgan");

// database configuration
const database = require('../src/config/database');

// router
const api = require("../src/routes/api");

const port = process.env.PORT || 8000;

// connect to the database
mongoose.connect(database.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("DB Connected!");
}).catch(err => {
  console.log('Error connecting to mongodb' + err.stack);
});

const app = express();

app.use(morgan('dev'));

// express server configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
});

// router configuration
app.use('/api', api);

app.get("/", (req, res) => {
  res.send({msg: 'Server is running!'});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});