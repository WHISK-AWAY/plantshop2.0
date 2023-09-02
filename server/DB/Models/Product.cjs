const Sequelize = require('sequelize');
const db = require('../database.cjs');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
    unique: true,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10000,
      notEmpty: true,
      notNull: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
      notNull: true,
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
    defaultValue: [
      'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
  lowQty: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawQty = this.getDataValue('qty');
      return rawQty <= 10;
    },
    set(value) {
      throw new Error('Do not try to set lowQty value');
    },
  },
  shortDescription: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawDescription = this.getDataValue('description');
      if (rawDescription.length <= 200) {
        return rawDescription;
      }
      return rawDescription.substring(0, 200) + '...';
    },
    set(value) {
      throw new Error('Do not try to set shortDescription value');
    },
  },
});

module.exports = Product;
