'use strict';

var locationsApp = angular.module('backofficeApp.locations', [
	'ngRoute',
	'backofficeApp.locations.create',
	'backofficeApp.locations.edit'
	])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/locations', {
		// reloadOnSearch:false,
		templateUrl: 'backoffice_app/locations/locations.html',
		controller: 'locationsCtrl'
	});	
}])

.controller('locationsCtrl', ['$scope','locations','$location','$filter',function($scope,locations,$location,$filter) {
	$scope.app.state = 'locations';
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	$scope.cities = [];
	$scope.tableData = locations.tableInfoData;
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}
	urlParams.fields = 'id,city,areas';
	locations.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-id');
				}			
			$scope.cities = data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.cities[0].id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.cities[$scope.cities.length-1].id)?false : true;
		}
		});		
	$scope.next = function(){	
		if(!angular.equals([],$scope.cities))
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.cities[$scope.cities.length-1].id});
	};
	$scope.prev = function(){
		if(!angular.equals([],$scope.cities))
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.cities[0].id,'order_by':'id ASC'});
		};
	$scope.load = function(result){
		if(!angular.equals([],$scope.cities))
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.cities[0].id});		
	};
	$scope.$on('locations.tableInfo.update',function(event){
		$scope.tableData = locations.tableInfoData;
	});

	$scope.delete = function(obj) {
		if(!confirm("Delete City ?")) {return};
		locations.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				$scope.cities.splice($scope.cities.indexOf(obj),1);
			}
		});
	}
}]);