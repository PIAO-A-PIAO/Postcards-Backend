const username = process.env.USERINFO;
const password = process.env.PASS;
const database = process.env.DATABASE;

//MongoDB connection url

module.exports = {
  url:
    "mongodb+srv://" +
    username +
    ":" +
    password +
    "@knowquestclusterproduct.aaf0gcn.mongodb.net/" +
    database,
};
