const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    id: String,
    desc: String,
  },
  {collection: "resource-type"}
);

module.exports = ResourceSchema;
