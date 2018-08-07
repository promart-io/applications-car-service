var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_CARS',
	'properties': [
		{
			'name': 'Id',
			'column': 'CAR_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'ModelId',
			'column': 'CAR_MODEL',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'NumberPlate',
			'column': 'CAR_NUMBER_PLATE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Notes',
			'column': 'CAR_NOTES',
			'type': 'VARCHAR',
		}, {
			'name': 'BookingId',
			'column': 'CAR_BOOKING_ID',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_CARS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};