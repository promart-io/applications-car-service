var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'CAR_SERVICE_REPORT_CHART_BRAND_MODELS',
	'properties': [
		{
			'name': 'Brand',
			'column': 'BRAND_NAME',
			'type': 'VARCHAR',
			'id': true,
		}, {
			'name': 'Models',
			'column': 'MODELS_COUNT',
			'type': 'VARCHAR',
			'id': true,
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.count = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CAR_SERVICE_REPORT_CHART_BRAND_MODELS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};