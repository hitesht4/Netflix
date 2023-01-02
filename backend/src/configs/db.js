const { connect } = require("mongoose");

const Connect = connect(
  "mongodb+srv://hitesh123:hitesh123@cluster0.0rcyd.mongodb.net/netflix"
);

module.exports = Connect;
