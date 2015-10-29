<!DOCTYPE html>
	<html lang="en" ng-app="loginApp">
		<head>
			<title>Login</title>
		    <meta charset="utf-8">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		    <meta name="viewport" content="width=device-width, initial-scale=1">
		    <link href="/assets/css/bootstrap.min.css" rel="stylesheet">
		    <script src="/assets/js/angular.min.js"></script>
		    <style>
		    	div.row > div{
		    		border:1px solid #ccc;
		    		margin-top:10%;
		    	}
		    	.err{
		    		font-size:.9em;
		    		color:#e74c3c;
		    	}
					*{
						border-radius: 0 !important;
					}
					.form-control:focus{
						box-shadow: none;
					}		    	
		    </style>
		</head>
	<body  ng-controller="AppCtrl">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-4 col-sm-offset-4" ng-cloak>
				<h1>Login to continue</h1>
				<form name="loginForm">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="email" name="username" class="form-control" id="username" ng-model="username" required placeholder="Username">
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" id="password" class="form-control" name="password" required ng-model="password" placeholder="Password">
					</div>
					<div class="form-group text-center err" ng-show="err">
						<span >{{ message }}</span>
					</div>
					<div class="form-group">
						<input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
						<button ng-click="login(loginForm)" class="btn btn-info">Login</button>	
					</div>
					
				</form>	
			</div>				
		</div>
	</div>
	<script src="/assets/js/jquery-1.11.3.min.js"></script>
	<script>
		var app = angular.module('loginApp', []);
		app.controller('AppCtrl', ['$scope','$http', function($scope,$http){
			$scope.csrf_token = $('input[name="csrf_token"]').val();
			$scope.err = false;
			$scope.message = '';
			$scope.login = function(form){
				if(form.$valid && form.$dirty){
					$scope.err=false;
					data = $.param({username:$scope.username,
									password:$scope.password,
									csrf_token:$scope.csrf_token
								});
					$http.post('/backoffice/doLogin',
								data,
								{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
							}).
					  success(function(data, status, headers, config) {
					  	if (status == 200) {
					  		window.location.href = data.url;
					  	}
					  }).
					  error(function(data, status, headers, config) {
					    $scope.err = true;
					    $scope.message = data.error;
					  });
				}
			}
		}]);
	</script>
	</body>
</html>