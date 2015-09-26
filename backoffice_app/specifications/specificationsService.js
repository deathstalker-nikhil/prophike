specificationsApp.factory('specifications',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var specifications = {};

	specifications.get = function(params,callBack){
		var url = 'api/specifications/specifications';
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

	specifications.save = function(specificationsObj,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({'specifications':specificationsObj,
			'csrf_token':csrf_token
		});
		$http.post('/api/specifications/specifications',
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

	specifications.update = function(specification,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({specification,
				'csrf_token':csrf_token
			});
			$http.put('/api/specifications/specifications/'+specification.id,
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

	specifications.delete = function(obj,callBack){
		$http.delete('/api/specifications/specifications/'+obj.id).
		success(function(data, status, headers, config) {
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};
	
	return specifications;

}]);
