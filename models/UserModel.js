const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    token: String,
    password: String,
    subject: String,
    school: String,
    role: {type: Number, default: 4},
    verified: Boolean,
    lastActivity: {type: Date, default: Date.now},
    ratingCount: {type: Number, default: 0},
    backgroundColor: String,
  },
  {collection: 'users'}
);

module.exports = UserSchema;
