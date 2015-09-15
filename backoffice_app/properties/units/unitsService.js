propertiesApp.factory('units',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var units = {};
	units.tableInfoData = {};
	var p_id = 0;

	units.setPid = function(x){
		p_id = x; 
		units.tableInfo();
	}

	units.get = function(params,callBack){
		var url = '/api/units/units';
		var getParams = "?";
		angular.forEach(params,function(value,key){
			getParams += key+'='+value+'&'; 
		});			
		getParams = getParams.substring(0,getParams.length-1);
		$http.get(url+getParams).
		success(function(data, status, headers, config) {
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	  	
	};

	units.tableInfo = function(){
		$http.get('/api/units/tableInfo?p_id='+p_id).
		success(function(data, status, headers, config) {
			if(status == 200){
				units.tableInfoData = data;
				$rootScope.$broadcast('units.tableInfo.update');
			}
		}).
		error(function(data, status, headers, config) {
			console.log(data,status);
		});	
	};


	units.save = function(unit,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({unit,
			'csrf_token':csrf_token
		});
		$http.post('/api/units/units',
			data,
			{headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).
		success(function(data, status, headers, config) {
			units.tableInfo();
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});		
	}

	units.update = function(unit,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({unit,
				'csrf_token':csrf_token
			});
			$http.put('/api/units/units/'+unit.id,
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

	units.delete = function(unit,callBack){
		$http.delete('/api/units/units/'+unit.id).
		success(function(data, status, headers, config) {
			units.tableInfo();
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};

	return units;

}]);