'use strict';
var specificationsApp = angular.module('backofficeApp.specifications', [
	'ngRoute',
	'backofficeApp.specification.create',
	'backofficeApp.specification.media'
	])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/specifications', {
		templateUrl: 'backoffice_app/specifications/specifications.html',
		controller: 'specificationsCtrl'
	});
}])

.controller('specificationsCtrl', ['$scope','$http','specifications','$location','$filter',function($scope,$http,specifications,$location,$filter) {
	$scope.app.state = 'specifications';
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	$scope.specifications = [];
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}	
	$scope.tableData = specifications.tableInfoData;
	specifications.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-id');
				}			
			$scope.specifications= data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.specifications[0].id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.specifications[$scope.specifications.length-1].id)?false : true;	
		}
		});		

	$scope.next = function(){		
		if(!angular.equals([], $scope.specifications))
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.specifications[$scope.specifications.length-1].id});
	};	

	$scope.prev = function(){
		if(!angular.equals([], $scope.specifications))
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.specifications[0].id,'order_by':'id ASC'});
		};	

	$scope.load = function(result){
		if(!angular.equals([], $scope.specifications))
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.specifications[0].id});		
	};		

	$scope.$on('specifications.tableInfo.update',function(event){
		$scope.tableData = specifications.tableInfoData;
	});

	$scope.delete = function(obj) {
		if(!confirm("Delete Specification ?")) {return};
		specifications.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
					$scope.specifications.splice($scope.specifications.indexOf(obj), 1);
			}
		});
	}

	
}]);
