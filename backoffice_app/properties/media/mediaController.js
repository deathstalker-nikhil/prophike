'use strict';

var propertiesApp = angular.module('backofficeApp.properties.media', [
		'ngRoute',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/media/:id', {
    templateUrl: 'backoffice_app/properties/media/mediaView.html',
    controller: 'mediaCtrl'
  });
}])

.controller('mediaCtrl', ['$scope','properties','$routeParams','fileService',function($scope,properties,$routeParams,fileService){
	$scope.app.state = 'properties';
	var id = $routeParams.id;
	properties.get({id:id,'fields':'project_id,name,media'},function(data,status){
		if(!angular.equals([],data)){
			$scope.property = data[0];
			if($scope.property.media)
				$scope.property.media = angular.fromJson($scope.property.media);
		}
	});
	$scope.delete = function(url,index,type){
		if(!confirm('Delete ?')){return};
		var obj = angular.copy($scope.property);
		obj.media.property[type].splice(index,1);
		obj.media = angular.toJson(obj.media);
		properties.update(obj,function(data,status){
			if(status == 400){
				alert(data);
			}else{
				$scope.property.media.property[type].splice(index,1);
				fileService.delete(url,function(data,status){
					console.log(data,status);
				});
			}
		});
	};
}]);