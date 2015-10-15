'use strict';

angular.module('backofficeApp.comments', [
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
	$scope.perPageArray = [25,50,100,200];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;	
	$scope.comments = [];
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

	function updateUrl(params){
		angular.forEach(params, function(value, key){
			switch(key){
				case 'per_page':
					urlParams.per_page = params[key];
					if(urlParams.per_page == ''){
						delete urlParams.per_page;
					}						
					break;
				case 'where':
					urlParams.where = params.where;						
					if(urlParams.where == ''){
						delete urlParams.where;
					}										
					break;
				case 'order_by':
					urlParams.order_by = params.order_by;
					if(urlParams.order_by == ''){
						delete urlParams.order_by;
					}
					break;
				default:break;
			}
		});
		$location.search(urlParams);
	};

	function getComments(){
		var obj = {};
		angular.copy(urlParams, obj);
		obj.fields = 'id,user_name,user_phone,user_comment,user_email,name as project_name,projects.project_id,is_approved';
		comments.get(obj,function(data,status){
			if(!angular.equals([],data.data)){
				if(angular.isDefined(obj.order_by) && obj.order_by != '')	
					if(obj.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}			
				angular.forEach(data.data, function(value, key){
					value.is_approved = parseInt(value.is_approved);
				});
				$scope.comments = data.data;
				$scope.tableData.first_id = (angular.isDefined(data.first_id))?data.first_id:null;
				$scope.tableData.last_id = (angular.isDefined(data.last_id))?data.last_id:null;
				$scope.tableData.total = (angular.isDefined(data.total))?data.total:0;
				$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && !angular.equals([],$scope.comments))?($scope.tableData.last_id == $scope.comments[0].id)?false:true:false;
				$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && !angular.equals([],$scope.comments))?($scope.tableData.first_id == $scope.comments[$scope.comments.length-1].id)? false:true:false;	
			}
		});	
	}
	getComments();
	$scope.next = function(){		
		if(!angular.equals([], $scope.comments))
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.comments[$scope.comments.length-1].id});
	};
	$scope.prev = function(){
		if(!angular.equals([], $scope.comments))
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.comments[0].id,'order_by':'id ASC'});
		};		
	$scope.load = function(result){
		if(!angular.equals([], $scope.comments))
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

	$scope.view = function(id){
		if(id == '') {return;}
		comments.get({'id':id,'fields':'id,user_name,user_phone,user_comment,user_email,name as project_name,projects.project_id,is_approved'},function(data,status){
			if(status == 200 && !angular.equals([],data.data))
			$scope.comment = data.data[0];
			jQuery('#viewComment').modal('show');
		});		
	}	

	if(!angular.equals({}, urlParams) && angular.isDefined(urlParams.where)){
		if(urlParams.where.match(/is_approved in \(([0-1,]+)\)/) != null){
			angular.forEach(urlParams.where.match(/is_approved in \(([0-1,]+)\)/)[1].split(','), function(value, key){
				if(value == 1){
					$scope.checkedComments = 1;	
				}
				if(value == 0){
					$scope.uncheckedComments = 1;
				}
			});
		}
		
	}

	$scope.getFilteredComments = function(){
		var obj = {};
		angular.copy(urlParams, obj);
		var val = [];
		if($scope.uncheckedComments == 1){
			val.push(0);
		}
		if($scope.checkedComments == 1){
			val.push(1);
		}
		if(!angular.equals([],val)){
			obj.where = 'is_approved in ('+val.join(',')+')';
		}else{
			if(angular.isDefined(obj.where) && obj.where != ''){
				obj.where = '';
			}
		}
		updateUrl(obj);
	};

	$scope.delete = function(obj) {
		if(!confirm("Delete comment ?")) {return};
		comments.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
				getComments();
				}
		});
	}

	
}]);
