const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  files:String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
userSchema.pre('save', function (next) {
  if (!this.files) {
    this.files = [];
  }
  next();
});
const UserModal= mongoose.model('User', userSchema);
module.exports =UserModal