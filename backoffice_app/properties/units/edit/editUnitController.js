'use strict';

angular.module('backofficeApp.properties.units.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/:p_id/units/edit/:id', {
    templateUrl: 'backoffice_app/properties/units/edit/editUnitView.html',
    controller: 'editUnitCtrl'
  });
}])

.controller('editUnitCtrl', ['$scope','$routeParams','units',function($scope,$routeParams,units) {

	var id = $routeParams.id;
	var p_id = $routeParams.p_id;
	$scope.unit = {};

	units.get({'id':id},function(data,status){
		if(status == 200){
	    	$scope.unit = data.data[0];
				if($scope.unit.unit_price < 100000){
					$scope.unit_price_value = $scope.unit.unit_price/1000;
					$scope.price_unit_value = '1000';
				}else if($scope.unit.unit_price < 10000000){
					$scope.unit_price_value = $scope.unit.unit_price/100000;
					$scope.price_unit_value = '100000';
				}else{
					$scope.unit_price_value = $scope.unit.unit_price/10000000;
					$scope.price_unit_value = '10000000';
				}
				if($scope.unit.unit_price_per_area < 100000){
					$scope.unit_price_per_area_value = $scope.unit.unit_price_per_area/1000;
					$scope.price_per_area_unit_value = '1000';
				}else if($scope.unit.unit_price_per_area < 10000000){
					$scope.unit_price_per_area_value = $scope.unit.unit_price_per_area/100000;
					$scope.price_per_area_unit_value = '100000';
				}else{
					$scope.unit_price_per_area_value = $scope.unit.unit_price_per_area/10000000;
					$scope.price_per_area_unit_value = '10000000';
				}	    	
	    	$scope.unit.unit_area = parseFloat($scope.unit.unit_area);
	    	$scope.unit.p_id = p_id;
		}else{
			console.log(data);	
		}
	});

	$scope.update = function(form){
		if(form.$valid && form.$dirty){
			var unit = $scope.unit;
			$scope.unit.unit_price = parseFloat($scope.unit_price_value) * parseInt($scope.price_unit_value);
			$scope.unit.unit_price_per_area = parseFloat($scope.unit_price_per_area_value) * parseInt($scope.price_per_area_unit_value);	
			$scope.unit.unit_area = parseFloat($scope.unit.unit_area);		
			units.update(unit,function(data,status){
				if(status == 204){
					alert('Updated');
					window.location = '#/properties/'+unit.p_id+'/units';
				}
				else{
					console.log(data);
				}				
			});
			
		}
	};

}]);