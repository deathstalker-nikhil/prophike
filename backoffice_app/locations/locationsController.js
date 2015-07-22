'use strict';

angular.module('backofficeApp.locations', ['ngRoute','backofficeApp.locations.create'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations', {
    templateUrl: 'backoffice_app/locations/locations.html',
    controller: 'locationsCtrl'
  });
}])

.controller('locationsCtrl', [function() {

	angular.element(document).ready(function(){
	    jQuery('#dataTables-example').DataTable({
	            responsive: true
	    });		
	});
}]);