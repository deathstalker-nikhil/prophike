'use strict';

angular.module('backofficeApp.locations.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations/add', {
    templateUrl: 'backoffice_app/locations/create/createLocationsView.html',
    controller: 'createLocationsCtrl'
  });
}])

.controller('createLocationsCtrl', ['$scope','$http','locations',function($scope,$http,locations) {
	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			var location = {};
			location.areas  = $scope.location.areas.split("#");
			angular.forEach(location.areas,function(value,key){
				location.areas[key] = value.trim();
			});
			location.city = $scope.location.city;
			locations.save(location,function(data,status){
				if (status == 201) {
					alert('Created');
					window.location = '#/locations';
				}else{
					alert(data);
				}				
			});
		}
	};

}]);