var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_BOOKING_MECHANICS',
	'properties': [
		{
			'name': 'Id',
			'column': 'BOOKING_MECHANIC_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'BookingId',
			'column': 'BOOKING_MECHANIC_BOOKING_ID',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'MechanicId',
			'column': 'BOOKING_MECHANIC_MECHANIC_ID',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_BOOKING_MECHANICS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};