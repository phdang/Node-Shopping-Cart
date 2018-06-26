const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, default: 'Vietnam' },
  mobile: { type: String },
  cart: { type: String, required: true },
  charge: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Order', orderSchema);
