angular.module('backofficeApp.user_comments').factory('commentService',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {


	var comments = {};

	comments.get = function(params,callBack){
		var url = '/api/comments/comments';
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

	// properties.paginationInfo = function(limit,callBack){
	// 	$http.get('/api/properties/pagination?limit='+limit).
	// 	success(function(data, status, headers, config) {
	// 		callBack(data,status);
	// 	}).
	// 	error(function(data, status, headers, config) {
	// 		callBack(data,status);
	// 	});	
	// }

	// properties.save = function(property,callBack){
	// 	var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	// 	var data = $httpParamSerializerJQLike({property,
	// 		'csrf_token':csrf_token
	// 	});
	// 	$http.post('/api/properties/projects',
	// 		data,
	// 		{headers:{'Content-Type':'application/x-www-form-urlencoded'},
	// 	}).
	// 	success(function(data, status, headers, config) {
	// 		callBack(data,status);
	// 	}).
	// 	error(function(data, status, headers, config) {
	// 		callBack(data,status);
	// 	});		
	// }

	// properties.update = function(property,callBack){
	// 		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	// 		var data = $httpParamSerializerJQLike({property,
	// 			'csrf_token':csrf_token
	// 		});
	// 		$http.put('/api/properties/projects/'+property.id,
	// 			data,
	// 			{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	// 		}).
	// 		success(function(data, status, headers, config) {
	// 			callBack(data,status);
	// 		}).
	// 		error(function(data, status, headers, config) {
	// 			callBack(data,status);
	// 		});
	// };

	// properties.delete = function(property,callBack){
	// 	$http.delete('/api/properties/projects/'+property.project_id).
	// 	success(function(data, status, headers, config) {
	// 		callBack(data,status); 
	// 	}).
	// 	error(function(data, status, headers, config) {
	// 		callBack(data,status);
	// 	});  	
	// };

	return comments;

}]);
