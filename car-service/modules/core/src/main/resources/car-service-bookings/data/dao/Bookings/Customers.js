var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_CUSTOMERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'CUSTOMER_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'CUSTOMER_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Email',
			'column': 'CUSTOMER_EMAIL',
			'type': 'VARCHAR',
		}, {
			'name': 'Phone',
			'column': 'CUSTOMER_PHONE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Address',
			'column': 'CUSTOMER_ADDRESS',
			'type': 'VARCHAR',
		}, {
			'name': 'City',
			'column': 'CUSTOMER_CITY',
			'type': 'VARCHAR',
		}, {
			'name': 'State',
			'column': 'CUSTOMER_STATE',
			'type': 'VARCHAR',
		}, {
			'name': 'Notes',
			'column': 'CUSTOMER_NOTES',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_CUSTOMERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};