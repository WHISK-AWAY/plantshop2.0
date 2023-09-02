const Sequelize = require('sequelize');
const db = require('../database.cjs');
const User = require('./User.cjs');
const Product = require('./Product.cjs');

// TODO: do we need a hook here to constrain qty to max from product table?

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },

  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },

  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = Cart;
