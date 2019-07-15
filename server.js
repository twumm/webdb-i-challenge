const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res, next) => {
  res.status(200).send('<h2>You to account api</h2>')
})

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}`
  );
  next();
}

module.exports = server;