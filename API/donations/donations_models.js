const db = require("../../database/db_config");
const TABLE = "donations";
// Filter by location, species, description.

function getById(id) {
	return db(TABLE)
		.where({ id })
		.first();
}

function insert(donation) {
	return db(TABLE)
		.insert(donation)
		.then(ids => {
			return getById(ids[0]);
		});
}

module.exports = {
	insert
};
