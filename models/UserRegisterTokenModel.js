const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRegisterTokenSchema = new Schema(
  {
    email: String,
    token: String,
    data: Object,
  },
  {collection: 'user-register-token'}
);

module.exports = UserRegisterTokenSchema;
