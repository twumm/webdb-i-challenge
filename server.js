const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res, next) => {
  res.status(200).send('<h2>You to account api</h2>')
})

module.exports = server;