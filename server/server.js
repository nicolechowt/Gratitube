const mongoose = require('mongoose');
const express        = require('express');
const app            = express();
const path = require('path');

const ItemModel = require('./models/gratitudeListModel');
const routes = require('./routes');
const bodyParser = require('body-parser');
// const routes = require('./routes/gratitudeListRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Gratitudedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use('/static', express.static(path.join(__dirname, '../public')))

// routes(app);
app.use(routes);
// our module gets exported as app.
module.exports = app;

// Listens in ./bin/www