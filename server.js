const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');


// start express server

const app = express();

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});


// connect to DB

connectToDB();


// add middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// serve static files from React App

app.use(express.static(path.join(__dirname, '/client/build')))

