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

module.exports = {
  validateAccountId,
};
