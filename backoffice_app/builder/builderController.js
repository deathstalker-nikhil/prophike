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
	$scope.perPageArray = [25,50,100,200];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;	
	$scope.builder = [];
	$scope.tableData = {};
	var urlParams = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}	
	function getBuilders(){		
		builder.get(urlParams,function(data,status){
			if(!angular.equals([],data.data)){
				if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
					if(urlParams.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}			
				$scope.builder = data.data;
				$scope.tableData.first_id = (angular.isDefined(data.first_id))?data.first_id:null;
				$scope.tableData.last_id = (angular.isDefined(data.last_id))?data.last_id:null;
				$scope.tableData.total = (angular.isDefined(data.total))?data.total:0;
				$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && !angular.equals([],$scope.builder))?($scope.tableData.last_id == $scope.builder[0].id)?false:true:false;
				$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && !angular.equals([],$scope.builder))?($scope.tableData.first_id == $scope.builder[$scope.builder.length-1].id)? false:true:false;		
			}
		});	
	}

	getBuilders();

	$scope.next = function(){		
		if(!angular.equals([], $scope.builder))
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.builder[$scope.builder.length-1].id});
	};
	$scope.prev = function(){
		if(!angular.equals([], $scope.builder))
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.builder[0].id,'order_by':'id ASC'});
		};		
	$scope.load = function(result){
		if(!angular.equals([], $scope.builder))
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.builder[0].id});		
	};		

	$scope.view = function(id){
		if(id == '') {return;}
		builder.get({'id':id},function(data,status){
			if(status == 200 && !angular.equals([],data.data))
			$scope.builderData = data.data[0];
			if($scope.builderData.logo_link != '')
				$scope.builderData.logo_link = angular.fromJson($scope.builderData.logo_link);
			else{
				$scope.builderData.logo_link = {'logo':[]};
				$scope.builderData.logo_link.logo[0] = '//:0';
			}

			jQuery('#viewBuilder').modal('show');
		});		
	}

	$scope.delete = function(obj) {
		if(!confirm("Delete Specification ?")) {return};
		builder.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
				getBuilders();
				}
		});
	}

	
}]);
