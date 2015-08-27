'use strict';

var propertiesApp = angular.module('backofficeApp.properties.view', [
		'ngRoute',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/view/:id', {
    templateUrl: 'backoffice_app/properties/view/propertiesView.html',
    controller: 'propertiesViewCtrl'
  });
}])

.controller('propertiesViewCtrl', ['$scope','properties','$routeParams',function($scope,properties,$routeParams) {
	var id = $routeParams.id;
	properties.get({id:id},function(data,status){
		if(!angular.equals([],data)){
			$scope.property = data;
		}
	});
}]);