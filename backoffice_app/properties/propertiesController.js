'use strict';

angular.module('backofficeApp.properties', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties', {
    templateUrl: 'backoffice_app/properties/properties.html',
    controller: 'propertiesCtrl'
  });
}])

.controller('propertiesCtrl', [function() {

}]);