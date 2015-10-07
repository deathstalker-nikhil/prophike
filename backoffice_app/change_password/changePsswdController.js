angular.module('backofficeApp.changePassword', [
	'ngRoute',
	])

.config(['$routeProvider', function($routeProvider,$provide) {
	$routeProvider.when('/change_password', {
		templateUrl: 'backoffice_app/change_password/changePsswd.html',
		controller: 'changePsswdCtrl'
	});
}])

.controller('changePsswdCtrl', ['$scope','$http','$httpParamSerializerJQLike',function($scope,$http,$httpParamSerializerJQLike) {
	$scope.app.state = 'change_password';
	$scope.save = function(form){
		if($scope.newPwd != $scope.rNewPwd){alert('Passwords do not match');return;}
		if(form.$valid && form.$dirty){
			var csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var data = $httpParamSerializerJQLike({'oldPwd':$scope.oldPwd,'newPwd':$scope.newPwd,
				'csrf_token':csrf_token
			});
			$http.post('/backoffice/changePassword',
				data,
				{headers:{'Content-Type':'application/x-www-form-urlencoded'},
			}).
			success(function(data, status, headers, config) {
				if(status == 204){
					alert('Updated');
					$scope.newPwd = '';$scope.oldPwd = '';$scope.rNewPwd = '';
				}
			}).
			error(function(data, status, headers, config) {
				alert(data.error)
			});
			}
	};	
}]);