'use strict';

angular.module('backofficeApp.userQueries', [
	'ngRoute',
	])

.config(['$routeProvider', function($routeProvider,$provide) {
	$routeProvider.when('/user_queries', {
		templateUrl: 'backoffice_app/user_queries/userQueriesTemplate.html',
		controller: 'userQueriesCtrl'
	});
}])

.controller('userQueriesCtrl', ['$scope','userQueries','$location',function($scope,userQueries,$location) {
	$scope.app.state = 'userQueries';
	$scope.perPageArray = [25,50,100,200];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;	
	$scope.userQueries = [];
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

	function getUserQueries(){
		var obj = {};
		angular.copy(urlParams, obj);
		obj.fields = 'id,user_name,user_phone,user_query,quick_contact,arrange_site_visit,user_email,name as project_name,projects.project_id';
		userQueries.get(obj,function(data,status){
			if(!angular.equals([],data.data)){
				if(angular.isDefined(obj.order_by) && obj.order_by != '')	
					if(obj.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-id');
					}
				$scope.userQueries = data.data;
				$scope.tableData.first_id = (angular.isDefined(data.first_id))?data.first_id:null;
				$scope.tableData.last_id = (angular.isDefined(data.last_id))?data.last_id:null;
				$scope.tableData.total = (angular.isDefined(data.total))?data.total:0;
				$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && !angular.equals([],$scope.userQueries))?($scope.tableData.last_id == $scope.userQueries[0].id)?false:true:false;
				$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && !angular.equals([],$scope.userQueries))?($scope.tableData.first_id == $scope.userQueries[$scope.userQueries.length-1].id)? false:true:false;	
			}
		});	
	}
	getUserQueries();
	$scope.next = function(){		
		if(!angular.equals([], $scope.userQueries))
			$location.search({'per_page':$scope.result,'where':'id<'+$scope.userQueries[$scope.userQueries.length-1].id});
	};
	$scope.prev = function(){
		if(!angular.equals([], $scope.userQueries))
			$location.search({'per_page':$scope.result,'where':'id>'+$scope.userQueries[0].id,'order_by':'id ASC'});
		};		
	$scope.load = function(result){
		if(!angular.equals([], $scope.userQueries))
			$location.search({'per_page':$scope.result,'where':'id<='+$scope.userQueries[0].id});		
	};

	$scope.view = function(id){
		if(id == '') {return;}
		userQueries.get({'id':id,'fields':'id,user_name,user_phone,user_query,user_email,name as project_name,projects.project_id,quick_contact,arrange_site_visit'},function(data,status){
			if(status == 200 && !angular.equals([],data.data))
			$scope.userQuery = data.data[0];
			$scope.userQuery.arrange_site_visit_text = "NO"
			if($scope.userQuery.arrange_site_visit == '1') $scope.userQuery.arrange_site_visit_text = "YES";
			jQuery('#viewUserQueries').modal('show');
		});		
	}	

	if(!angular.equals({}, urlParams) && angular.isDefined(urlParams.where)){
		if(urlParams.where.match(/quick_contact in \(([0-1,]+)\)/) != null){
			angular.forEach(urlParams.where.match(/quick_contact in \(([0-1,]+)\)/)[1].split(','), function(value, key){
				if(value == 1){
					$scope.quickContacts = 1;	
				}
				if(value == 0){
					$scope.projectContacts = 1;
				}
			});
		}
	}

	$scope.getFilteredQueries = function(){
		var obj = {};
		angular.copy(urlParams, obj);
		var val = [];
		if($scope.quickContacts == 1){
			val.push(1);
		}
		if($scope.projectContacts == 1){
			val.push(0);
		}
		if(!angular.equals([],val)){
			if(angular.isDefined(obj.where) && obj.where != ''){				
				if(obj.where.indexOf('quick_contact in') != -1){
					obj.where = obj.where.replace(/quick_contact in \(([0-1,]+)\)/,'quick_contact in ('+val.join(',')+')');
				}else{
					obj.where += ' AND quick_contact in ('+val.join(',')+')';
				}
			}else{
				obj.where = 'quick_contact in ('+val.join(',')+')';
			}
		}else if(angular.isDefined(obj.where) && obj.where != '' && obj.where.indexOf('quick_contact in')!=-1){
			obj.where = obj.where.replace(/(?:AND)?\s*quick_contact in \([0-1,]+\)/,'');
		}
		updateUrl(obj);		
	};

	$scope.delete = function(obj) {
		if(!confirm("Delete User Query ?")) {return};
		userQueries.delete(obj,function(data,status){
			if(status == 500){
				alert(data.error);
			}
			else{
				getUserQueries();
				}
		});
	}

	
}]);
