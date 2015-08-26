'use strict';

var specificationsApp = angular.module('backofficeApp.specifications', [
	'ngRoute',
	'backofficeApp.specification.create',
	])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/specifications', {
		reloadOnSearch:false,
		templateUrl: 'backoffice_app/specifications/specifications.html',
		controller: 'specificationsCtrl'
	});
}])

.controller('specificationsCtrl', ['$scope','$http','specifications','$location','$filter',function($scope,$http,specifications,$location,$filter) {
	specifications.get('api/specifications/specifications',{},function (data,status) {
		console.log(data);
		$scope.specifications= data;
		// body...
	});
/*
	$scope.names =[];
	$scope.perPageArray = [5,10,15,20];
	$scope.show_prev_btn = true;
	$scope.show_next_btn = true;
	$scope.where = 'id>0';
	$scope.order_by = 'id DESC';
	$scope.result = $scope.perPageArray[0];
	if(angular.equals({}, $builder.search())){
		$location.search({'per_page':$scope.result,'where':$scope.where,order_by:$scope.order_by});
	}
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}
	builder.paginationInfo($scope.result,function(data,success){
		if(success == 200){
			$scope.first_id = data.first_id;
			$scope.last_id = data.last_id
		}else{
			console.log(data);
		}
	});		
	if(angular.isDefined(urlParams.order_by)){
		$scope.order_by = urlParams.order_by;
	}
	if(angular.isDefined(urlParams.where)){
		$scope.where = urlParams.where;	
	}
	builder.get('/api/builder/cities',{limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
		if(!angular.equals([],data)){
			$scope.cities = data;									
		}else{
			$scope.show_prev_btn = false;
			$scope.show_next_btn = false;
		}
	});		
	$scope.next = function(){
		if($scope.cities[$scope.cities.length-1].id == $scope.first_id){
			$scope.show_next_btn = false;
			$scope.show_prev_btn = true;
			return;
		}else{
			$scope.show_next_btn = true;
			$scope.show_prev_btn = true;
		}
		$scope.where = 'id<'+$scope.cities[$scope.cities.length-1].id;
		$scope.order_by = 'id DESC';
		$location.search('where',$scope.where);
		$location.search('order_by',$scope.order_by);
		builder.get('/api/builder/cities',{limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
				$scope.cities = data;									
		});		
	};
	$scope.prev = function(){
		if($scope.cities[0].id == $scope.last_id){
			$scope.show_prev_btn = false;
			$scope.show_next_btn = true;
			return;
		}else{
			$scope.show_next_btn = true;
			$scope.show_prev_btn = true;
		}
		$scope.where = 'id>'+$scope.cities[0].id;
		$scope.order_by = 'id ASC';
		$location.search('where',$scope.where);
		$location.search('order_by',$scope.order_by);
		builder.get('/api/builder/cities',{limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
					data = $filter('orderBy')(data,'-id');
					$scope.cities = data;									
			});
		};
	$scope.load = function(result){
		$scope.result = result;
		$scope.where = 'id<='+$scope.cities[0].id;
		$scope.order_by = 'id DESC';
		$location.search('where',$scope.where);
		$location.search('order_by',$scope.order_by);
		builder.get('/api/builder/cities',{limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
					if(urlParams.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}
					$scope.cities = data;									
			});
		$location.search('per_page',result);
	};
	$scope.$on( 'builder.update', function(event) {
		builder.get('/api/builder/cities',{limit:$scope.result,where:$scope.where,order_by:$scope.order_by},function(data,status){
					if(urlParams.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}
					$scope.cities = data;									
			});
	});
*/
	$scope.delete = function(obj) {
		if(!confirm("Delete Specification ?")) {return};
		specifications.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
$scope.specifications.splice($scope.specifications.indexOf(obj), 1);
				}
		});
	}

	
}]);
