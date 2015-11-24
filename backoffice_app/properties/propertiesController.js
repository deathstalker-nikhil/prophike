'use strict';

angular.module('backofficeApp.properties', [
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

.controller('propertiesCtrl', ['$scope','properties','$location','$filter','builder','locations',function($scope,properties,$location,$filter,builder,locations) {
	$scope.app.state = 'properties';
	$scope.perPageArray = [25,50,100,200];
	$scope.show_prev_btn = false;
	$scope.show_next_btn = false;
	$scope.properties = [];
	$scope.tableData = {};
	var urlParams  = $location.search();
	if(angular.isDefined(urlParams.per_page)){
		if(urlParams.per_page <= $scope.perPageArray[$scope.perPageArray.length-1])
			$scope.result = ""+urlParams.per_page;
		else
			$scope.result = ""+$scope.perPageArray[$scope.perPageArray.length-1];
	}else{
		$scope.result = ""+$scope.perPageArray[0];		
	}
  
  function getProperties(){
  	urlParams.get_all_projects = 1;
		properties.get(urlParams,function(data,status){
			if(!angular.equals([],data.data)){
				if(angular.isDefined(urlParams.order_by) && urlParams.order_by != '')	
					if(urlParams.order_by.indexOf('id ASC') > -1) {
						data = $filter('orderBy')(data,'-project_id');
					}						
				$scope.properties = data.data;
				angular.forEach(data.data, function(value, key){
					value.is_live = parseInt(value.is_live);
				});				
			}
			$scope.tableData.first_id = (angular.isDefined(data.first_id))?data.first_id:null;
			$scope.tableData.last_id = (angular.isDefined(data.last_id))?data.last_id:null;
			$scope.tableData.total = (angular.isDefined(data.total))?data.total:0;
			$scope.show_prev_btn = (angular.isDefined($scope.tableData.last_id) && !angular.equals([],$scope.properties))?($scope.tableData.last_id == $scope.properties[0].project_id)?false:true:false;
			$scope.show_next_btn = (angular.isDefined($scope.tableData.first_id) && !angular.equals([],$scope.properties))?($scope.tableData.first_id == $scope.properties[$scope.properties.length-1].project_id)? false:true:false;					
		});
	}

	getProperties();

	$scope.setValue = function(index){
		jQuery('#toggleProject + label').css('pointer-events','none');
		properties.update({'project_id':$scope.properties[index].project_id,'is_live':$scope.properties[index].is_live},function(data,status){
			if(status != 204){
				if($scope.properties[index].is_live == 1){
					$scope.properties[index].is_live = 0;
				}else{
					$scope.properties[index].is_live = 1;
				}
				console.log(data);	
			}
			jQuery('#toggleProject + label').css('pointer-events','auto');
		});
	}

	locations.get({limit:10000,'fields':'id,city'},function(data,status){
		if(!angular.equals([], data.data)){
			$scope.cities = data.data;
		}
		if(angular.isDefined(urlParams.where) && urlParams.where.indexOf('city') != -1){
			angular.forEach((urlParams.where.match(/city in \(([a-zA-z,\s-_]+)\)/)[1].split(',')), function(value){
				var x;
				if(angular.isDefined(x = $filter('filter')($scope.cities,{'city':value},true)[0]))
					$scope.cities[$scope.cities.indexOf(x)].is_checked = 1;
			});
		}		
	});

	builder.get({limit:10000},function(data,status){
		if(!angular.equals([], data.data)){
			$scope.builders = data.data;
		}
		if(angular.isDefined(urlParams.where) && urlParams.where.indexOf('builder_id') != -1){
			angular.forEach((urlParams.where.match(/builder_id in \((.+?)(?=\))/)[1].split(',')), function(value){
				var x;
				if(angular.isDefined(x = $filter('filter')($scope.builders,{'id':value},true)[0]))
					$scope.builders[$scope.builders.indexOf(x)].is_checked = 1;
			});
		}		
	});	

	$scope.next = function(){		
		if(!angular.equals([], $scope.properties)){
			var obj = {};
			if(angular.isDefined(urlParams))
				angular.copy(urlParams, obj);
			if(angular.isDefined(obj.where) && obj.where != ''){
				delete obj.where;
			}			
			obj.per_page = $scope.result;
			obj.get_for = 'id<'+$scope.properties[$scope.properties.length-1].project_id;
			updateUrl(obj);
		}
	};

	$scope.prev = function(){
		if(!angular.equals([], $scope.properties)){
			var obj = {};
			if(angular.isDefined(urlParams))
				angular.copy(urlParams, obj);
			if(angular.isDefined(obj.where) && obj.where != ''){
				delete obj.where;
			}			
			obj.per_page = $scope.result;
			obj.get_for = 'id>'+$scope.properties[0].project_id;
			obj.order_by = 'id ASC';
			updateUrl(obj);
		}
	};

	$scope.load = function(result){
		if(!angular.equals([], $scope.properties)){
			var obj = {};
			if(angular.isDefined(urlParams))
				angular.copy(urlParams, obj);
			if(angular.isDefined(obj.where) && obj.where != ''){
				delete obj.where;
			}
			obj.per_page = $scope.result;
			obj.get_for = 'id<='+$scope.properties[0].project_id;
			obj.order_by = '';
			updateUrl(obj);		
		}
	};

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
					if(!angular.equals({},urlParams) && angular.isDefined(urlParams.where)){
						if(urlParams.where.indexOf('builder_id') != -1 && params.where.indexOf('builder_id') != -1){
							urlParams.where = urlParams.where.replace(/builder_id.+?\([0-9,]+\)/,params.where);
						}else if(params.where.indexOf('builder_id') != -1){
							urlParams.where += ' and '+params.where;
						}else if(urlParams.where.indexOf('builder_id') != -1 && params.where == 'deleteBuilder_id'){
							urlParams.where = urlParams.where.replace(/\s*(?:and){0,1}\s*builder_id.+?\([0-9,]+\)/,'');
						}
						if(urlParams.where.indexOf('min_price') != -1 && params.where.indexOf('min_price') != -1){
							urlParams.where = urlParams.where.replace(/min_price.+and [0-9,]+/,params.where);
						}else if(params.where.indexOf('min_price') != -1){
							urlParams.where += ' and '+params.where;
						}else if(urlParams.where.indexOf('min_price') != -1 && params.where == 'deletePrice'){
							urlParams.where = urlParams.where.replace(/\s*(?:and){0,1}\s*min_price.+and [0-9,]+/,'');
						}
						if(urlParams.where.indexOf('city') != -1 && params.where.indexOf('city') != -1){
							urlParams.where = urlParams.where.replace(/city in \([a-zA-Z,\s-_]+\)/,params.where);
						}else if(params.where.indexOf('city') != -1){
							urlParams.where += ' and '+params.where;
						}else if(urlParams.where.indexOf('city') != -1 && params.where == 'deleteCity'){
							urlParams.where = urlParams.where.replace(/\s*(?:and){0,1}\s*city in \([a-zA-z,\s-_]+\)/,'');
						}												
						urlParams.where = urlParams.where.replace(/^\s*(?:and){0,1}\s*/,'');
					}
					else{
						urlParams.where = params.where;						
					}
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
				case 'get_for':
					urlParams.get_for = params.get_for;
					if(urlParams.get_for == ''){
						delete urlParams.get_for;
					}					
					break;
				case 'selectedPriceIds':
					urlParams.selectedPriceIds = params.selectedPriceIds;
					if(urlParams.selectedPriceIds == ''){
						delete urlParams.selectedPriceIds;
					}
					break;
				case 'selectedUnits':
					urlParams.units = params.selectedUnits;
					if(urlParams.units == ''){
						delete urlParams.units;
					}					
					break;
				case 'possessions':
					urlParams.possessions = params.possessions;
					if(urlParams.possessions == ''){
						delete urlParams.possessions;
					}
					break;
				default:break;
			}
		});
		$location.search(urlParams);
	};

	$scope.delete = function(property) {
		if(!confirm("Delete Project ?")) {return};
		properties.delete(property,function(data,status){
			if(status == 500){
				alert(data.error);
			}else{
				getProperties();
			}
		});
	}

	$scope.possessions = [{'id':1,'text':'Ready to move in','min_val':0,'max_val':0,'is_checked':0},
												{'id':2,'text':'0 to 6 months','min_val':0,'max_val':6,'is_checked':0},
												{'id':3,'text':'6 to 12 months','min_val':6,'max_val':12,'is_checked':0},
												{'id':4,'text':'1 to 2 years','min_val':12,'max_val':24,'is_checked':0},
												{'id':5,'text':'More than two years','min_val':24,'max_val':5000,'is_checked':0}];

	$scope.priceRanges = [{'id':1,'text':'Less than 30 Lakhs','min_val':0,'max_val':3000000,'is_checked':0},
											 {'id':2,'text':'Between 30 to 50 Lakhs','min_val':3000000,'max_val':5000000,'is_checked':0},
											 {'id':3,'text':'Between 50 to 80 Lakhs','min_val':5000000,'max_val':8000000,'is_checked':0},
											 {'id':6,'text':'More than 80 Lakhs','min_val':8000000,'max_val':10000000000,'is_checked':0}];

	$scope.unitTypes = [{'text':'2 BHK','is_checked':0},
											{'text':'3 BHK','is_checked':0},
											{'text':'4 BHK','is_checked':0},
											{'text':'Studio Apartments','is_checked':0},
											{'text':'Villa','is_checked':0},
											{'text':'Plot','is_checked':0},
											{'text':'Office Space','is_checked':0},
											{'text':'Showrooms or Shops','is_checked':0},
											{'text':'Hotels','is_checked':0}];

	if(angular.isDefined(urlParams.possessions) && urlParams.possessions!=''){
		angular.forEach(urlParams.possessions, function(value){
			var x;
			if(angular.isDefined(x = $filter('filter')($scope.possessions,{'id':parseInt(value)},true)[0]))
				$scope.possessions[$scope.possessions.indexOf(x)].is_checked = 1;
		});
	}

	if(angular.isDefined(urlParams.units) && urlParams.units != ''){
		var obj = urlParams.units.split(',');
		angular.forEach(obj, function(value,key){
			var x;
			if(angular.isDefined(x = $filter('filter')($scope.unitTypes,{'text':value},true)[0])){
				$scope.unitTypes[$scope.unitTypes.indexOf(x)].is_checked = 1;
			}
		});
	}		

	if(angular.isDefined(urlParams.selectedPriceIds)){
		var selectedPriceIds = urlParams.selectedPriceIds.split(',');
		angular.forEach(selectedPriceIds, function(value){
			var x;
			if(angular.isDefined(x = $filter('filter')($scope.priceRanges,{'id':parseInt(value)},true)[0]))
				$scope.priceRanges[$scope.priceRanges.indexOf(x)].is_checked = 1;
		});
	}else{
		var obj = {};
		if(angular.isDefined(urlParams.where)){
			angular.copy(urlParams, obj);
			obj.where = 'deletePrice';
			obj.order_by = '';
			obj.get_for = '';
			updateUrl(obj);			
		}
	}		

	$scope.getByPrice = function(){
		var selectedPrice = {
			'min_val':[],
			'max_val':[]
		};
		var selectedPriceIds = [];
		angular.forEach($scope.priceRanges, function(value, key){
			if(value.is_checked == 1){
				selectedPrice.min_val.push(value.min_val);
				selectedPrice.max_val.push(value.max_val);				
				selectedPriceIds.push(value.id);
			}
		});
		var obj = {};
		if(angular.isDefined(urlParams))
			angular.copy(urlParams, obj);
		if(!angular.equals([], selectedPrice.min_val)){
			var temp='';
			for (var i = 0; i <=selectedPrice.min_val.length-1; i++) {
				temp += 'min_price between '+selectedPrice.min_val[i]+' and '+selectedPrice.max_val[i]+' OR ';
			}
			temp = temp.substring(0,temp.length-4);
			obj.where = temp;
		}else{
			obj.where = 'deletePrice';
		}
		if(!angular.equals([], selectedPriceIds)){
			obj.selectedPriceIds = selectedPriceIds.join(',');
		}else{
			obj.selectedPriceIds = '';
		}
		obj.order_by = '';
		obj.get_for = '';
		updateUrl(obj);
		return;
	};

	$scope.getByPossession = function(){
		var selectedPossessionsIds = [];
		angular.forEach($scope.possessions, function(value, key){
			if(value.is_checked == 1){
				selectedPossessionsIds.push(value.id);
			}
		});
		var obj = {};
		if(angular.isDefined(urlParams))
			angular.copy(urlParams, obj);
		if(!angular.equals([], selectedPossessionsIds)){
			obj.possessions = ''+selectedPossessionsIds.join();
		}else{
			obj.possessions = '';
		}
		obj.order_by = '';
		obj.get_for = '';
		updateUrl(obj);		
		return;
	};

	$scope.getByBuilder = function(){
		var selectedBuilders = [];
		angular.forEach($scope.builders, function(value, key){
			if(value.is_checked == 1){
				selectedBuilders.push(value.id);
			}
		});
		var obj = {};
		if(angular.isDefined(urlParams))
			angular.copy(urlParams, obj);
		if(!angular.equals([], selectedBuilders)){
			obj.where = 'builder_id in ('+selectedBuilders.join()+')';
		}else{
			obj.where = 'deleteBuilder_id';
		}
		obj.order_by = '';
		obj.get_for = '';
		updateUrl(obj);		
		return;		
	}

	$scope.getByCity = function(){
		var selectedCities = [];
		angular.forEach($scope.cities, function(value, key){
			if(value.is_checked == 1){
				selectedCities.push(value.city);
			}
		});
		var obj = {};
		if(angular.isDefined(urlParams))
			angular.copy(urlParams, obj);
		if(!angular.equals([], selectedCities)){
			obj.where = 'city in ('+selectedCities.join()+')';
		}else{
			obj.where = 'deleteCity';
		}
		obj.order_by = '';
		obj.get_for = '';
		updateUrl(obj);		
		return;			
	}

	$scope.getByUnit = function(){
		var selectedUnits = [];
		angular.forEach($scope.unitTypes, function(value, key){
			if(value.is_checked == 1){
				selectedUnits.push(value.text);
			}
		});
		var obj = {};
		if(angular.isDefined(urlParams)){			
			angular.copy(urlParams, obj);			
		}
		if(angular.isDefined(obj.where) && obj.where != ''){
			delete obj.where;
		}		
		if(!angular.equals([], selectedUnits)){
			obj.selectedUnits = selectedUnits.join();
		}else{
			obj.selectedUnits = '';
		}
		obj.order_by = '';
		obj.get_for = '';
		updateUrl(obj);			
	};

}]);