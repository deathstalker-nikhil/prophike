'use strict';

var builderApp = angular.module('backofficeApp.builder', [
	'ngRoute',
	'backofficeApp.builder.create',
	'backofficeApp.builder.edit',
	'backofficeApp.builder.media',
	])

.config(['$routeProvider', function($routeProvider,$provide) {
	$routeProvider.when('/builder', {
		templateUrl: 'backoffice_app/builder/builder.html',
		controller: 'builderCtrl'
	});
}])

.controller('builderCtrl', ['$scope','builder','$location','$filter',function($scope,builder,$location,$filter) {
	$scope.app.state = 'builders';
	$scope.perPageArray = [10,25,50,100];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;	
	var urlParams = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}	
	$scope.tableData = builder.tableInfoData;
	builder.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-id');
				}			
			$scope.builder = data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.builder[0].id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.builder[$scope.builder.length-1].id)?false : true;	
		}
		});	
	$scope.next = function(){		
		if($scope.builder != [])
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.builder[$scope.builder.length-1].id});
	};
	$scope.prev = function(){
		if($scope.builder != [])
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.builder[0].id,'order_by':'id ASC'});
		};		
	$scope.load = function(result){
		if($scope.builder != [])
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.builder[0].id});		
	};		
	$scope.$on('builder.tableInfo.update',function(event){
		$scope.tableData = builder.tableInfoData;
	});	

	$scope.delete = function(obj) {
		if(!confirm("Delete Specification ?")) {return};
		builder.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
				$scope.builder.splice($scope.builder.indexOf(obj), 1);
				}
		});
	}

	
}]);
