locationsApp.factory('locations',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var locations = {};
	locations.cities = [];

	locations.get = function(url,params,callBack){
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

	locations.paginationInfo = function(limit,callBack){
		$http.get('/api/locations/pagination?limit='+limit).
		success(function(data, status, headers, config) {
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});	
	}

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
			data.location.areas = angular.fromJson(data.location.areas);
			locations.cities.push(data.location);
			$rootScope.$broadcast('locations.update');
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
				locations.cities[locations.cities.indexOf($filter('filter')(locations.cities, { id: location.id  }, true)[0])] = location;
				callBack(data,status);
			}).
			error(function(data, status, headers, config) {
				callBack(data,status);
			});
	};

	locations.delete = function(obj,callBack){
		$http.delete('/api/locations/cities/'+obj.id).
		success(function(data, status, headers, config) {
			locations.cities.splice(locations.cities.indexOf(obj), 1);
			$rootScope.$broadcast('locations.update');
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};

	locations.get('/api/locations/cities',{},function(data,status){
		if(status == 200){
			locations.cities = data;
			$rootScope.$broadcast('locations.update');
		}
		else{
			console.log(data,status)
		}
	});

	return locations;

}]);