const express = require('express');

const router = express.Router();
const accountsDb = require('./accountsDb');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsDb.get();
    res.status(200).json(accounts);
  }
  catch (error) {
    new Error('Could not get accounts. Kindly try again');
  }
});

module.exports = router;