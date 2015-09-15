'use strict';

var propertiesApp = angular.module('backofficeApp.properties.units', [
		'ngRoute',
		'ngSanitize',
		'backofficeApp.properties.units.create',
		'backofficeApp.properties.units.media',
		'backofficeApp.properties.units.edit'
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/:id/units', {
    templateUrl: 'backoffice_app/properties/units/unitsView.html',
    controller: 'unitsCtrl'
  });
}])

.controller('unitsCtrl', ['$scope','units','$location','$filter','$routeParams',function($scope,units,$location,$filter,$routeParams) {
	$scope.p_id = $routeParams.id;
	units.setPid($scope.p_id);
	$scope.app.state = 'properties';
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	$scope.tableData = units.tableInfoData;
	var urlParams  = $location.search();

	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}

	if(angular.isDefined(urlParams.where) && urlParams.where != ''){
		urlParams.where = urlParams.where+' AND p_id='+$scope.p_id;
	}else{
		urlParams.where = 'id>0 AND p_id='+$scope.p_id;
	}

	units.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-id');
				}			
			$scope.units = data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.units[0].id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.units[$scope.units.length-1].id)?false : true;	
		}		
	});

	$scope.next = function(){		
		if($scope.units != [])
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.units[$scope.units.length-1].id});
	};

	$scope.prev = function(){
		if($scope.units != [])
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.units[0].id,'order_by':'id ASC'});
	};

	$scope.load = function(result){
		if($scope.units != [])
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.units[0].id});		
	};

	$scope.$on('units.tableInfo.update',function(event){
		$scope.tableData = units.tableInfoData;
	});

	$scope.delete = function(property) {
		if(!confirm("Delete City ?")) {return};
		units.delete(property,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				$scope.units.splice($scope.units.indexOf(property), 1);
			}
		});
	}

	$scope.view = function(id){
		if(id == '') {return;}
		units.get({'id':id},function(data,status){
			if(status == 200 && !angular.equals([],data))
			$scope.unit = data[0];
			if($scope.unit.image_path){
				$scope.unit.image_path = angular.fromJson($scope.unit.image_path);
			}
			jQuery('#viewUnitModal').modal('show');
		});
	}

}]);