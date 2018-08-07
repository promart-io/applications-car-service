var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_MECHANICS',
	'properties': [
		{
			'name': 'Id',
			'column': 'MECHANIC_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'MECHANIC_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Phone',
			'column': 'MECHANIC_PHONE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Notes',
			'column': 'MECHANIC_NOTES',
			'type': 'VARCHAR',
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

exports.count = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_MECHANICS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};