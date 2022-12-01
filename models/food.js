const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Food = mongoose.model('food', foodSchema);
module.exports = Food;