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
});

router.post('/', validateAccount, async (req, res, next) => {
  const newAccount = { name, budget } = req.body;
  try {
    const account = await accountsDb.insert(newAccount);
    res.status(201).json(account);
  }
  catch (error) {
    next(new Error('Account creation failed. Kindly try again'));
  }
});

router.put('/:id', [validateAccountId, validateAccount], async (req, res, next) => {
  const changes = { name, budget } = req.body;
  try {
    await accountsDb.update(req.account.id, changes);
    const account = await accountsDb.getById(req.account.id);
    res.status(200).json(account);
  }
  catch (error) {
    next(new Error('Account update failed. Kindly try again'));
  }
});

router.delete('/:id', validateAccountId, async (req, res, next) => {
  try {
    const deleteCount = await accountsDb.remove(req.account.id);
    res.status(200).json({ count: deleteCount, deletedAccount: req.account });
  }
  catch (error) {
    next(new Error('Account could not be deleted. Kindly try again'));
  }
});

module.exports = router;