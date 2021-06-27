const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
  name: { type: String, required: true },
  note: { type: String },
  subject: { type: String },
  senderName: { type: String },
  senderEmail: { type: String },
  isValid: { type: Boolean, required: true },
  createdOn: { type: Date, required: true, default: new Date() },
  updatedOn: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('attribute', attributeSchema);