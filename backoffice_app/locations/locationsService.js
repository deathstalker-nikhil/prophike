locationsApp.factory('locations',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var locations = {};
	locations.tableInfoData = {};

	locations.get = function(params,callBack){
		var url = '/api/locations/cities';
		var getParams = "?";
		angular.forEach(params,function(value,key){
			getParams += key+'='+value+'&'; 
		});			
		getParams = getParams.substring(0,getParams.length-1);
		$http.get(url+getParams).
		success(function(data, status, headers, config) {
			angular.forEach(data,function(value,key){
				data[key].areas = angular.fromJson(value.areas);
			});
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	  	
	};

	locations.tableInfo = function(){
		$http.get('/api/locations/tableInfo?').
		success(function(data, status, headers, config) {
			if(status == 200){
				locations.tableInfoData = data;
				$rootScope.$broadcast('locations.tableInfo.update');
			}
		}).
		error(function(data, status, headers, config) {
			console.log(data,status);
		});	
	};

	locations.save = function(location,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({location,
			'csrf_token':csrf_token
		});
		$http.post('/api/locations/cities',
			data,
			{headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).
		success(function(data, status, headers, config) {
			locations.tableInfo();
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});		
	}

	locations.update = function(location,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({location,
				'csrf_token':csrf_token
			});
			$http.put('/api/locations/cities/'+location.id,
				data,
				{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
			}).
			success(function(data, status, headers, config) {
				callBack(data,status);
			}).
			error(function(data, status, headers, config) {
				callBack(data,status);
			});
	};

	locations.delete = function(obj,callBack){
		$http.delete('/api/locations/cities/'+obj.id).
		success(function(data, status, headers, config){
			locations.tableInfo();
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};

	locations.tableInfo();

	return locations;

}]);