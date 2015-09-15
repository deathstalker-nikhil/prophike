'use strict';

var propertiesApp = angular.module('backofficeApp.properties', [
		'ngRoute',
		'backofficeApp.properties.view',
		'backofficeApp.properties.create',
		'backofficeApp.properties.edit',
		'backofficeApp.properties.media',
		'backofficeApp.properties.units'
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties', {
    templateUrl: 'backoffice_app/properties/properties.html',
    controller: 'propertiesCtrl'
  });
}])

.controller('propertiesCtrl', ['$scope','properties','$location','$filter',function($scope,properties,$location,$filter) {
	$scope.app.state = 'properties';
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	$scope.tableData = properties.tableInfoData;
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}
	properties.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-project_id');
				}			
			$scope.properties = data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.properties[0].project_id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.properties[$scope.properties.length-1].project_id)?false : true;	
		}		
	});
	$scope.next = function(){		
		if($scope.properties != [])
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.properties[$scope.properties.length-1].project_id});
	};
	$scope.prev = function(){
		if($scope.properties != [])
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.properties[0].project_id,'order_by':'id ASC'});
	};	
	$scope.load = function(result){
		if($scope.properties != [])
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.properties[0].project_id});		
	};			
	$scope.$on('properties.tableInfo.update',function(event){
		$scope.tableData = properties.tableInfoData;
	});	
	$scope.delete = function(property) {
		if(!confirm("Delete City ?")) {return};
		properties.delete(property,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				$scope.properties.splice($scope.properties.indexOf(property), 1);
			}
		});
	}

}]);