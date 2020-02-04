const db = require("../../database/db_config");

function get() {
  return db("species");
}
module.exports = {
  get
};
