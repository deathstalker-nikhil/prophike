'use strict';

var propertiesApp = angular.module('backofficeApp.properties.units.media', [
		'ngRoute',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/units/media/:id', {
    templateUrl: 'backoffice_app/properties/units/media/mediaView.html',
    controller: 'unitsMediaCtrl'
  });
}])

.controller('unitsMediaCtrl', ['$scope','units','$routeParams','fileService',function($scope,units,$routeParams,fileService){
	$scope.app.state = 'properties'; 
	var id = $routeParams.id;
	units.get({'id':id,'fields':'id,image_path,unit_name'},function(data,status){
		if(!angular.equals([],data)){
			$scope.unit = data[0];
			if($scope.unit.image_path)
				$scope.unit.image_path = angular.fromJson($scope.unit.image_path);
		}
	});

	$scope.delete = function(url,index){
		if(!confirm('Delete ?')){return};
		var obj = angular.copy($scope.unit);
		obj.image_path.img.splice(index,1);
		obj.image_path = angular.toJson(obj.image_path);
		units.update(obj,function(data,status){
			if(status == 400){
				alert(data);
			}else{
				$scope.unit.image_path.img.splice(index,1);
				fileService.delete(url,function(data,status){
					console.log(data,status);
				});
			}
		});
	};

}]);