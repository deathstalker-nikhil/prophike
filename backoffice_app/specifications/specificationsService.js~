specificationsApp.factory('specifications',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var specifications = {};
	specifications.names = [];

	specifications.get = function(url,params,callBack){
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

	specifications.paginationInfo = function(limit,callBack){
		$http.get('/api/specifications/pagination?limit='+limit).
		success(function(data, status, headers, config) {
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	
	}


	specifications.save = function(specifications,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({specifications,
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
/*
	builder.update = function(location,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({location,
				'csrf_token':csrf_token
			});
			$http.put('/api/builder/cities/'+location.id,
				data,
				{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
			}).
			success(function(data, status, headers, config) {
				builder.cities[builder.cities.indexOf($filter('filter')(builder.cities, { id: location.id  }, true)[0])] = location;
				callBack(data,status);
			}).
			error(function(data, status, headers, config) {
				callBack(data,status);
			});
	};
*/
	specifications.delete = function(obj,callBack){
		$http.delete('/api/specifications/specifications/'+obj.id).
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
	return specifications;

}]);
