'use strict';

angular.module('backofficeApp.locations.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations/edit', {
    templateUrl: 'backoffice_app/locations/create/createLocationsView.html',
    controller: 'createLocationsCtrl'
  });
}])

.controller('createLocationsCtrl', ['$scope','$http',function($scope,$http) {

	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			var location = {};
			location.areas  = $scope.location.areas.split("#");
			location.city = $scope.location.city;
			$scope.csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $.param({location,
				'csrf_token':$scope.csrf_token
			});
			$http.post('/api/locations/cities',
				data,
				{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
			}).
			success(function(data, status, headers, config) {
				if (status == 201) {
					alert('Created');
					$scope.location = {};
				}
			}).
			error(function(data, status, headers, config) {
				alert(data);
			});
		}
	};

}]);