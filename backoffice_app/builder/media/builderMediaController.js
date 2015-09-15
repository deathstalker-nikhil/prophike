'use strict';

var propertiesApp = angular.module('backofficeApp.builder.media', [
		'ngRoute',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/builder/media/:id', {
    templateUrl: 'backoffice_app/builder/media/builderMediaView.html',
    controller: 'builderMediaCtrl'
  });
}])

.controller('builderMediaCtrl', ['$scope','builder','$routeParams','fileService',function($scope,builder,$routeParams,fileService){
	$scope.app.state = 'builders';
	var id = $routeParams.id;
	builder.get({id:id,'fields':'id,builder_name,logo_link'},function(data,status){
		if(!angular.equals([],data)){
			$scope.builder = data[0];
			if($scope.builder.logo_link)
				$scope.builder.logo_link = angular.fromJson($scope.builder.logo_link);
		}
	});
	$scope.delete = function(url,index){
		if(!confirm('Delete ?')){return};
		var obj = angular.copy($scope.builder);
		obj.logo_link.logo.splice(index,1);
		obj.logo_link = angular.toJson(obj.logo_link);
		builder.update(obj,function(data,status){
			if(status == 400){
				alert(data);
			}else{
				$scope.builder.logo_link.logo.splice(index,1);
				fileService.delete(url,function(data,status){
					console.log(data,status);
				});
			}
		});
	};
}]);