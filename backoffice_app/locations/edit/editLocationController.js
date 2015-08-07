'use strict';

angular.module('backofficeApp.locations.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations/edit/:id', {
    templateUrl: 'backoffice_app/locations/edit/editLocationsView.html',
    controller: 'editLocationsCtrl'
  });
}])

.controller('editLocationsCtrl', ['$scope','$http','$routeParams',function($scope,$http,$routeParams) {

	var id = $routeParams.id;
	$scope.location = {};
	$http.get('/api/locations/cities/'+id).
	  success(function(data, status, headers, config) {
	    if(status == 200){
	    	$scope.location = data[0];
	    	$scope.location.areas = angular.fromJson($scope.location.areas);
	    	$scope.location.areas = $scope.location.areas.join("#\n");
	    }
	  }).
	  error(function(data, status, headers, config) {
	    console.log(data);
	  });	

	$scope.update = function(form){
		if(form.$valid && form.$dirty){
			var location = {};
			location.areas  = $scope.location.areas.split("#");
			angular.forEach(location.areas,function(value,key){
				location.areas[key] = value.trim();
			});
			location.city = $scope.location.city;
			$scope.csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $.param({location,
				'csrf_token':$scope.csrf_token
			});
			$http.put('/api/locations/cities/'+$scope.location.id,
				data,
				{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
			}).
			success(function(data, status, headers, config) {
				if(status == 204){
					alert('Updated');
					window.location = '#/locations';
				}
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			});
		}
	};

}]);