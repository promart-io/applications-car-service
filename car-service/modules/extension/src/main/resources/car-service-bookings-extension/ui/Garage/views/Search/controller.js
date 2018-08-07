angular.module('view', ['ngCookies']);
angular.module('view')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		on: on,
		onBrandSelected: function(callback) {
			on('car-service-bookings.Garage.Brands.selected', callback);
		},
		onModelSelected: function(callback) {
			on('car-service-bookings.Garage.Models.selected', callback);
		}
	};
}])
.controller('ViewController', ['$scope', '$http', '$cookies', '$messageHub', function ($scope, $http, $cookies, $messageHub) {

	var brandsApi = '/services/v3/js/car-service-bookings/api/Garage/Brands.js';
	var modelsApi = '/services/v3/js/car-service-bookings/api/Garage/Models.js';

	$scope.reload = function() {
		var brand = $cookies.get('Car-Service-Brand');
		var model = $cookies.get('Car-Service-Model');
		var url = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + brand;
		if (model) {
			url += '+' + model;
		}
		window.location.href = url;
	};

	$messageHub.onBrandSelected(function(e) {
		if (e.data.name) {
			setBrand(e.data.name)
		} else {
			$http.get(brandsApi + '/' + e.data.id)
			.success(function(entity) {
				setBrand(entity.Name);
			});
		}
	});

	$messageHub.onModelSelected(function(e) {
		if (e.data.name) {
			setModel(e.data.name)
		} else {
			$http.get(modelsApi + '/' + e.data.id)
			.success(function(entity) {
				setModel(entity.Name);
			});
		}
	});

	function setBrand(brand) {
		$cookies.put('Car-Service-Brand', brand);
		$cookies.remove('Car-Service-Model');
		$scope.reload();
	}

	function setModel(model) {
		$cookies.put('Car-Service-Model', model);
		$scope.reload();
	}
}]);