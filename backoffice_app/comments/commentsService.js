commentsApp.factory('comments',['$http','$rootScope','$httpParamSerializerJQLike','$filter',function($http,$rootScope,$httpParamSerializerJQLike,$filter) {

	var comments = {};
	comments.tableInfoData = {};

	comments.get = function(params,callBack){
		var url = 'api/comments/comments';
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

	comments.tableInfo = function(){
		$http.get('/api/comments/tableInfo?').
		success(function(data, status, headers, config) {
			if(status == 200){
				comments.tableInfoData = data;
				$rootScope.$broadcast('comments.tableInfo.update');
			}
		}).
		error(function(data, status, headers, config) {
			console.log(data,status);
		});	
	};


	comments.save = function(commentObj,callBack){
		var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var data = $httpParamSerializerJQLike({'comment':commentObj,
			'csrf_token':csrf_token
		});
		$http.post('/api/comments/comments',
			data,
			{headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).
		success(function(data, status, headers, config) {
			comments.tableInfo();
			callBack(data,status);
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});		
	}

	comments.update = function(comment,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({comment,
				'csrf_token':csrf_token
			});
			$http.put('/api/comments/comments/'+comment.id,
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

	comments.delete = function(obj,callBack){
		$http.delete('/api/comments/comments/'+obj.id).
		success(function(data, status, headers, config) {
			comments.tableInfo();
			callBack(data,status); 
		}).
		error(function(data, status, headers, config) {
			callBack(data,status);
		});  	
	};

	comments.tableInfo();

	return comments;

}]);
