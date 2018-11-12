import express from 'express';
const routes = require('./server/src/routes/routes');
const app = express();
const PORT = 3000;

app.use('/', routes);

module.exports = app;
