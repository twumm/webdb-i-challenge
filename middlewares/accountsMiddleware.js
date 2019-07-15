const accountsDb = require('../accounts/accountsDb');

async function validateAccountId(req, res, next) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'Account id must be a number' })
  }
  const account = await accountsDb.getById(id);
  if (account) {
    req.account = account;
    next();
  } else {
    res.status(400).json({ message: 'Invalid account id' });
  }
}

function validateAccount(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing account data' });
  } else if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: 'Missing required *name* and *budget* fields' });
  } else {
    next();
  }
}

module.exports = {
  validateAccountId,
  validateAccount,
};
