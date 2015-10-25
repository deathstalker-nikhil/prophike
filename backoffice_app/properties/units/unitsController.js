'use strict';

angular.module('backofficeApp.properties.units', [
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
	$scope.app.state = 'properties';
	$scope.perPageArray = [25,50,100,200];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	var urlParams  = $location.search();
	$scope.tableData = {};
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

	function getUnits(){
		units.get(urlParams,function(data,status){
			if(!angular.equals([],data.data)){
				if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
					if(urlParams.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}			
				$scope.units = data.data;
				$scope.tableData.first_id = (angular.isDefined(data.first_id))?data.first_id:null;
				$scope.tableData.last_id = (angular.isDefined(data.last_id))?data.last_id:null;
				$scope.tableData.total = (angular.isDefined(data.total))?data.total:0;
				$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && !angular.equals([],$scope.units))?($scope.tableData.last_id == $scope.units[0].id)?false:true:false;
				$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && !angular.equals([],$scope.units))?($scope.tableData.first_id == $scope.units[$scope.units.length-1].id)? false:true:false;	
			}		
		});
	}
	getUnits();

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

	$scope.delete = function(property) {
		if(!confirm("Delete ?")) {return};
		units.delete(property,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				getUnits();
			}
		});
	}

	$scope.view = function(id){
		if(id == '') {return;}
		units.get({'id':id},function(data,status){
			if(status == 200 && !angular.equals([],data.data))
			$scope.unit = data.data[0];
			if($scope.unit.image_path){
				$scope.unit.image_path = angular.fromJson($scope.unit.image_path);
			}
			jQuery('#viewUnitModal').modal('show');
		});
	}

}]);