require("dotenv").config();
const mongo_url = process.env.url;
const { connect } = require("mongoose");

const Connect = connect(mongo_url);

module.exports = Connect;
