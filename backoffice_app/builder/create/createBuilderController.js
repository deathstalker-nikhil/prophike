'use strict';

angular.module('backofficeApp.builder.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/builder/add', {
    templateUrl: 'backoffice_app/builder/create/createBuilderView.html',
    controller: 'createbuilderCtrl'
  });
}])

.controller('createbuilderCtrl', ['$scope','$http','builder',function($scope,$http,builder) {
	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			builder.save($scope.builder,function(data,status){
				if (status == 201) {
					alert('Created');
					window.location = '#/builder';
				}else{
					alert(data);
				}				
			});
		}
	};

}]);
