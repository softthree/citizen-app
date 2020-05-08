const express = require('express');
const path = require('path');
const app = express();
const config = require('./config/configuration');
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';
const routes = require('./routes');
const cors = require('cors');
const statusCodes = require('./utils/statusCodes');
config.initialize(environment);

// Allowing CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'admin')));


// Body Parser For Parsing The Request Body
app.use(express.json({ limit: '50mb', extended: true }));

// All Api End Points Should Start With '/api'
app.use('/api', routes);

// Express Error Handler
app.use(function (err, req, res, next) {
  res.status(statusCodes.client.badRequest).json({
    status: 'Failure',
    message: err.message
  });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));