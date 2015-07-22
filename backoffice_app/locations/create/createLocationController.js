'use strict';

angular.module('backofficeApp.locations.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locations/add', {
    templateUrl: 'backoffice_app/locations/create/createLocationsView.html',
    controller: 'createLocationsCtrl'
  });
}])

.controller('createLocationsCtrl', [function() {



}]);