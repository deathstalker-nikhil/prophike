'use strict';

angular.module('backofficeApp.builder.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/builder/edit/:id', {
    templateUrl: 'backoffice_app/builder/edit/editBuilderView.html',
    controller: 'editBuilderCtrl'
  });
}])

.controller('editBuilderCtrl', ['$scope','$http','$routeParams','$filter','builder',function($scope,$http,$routeParams,$filter,builder) {

	var id = $routeParams.id;
	$scope.builder = [];

	builder.get('/api/builder/builder',{'id':id},function(data,status){
		if(status == 200){
	    	$scope.builder = data[0];
		}else{
			console.log(data);	
		}
	});

	$scope.update = function(form){
		if(form.$valid && form.$dirty){
			var builders = {};
			builders = $scope.builder;
			builders.id = $scope.builder.id;
			builder.update(builders,function(data,status){
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
