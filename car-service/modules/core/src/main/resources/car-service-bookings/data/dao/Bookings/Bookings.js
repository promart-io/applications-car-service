var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_BOOKINGS',
	'properties': [
		{
			'name': 'Id',
			'column': 'BOOKING_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Date',
			'column': 'BOOKING_DATE',
			'type': 'DATE',
			'required': true
		}, {
			'name': 'Time',
			'column': 'BOOKING_TIME',
			'type': 'TIME',
			'required': true
		}, {
			'name': 'Notes',
			'column': 'BOOKING_NOTES',
			'type': 'VARCHAR',
		}, {
			'name': 'CustomerId',
			'column': 'BOOKING_CUSTOMER_ID',
			'type': 'INTEGER',
			'required': true
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_BOOKINGS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};