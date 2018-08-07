angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'car-service-bookings.Garage.Models.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('car-service-bookings.Garage.Models.refresh', callback);
		},
		onBrandsModified: function(callback) {
			on('car-service-bookings.Garage.Brands.modified', callback);
		},
		onBrandsSelected: function(callback) {
			on('car-service-bookings.Garage.Brands.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		},
		messageEntitySelected: function(id) {
			message('selected', id);
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/car-service-bookings/api/Garage/Models.js';
	var brandidOptionsApi = '/services/v3/js/car-service-bookings/api/Garage/Brands.js';

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	$scope.brandidOptions = [];

	function brandidOptionsLoad() {
		$http.get(brandidOptionsApi)
		.success(function(data) {
			$scope.brandidOptions = data;
		});
	}
	brandidOptionsLoad();

	function load() {
		$http.get(api + '?BrandId=' + $scope.masterEntityId)
		.success(function(data) {
			$scope.data = data;
		});
	}

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$scope.entity.BrandId = $scope.masterEntityId;
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$scope.entity.BrandId = $scope.masterEntityId;

		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.brandidOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.brandidOptions.length; i ++) {
			if ($scope.brandidOptions[i].Id === optionKey) {
				return $scope.brandidOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);
	$messageHub.onBrandsModified(brandidOptionsLoad);

	$messageHub.onBrandsSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	$scope.selectEntity = function(entity) {
		$messageHub.messageEntitySelected({
			'id': entity.Id,
			'name': entity.Name
		});
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});