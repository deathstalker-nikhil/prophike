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
	$scope.app.state = 'properties';
	var id = $routeParams.id;
	properties.get({id:id,'get_all_projects':1},function(data,status){
		if(!angular.equals([],data.data)){
			$scope.property = data.data;
		}
	});
}]);