const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes')

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
app.use(express.urlencoded({ extended: false }));

// serve static files from React App
app.use(express.static(path.join(__dirname, '/client/build')));

// add routes
app.set('/api', adsRoutes);
app.set('/api', usersRoutes);
app.set('/auth', authRoutes);

// at any other link just serve React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});



