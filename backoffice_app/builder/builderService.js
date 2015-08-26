builderApp.factory('builder',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var builder = {};
	builder.names = [];

	builder.get = function(params,callBack){
		var url = 'api/builder/builder';
		var getParams = "?";
		angular.forEach(params,function(value,key){
			getParams += key+'='+value+'&'; 
		});			
		getParams = getParams.substring(0,getParams.length-1);
		$http.get(url+getParams).
		success(function(data, status, headers, config) {
		/*	angular.forEach(data,function(value,key){
				data[key].areas = angular.fromJson(value.areas);
			});
*/
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	  	
	};

	builder.paginationInfo = function(limit,callBack){
		$http.get('/api/builder/pagination?limit='+limit).
		success(function(data, status, headers, config) {
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	
	}


	builder.save = function(builder,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({builder,
			'csrf_token':csrf_token
		});
		$http.post('/api/builder/builder',
			data,
			{headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).
		success(function(data, status, headers, config) {
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});		
	}

	builder.update = function(builder,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({builder,
				'csrf_token':csrf_token
			});
			$http.put('/api/builder/builder/'+builder.id,
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

	builder.delete = function(obj,callBack){
		$http.delete('/api/builder/builder/'+obj.id).
		success(function(data, status, headers, config) {
			
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};
/*
	builder.get('/api/builder/names',{},function(data,status){
		if(status == 200){
			builder.names = data;
			$rootScope.$broadcast('builder.update');
		}
		else{
			console.log(data,status)
		}
	});
*/
	return builder;

}]);
