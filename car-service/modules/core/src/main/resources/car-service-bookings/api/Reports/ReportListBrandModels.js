var rs = require('http/v3/rs');
var dao = require('car-service-bookings/data/dao/Reports/ReportListBrandModels');
var http = require('car-service-bookings/api/http');

rs.service()
	.resource('')
		.get(function(ctx, request) {
			var queryOptions = {};
			var parameters = request.getParameterNames();
			for (var i = 0; i < parameters.length; i ++) {
				queryOptions[parameters[i]] = request.getParameter(parameters[i]);
			}
			var entities = dao.list(queryOptions);
			http.sendResponseOk(entities);
		})
.execute();
