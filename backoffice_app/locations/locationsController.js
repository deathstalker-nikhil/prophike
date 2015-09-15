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
	$scope.tableData = locations.tableInfoData;
	// $scope.where = 'id>0';
	// $scope.order_by = 'id DESC';	
	// if(angular.equals({}, $location.search())){
	// 	$location.search({'per_page':$scope.result,'where':$scope.where,order_by:$scope.order_by});
	// }
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}
	// locations.paginationInfo($scope.result,function(data,success){
	// 	if(success == 200){
	// 		$scope.first_id = data.first_id;
	// 		$scope.last_id = data.last_id
	// 	}else{
	// 		console.log(data);
	// 	}
	// });		
	// if(angular.isDefined(urlParams.order_by)){
	// 	$scope.order_by = urlParams.order_by;
	// }
	// if(angular.isDefined(urlParams.where)){
	// 	$scope.where = urlParams.where;	
	// }
	urlParams.fields = 'id,city,areas';
	locations.get(urlParams/*{limit:$scope.result,where:$scope.where,order_by:$scope.order_by}*/,function(data,status){
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
		// if($scope.cities[$scope.cities.length-1].id == $scope.first_id){
		// 	$scope.show_next_btn = false;
		// 	$scope.show_prev_btn = true;
		// 	return;
		// }else{
		// 	$scope.show_next_btn = true;
		// 	$scope.show_prev_btn = true;
		// }
		// $scope.where = 'id<'+$scope.cities[$scope.cities.length-1].id;
		// $scope.order_by = 'id DESC';
		// $location.search('where',$scope.where);
		// $location.search('order_by',$scope.order_by);
		// locations.get({limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
		// 		$scope.cities = data;									
		// });		
		if($scope.cities != [])
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.cities[$scope.cities.length-1].id});
	};
	$scope.prev = function(){
		// if($scope.cities[0].id == $scope.last_id){
		// 	$scope.show_prev_btn = false;
		// 	$scope.show_next_btn = true;
		// 	return;
		// }else{
		// 	$scope.show_next_btn = true;
		// 	$scope.show_prev_btn = true;
		// }
		// $scope.where = 'id>'+$scope.cities[0].id;
		// $scope.order_by = 'id ASC';
		// $location.search('where',$scope.where);
		// $location.search('order_by',$scope.order_by);
		// locations.get({limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
		// 			data = $filter('orderBy')(data,'-id');
		// 			$scope.cities = data;									
		// 	});
		if($scope.cities != [])
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.cities[0].id,'order_by':'id ASC'});
		};
	$scope.load = function(result){
		// $scope.result = result;
		// $scope.where = 'id<='+$scope.cities[0].id;
		// $scope.order_by = 'id DESC';
		// $location.search('where',$scope.where);
		// $location.search('order_by',$scope.order_by);
		// locations.get({limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
		// 			if(urlParams.order_by.indexOf('id ASC') > -1) {
		// 				data = $filter('orderBy')(data,'-id');
		// 			}
		// 			$scope.cities = data;									
		// 	});
		// $location.search('per_page',result);
		if($scope.cities != [])
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.cities[0].id});		
	};
	// $scope.$on( 'locations.update', function(event) {
	// 	locations.get({limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
	// 				if(urlParams.order_by.indexOf('id ASC') > -1) {
	// 					data = $filter('orderBy')(data,'-id');
	// 				}
	// 				$scope.cities = data;									
	// 		});
	// });
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