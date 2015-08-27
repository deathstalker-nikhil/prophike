'use strict';

angular.module('backofficeApp.locations.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations/edit/:id', {
    templateUrl: 'backoffice_app/locations/edit/editLocationsView.html',
    controller: 'editLocationsCtrl'
  });
}])

.controller('editLocationsCtrl', ['$scope','$http','$routeParams','locations','$filter',function($scope,$http,$routeParams,locations,$filter) {

	var id = $routeParams.id;
	$scope.location = [];

	locations.get({'id':id},function(data,status){
		if(status == 200){
	    	$scope.location = data[0];
	    	$scope.location.areas = $scope.location.areas.join("#\n");
		}else{
			console.log(data);	
		}
	});

	$scope.update = function(form){
		if(form.$valid && form.$dirty){
			var location = {};
			location.areas  = $scope.location.areas.split("#");
			location.id = $scope.location.id;
			angular.forEach(location.areas,function(value,key){
				location.areas[key] = value.trim();
			});
			location.city = $scope.location.city;
			locations.update(location,function(data,status){
				if(status == 204){
					alert('Updated');
					window.location = window.history.back();;
				}
				else{
					console.log(data);
				}				
			});
			
		}
	};

}]);