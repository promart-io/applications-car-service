angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'car-service-bookings.Reports.ReportChartBrandModels.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('car-service-bookings.Reports.ReportChartBrandModels.refresh', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/car-service-bookings/api/Reports/ReportChartBrandModels.js';

	$scope.load = function() {
		$http.get(api)
		.success(function(data) {
			var chartData = [];
			for (var i = 0; i < data.length; i ++) {
				chartData.push([data[i].Brand, data[i].Models]);
			}
			$.jqplot ('chart', [chartData], {
				seriesDefaults: {
					renderer: $.jqplot.PieRenderer, 
					rendererOptions: {
						padding: 5,
						sliceMargin: 5,
						showDataLabels: true
					}
				},
				legend: {
					show: true,
					location: 'e'
				}
			});
		});
	};
	$scope.load();

	$messageHub.onEntityRefresh($scope.load);

});