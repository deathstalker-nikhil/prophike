'use strict';

angular.module('backofficeApp.properties.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/edit/:id', {
    templateUrl: 'backoffice_app/properties/edit/editPropertyView.html',
    controller: 'editPropertyCtrl'
  });
}])

.controller('editPropertyCtrl', ['$scope','$routeParams','locations','properties','$filter','builder','specifications',function($scope,$routeParams,locations,properties,$filter,builder,specifications) {
	$scope.app.state = 'properties';
	var id = $routeParams.id;
	var property = {};
	$scope.locationsRetrived = false;
	$scope.buildersRetrived = false;
	$scope.propertyRetrived = false;
	$scope.specificationsRetrived = false;
	$scope.property = {};

	specifications.get({limit:1000,'fields':'id,name'},function(data,status){
		if(!angular.equals([],data.data)){
			$scope.specifications = data.data;
			$scope.specificationsRetrived = true;
			setValue();
		}
	});	

	locations.get({limit:1000	},function(data,status){
		if(!angular.equals([],data.data)){
			$scope.cities = data.data;
			$scope.areas = $scope.cities[0].areas;
			$scope.property.city = $scope.cities[0].city;
			$scope.property.area = $scope.cities[0].areas[0];	
			$scope.locationsRetrived = true;
			setValue();
		}
	});

	builder.get({limit:100},function(data,status){
		if(!angular.equals([],data.data)){
			$scope.builders = data.data;
			$scope.buildersRetrived = true;
			setValue();
		}
	});

	$scope.changeArea = function(){
		$scope.areas = $filter('filter')($scope.cities,{'city':$scope.property.city},true)[0].areas;
		$scope.property.area = $scope.areas[0];
	};

	properties.get({'id':id},function(data,status){
			if(status == 200 && !angular.equals([], data.data)){
				$scope.propertyRetrived = true;
				angular.copy(data.data[0],property);
				if(property.data != ''){
					property.data = angular.fromJson(data.data[0].data);
				}
				if(property.min_price < 100000){
					$scope.min_price_value = property.min_price/1000;
					$scope.min_price_unit_value = '1000';
				}else if(property.min_price < 10000000){
					$scope.min_price_value = property.min_price/100000;
					$scope.min_price_unit_value = '100000';
				}else{
					$scope.min_price_value = property.min_price/10000000;
					$scope.min_price_unit_value = '10000000';
				}
				if(property.max_price < 100000){
					$scope.max_price_value = property.max_price/1000;
					$scope.max_price_unit_value = '1000';
				}else if(property.man_price < 10000000){
					$scope.max_price_value = property.max_price/100000;
					$scope.max_price_unit_value = '100000';
				}else{
					$scope.max_price_value = property.max_price/10000000;
					$scope.max_price_unit_value = '10000000';
				}
				angular.copy(property, $scope.property);
				setValue();
			}else{
				console.log(data);
			}
	});

	function setValue(){
		if($scope.locationsRetrived && $scope.buildersRetrived && $scope.propertyRetrived && $scope.specificationsRetrived){
				$scope.property.city = property.city;
				$scope.areas = $filter('filter')($scope.cities,{'city':$scope.property.city},true)[0].areas;
				$scope.property.area = property.area;
				$scope.property.builder_id = property.builder_id;
				setTimeout(function(){
					$scope.$broadcast('updateCkeditor');
					$scope.property.data = property.data;
				},1000);
				angular.forEach(property.data.specifications, function(value, key){
					$filter('filter')($scope.specifications,{'id':value},true)[0].is_checked=1;
				});				
		}
	};

	$scope.update = function(form){
		if(form.$valid && form.$dirty){
			angular.copy($scope.property,property);
			property.min_price = parseFloat($scope.min_price_value) * parseInt($scope.min_price_unit_value);
			property.max_price = parseFloat($scope.max_price_value) * parseInt($scope.max_price_unit_value);
			property.data.specifications = [];
			angular.forEach($scope.specifications, function(value, key){
				if(angular.isDefined(value.is_checked) && value.is_checked != 0) {
					property.data.specifications.push(value.id);
				}
			});			
			properties.update(property,function(data,status){
				if (status == 204) {
					alert('Updated');
					window.location = '#/properties';
				}else{
					alert(data);
				}	
			});
			
		}
	};

}]);