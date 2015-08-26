'use strict';

angular.module('backofficeApp.specification.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/specifications/add', {
    templateUrl: 'backoffice_app/specifications/create/createSpecificationView.html',
    controller: 'createspecificationCtrl'
  });
}])

.controller('createspecificationCtrl', ['$scope','$http','specifications',function($scope,$http,specifications) {
	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			specifications.save($scope.specification,function(data,status){
				if (status == 201) {
					alert('Created');
					window.location = '#/specifications';
				}else{
					alert(data);
				}				
			});
		}
	};

}]);
