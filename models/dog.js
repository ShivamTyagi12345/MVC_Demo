const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
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

const Dog = mongoose.model('dog', dogSchema);
module.exports = Dog;