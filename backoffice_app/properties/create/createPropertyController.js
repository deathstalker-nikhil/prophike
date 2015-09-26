'use strict';

angular.module('backofficeApp.properties.create', ['ngRoute','backoffice.file_upload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/add', {
    templateUrl: 'backoffice_app/properties/create/createPropertyView.html',
    controller: 'createPropertyCtrl'
  });
}])

.controller('createPropertyCtrl', ['$scope','locations','properties','$filter','builder','specifications',function($scope,locations,properties,$filter,builder,specifications) {
	$scope.app.state = 'properties';
	locations.get({limit:1000	},function(data,status){
		if(!angular.equals([],data)){
			$scope.cities = data;
			$scope.areas = $scope.cities[0].areas;
			$scope.property.city = $scope.cities[0].city;
			$scope.property.area = $scope.cities[0].areas[0];	
		}
	});
	
	specifications.get({limit:1000,'fields':'id,name'},function(data,status){
		if(!angular.equals([],data)){
			$scope.specifications = data;
		}
	});	

	builder.get({limit:100},function(data,status){
		if(!angular.equals([],data)){
			$scope.builders = data;
			$scope.property.builder_id = $scope.builders[0].id;
		}
	});
	$scope.changeArea = function(){
		$scope.areas = $filter('filter')($scope.cities,{'city':$scope.property.city},true)[0].areas;
		$scope.property.area = $scope.areas[0];
	};
	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			var property = {};
			property  = $scope.property;
			property.data.specifications = [];
			angular.forEach($scope.specifications, function(value, key){
				if(angular.isDefined(value.is_checked) && value.is_checked != 0) {
					property.data.specifications.push(value.id);
				}
			});
			property.min_price = parseFloat($scope.min_price_value) * parseInt($scope.min_price_unit_value);
			property.max_price = parseFloat($scope.max_price_value) * parseInt($scope.max_price_unit_value);
			properties.save(property,function(data,status){
				if (status == 201) {
					alert('Created');
					window.location = '#/properties';
				}else{
					alert(data);
				}	
			});
		}
	};
}]);