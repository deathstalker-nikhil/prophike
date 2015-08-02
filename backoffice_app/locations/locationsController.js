'use strict';

angular.module('backofficeApp.locations', ['ngRoute','backofficeApp.locations.create'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations', {
    templateUrl: 'backoffice_app/locations/locations.html',
    controller: 'locationsCtrl'
  });
}])

.controller('locationsCtrl', ['$scope','$http',function($scope,$http) {

	$scope.cities = [];

	$http.get('/api/locations/cities').
	  success(function(data, status, headers, config) {
	    $scope.cities = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log(data);
	  });

	$scope.delete = function(obj)
	{
		if(!confirm("Delete City ?")) {return};
		$http.delete('/api/locations/cities/'+obj.id).
		  success(function(data, status, headers, config) {
		  	$scope.cities.splice($scope.cities.indexOf(obj), 1);  
		  }).
		  error(function(data, status, headers, config) {
		    alert(data.error);
		  });
	}

}]);