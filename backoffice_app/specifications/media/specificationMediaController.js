'use strict';

var propertiesApp = angular.module('backofficeApp.specification.media', [
		'ngRoute',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/specification/media/:id', {
    templateUrl: 'backoffice_app/specifications/media/specificationMediaView.html',
    controller: 'specificationMediaCtrl'
  });
}])

.controller('specificationMediaCtrl', ['$scope','specifications','$routeParams','fileService',function($scope,specifications,$routeParams,fileService){
	$scope.app.state = 'specifications';
	var id = $routeParams.id;
	specifications.get({id:id,'fields':'id,name,icon_path'},function(data,status){
		if(!angular.equals([],data.data)){
			$scope.specification = data.data[0];
			if(angular.isDefined($scope.specification.icon_path) && $scope.specification.icon_path != '')
				$scope.specification.icon_path = angular.fromJson($scope.specification.icon_path);
		}
	});
	$scope.delete = function(url,index){
		if(!confirm('Delete ?')){return};
		var obj = angular.copy($scope.specification);
		obj.icon_path.logo.splice(index,1);
		obj.icon_path = angular.toJson(obj.icon_path);
		specifications.update(obj,function(data,status){
			if(status == 400){
				alert(data);
			}else{
				$scope.specification.icon_path.logo.splice(index,1);
				fileService.delete(url,function(data,status){
					console.log(data,status);
				});
			}
		});
	};
}]);