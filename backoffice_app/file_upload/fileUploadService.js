'use strict';
angular.module('backoffice.file_upload').factory('fileService',['$rootScope','$httpParamSerializerJQLike','$http',function($rootScope,$httpParamSerializerJQLike,$http) {
		var fileService = {};
		fileService.delete = function(url,callBack){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({url,
				'csrf_token':csrf_token
			});		
			$http.post('/file/delete_file',
				data,
				{headers:{'Content-Type':'application/x-www-form-urlencoded'},
			}).
			success(function(data, status, headers, config) {
				callBack(data,status);
			}).
			error(function(data, status, headers, config) {
				callBack(data,status);
			});				
		};
		return fileService;
}]);