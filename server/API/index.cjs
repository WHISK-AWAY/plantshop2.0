const router = require('express').Router();

router.use('/products', require('./routes/products.cjs'));
router.use('/users', require('./routes/users.cjs'));
router.use('/auth', require('./routes/auth.cjs'));
router.use('/orders', require('./routes/orders.cjs'));
router.use('/currency', require('./routes/currency.cjs'));
router.use('/promos', require('./routes/promos.cjs'));

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND!');
  err.status = 404;
  next(err);
});

module.exports = router;
