const db = require('./database.cjs');
const Currency = require('./Models/Currency.cjs');
const User = require('./Models/User.cjs');
const Order = require('./Models/Order.cjs');
const Order_Detail = require('./Models/Order_Detail.cjs');
const Product = require('./Models/Product.cjs');
const Cart = require('./Models/Cart.cjs');
const Payment = require('./Models/Payment.cjs');
const Promo_Code = require('./Models/Promo_Code.cjs');
const Shipping = require('./Models/Shipping.cjs');
const Tag = require('./Models/Tag.cjs');
const Wishlist = require('./Models/Wishlist.cjs');

// ASSOCIATIONS HERE

Order.hasMany(Order_Detail);
Order_Detail.belongsTo(Order);

Order.belongsTo(User);
User.hasMany(Order);

Promo_Code.hasMany(Order);
Order.belongsTo(Promo_Code);

User.hasMany(Shipping);
Shipping.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

User.belongsTo(Currency);
Currency.hasMany(User);

Product.belongsToMany(Tag, { through: 'product_tags' });
Tag.belongsToMany(Product, { through: 'product_tags' });

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Wishlist.belongsToMany(Product, { through: 'wishlist_details' });
Product.belongsToMany(Wishlist, { through: 'wishlist_details' });

User.hasMany(Wishlist);
Wishlist.belongsTo(User);

module.exports = {
  db,
  Cart,
  Currency,
  Order_Detail,
  Order,
  Payment,
  Product,
  Promo_Code,
  Shipping,
  Tag,
  User,
  Wishlist,
};
