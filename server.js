const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res, next) => {
  res.status(200).send('<h2>You got to Accounts api</h2>')
})

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}`
  );
  next();
}

function errorHandler(error, req, res, next) {
  console.error('ERROR:', error);
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

server.use(errorHandler);

module.exports = server;