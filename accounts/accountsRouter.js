const express = require('express');

const router = express.Router();
const accountsDb = require('./accountsDb');
const { validateAccountId, validateAccount } = require('../middlewares/accountsMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsDb.get();
    res.status(200).json(accounts);
  }
  catch (error) {
    next(new Error('Could not get accounts. Kindly try again'));
  }
});

router.get('/:id', validateAccountId, async (req, res, next) => {
  try {
    res.status(200).json(req.account);
  }
  catch (error) {
    next(new Error('Could not get account. Kindly try again'));
  }
})

module.exports = router;