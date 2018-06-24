const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, default: 'images/noImage.jpg' }
});
module.exports = mongoose.model('Product', productSchema);
