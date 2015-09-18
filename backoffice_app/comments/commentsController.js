'use strict';

var commentsApp = angular.module('backofficeApp.comments', [
	'ngRoute',
	])

.config(['$routeProvider', function($routeProvider,$provide) {
	$routeProvider.when('/comments', {
		templateUrl: 'backoffice_app/comments/comments.html',
		controller: 'commentsCtrl'
	});
}])

.controller('commentsCtrl', ['$scope','comments','$location',function($scope,comments,$location) {
	$scope.app.state = 'comments';
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
	$scope.tableData = comments.tableInfoData;
	urlParams.fields = 'id,user_name,user_phone,user_comment,user_email,name as project_name,projects.project_id,is_approved';
	comments.get(urlParams,function(data,status){
		if(!angular.equals([],data)){
			if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
				if(urlParams.order_by.indexOf('id ASC') > -1) {
					data = $filter('orderBy')(data,'-id');
				}			
			angular.forEach(data, function(value, key){
				value.is_approved = parseInt(value.is_approved);
			});
			$scope.comments = data;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && $scope.tableData.last_id == $scope.comments[0].id)       	?false : true;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && $scope.tableData.first_id == $scope.comments[$scope.comments.length-1].id)?false : true;	
		}
		});	
	$scope.next = function(){		
		if($scope.comments != [])
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.comments[$scope.comments.length-1].id});
	};
	$scope.prev = function(){
		if($scope.comments != [])
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.comments[0].id,'order_by':'id ASC'});
		};		
	$scope.load = function(result){
		if($scope.comments != [])
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.comments[0].id});		
	};		

	$scope.setValue = function(index){
		jQuery('#toggleComment + label').css('pointer-events','none');
		comments.update({'id':$scope.comments[index].id,'is_approved':$scope.comments[index].is_approved},function(data,status){
			if(status != 204){
				if($scope.comments[index].is_approved == 1){
					$scope.comments[index].is_approved = 0;
				}else{
					$scope.comments[index].is_approved = 1;
				}
				console.log(data);	
			}
			jQuery('#toggleComment + label').css('pointer-events','auto');
		});
	}

	$scope.$on('comments.tableInfo.update',function(event){
		$scope.tableData = comments.tableInfoData;
	});	

	$scope.delete = function(obj) {
		if(!confirm("Delete comment ?")) {return};
		comments.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
				$scope.comments.splice($scope.comments.indexOf(obj), 1);
				}
		});
	}

	
}]);
