'use strict';

var propertiesApp = angular.module('backofficeApp.properties', [
		'ngRoute',
		'backofficeApp.properties.view',
		'backofficeApp.properties.create',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties', {
    templateUrl: 'backoffice_app/properties/properties.html',
    controller: 'propertiesCtrl'
  });
}])

.controller('propertiesCtrl', ['$scope','properties',function($scope,properties) {
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	properties.get({},function(data,status){
		if(!angular.equals([], data)){
			console.log(data);
			$scope.properties = data;
		}
	});
	$scope.result = ''+$scope.perPageArray[0];
	$scope.load = function(perPageResult){
		console.log(perPageResult);
	};
	$scope.delete = function(property) {
		if(!confirm("Delete City ?")) {return};
		properties.delete(property,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				$scope.properties.splice($scope.properties.indexOf(property), 1);
			}
		});
	}

}]);