'use strict';

angular.module('backofficeApp.properties.units.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/:id/units/add', {
    templateUrl: 'backoffice_app/properties/units/create/createUnitsView.html',
    controller: 'createUnitCtrl'
  });
}])

.controller('createUnitCtrl', ['$scope','units','$routeParams',function($scope,units,$routeParams) {
	$scope.app.state = 'properties';
	$scope.unit = {};
	$scope.unit.p_id = $routeParams.id;
	$scope.save = function(form){
		if(form.$valid && form.$dirty){
			$scope.unit.unit_price = parseFloat($scope.unit_price_value) * parseInt($scope.price_unit_value);
			$scope.unit.unit_price_per_area = parseFloat($scope.unit_price_per_area_value) * parseInt($scope.price_per_area_unit_value);
			units.save($scope.unit,function(data,status){
				if (status == 201) {
					alert('Created');
					window.location = '#/properties/'+$scope.unit.p_id+'/units';
				}else{
					alert(data);
				}				
			});
		}
	};
}]);