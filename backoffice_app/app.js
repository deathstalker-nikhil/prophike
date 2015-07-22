'use strict';

// Declaring app level module which depends on views, and components

var backofficeApp = angular.module('backofficeApp', [
  'ngRoute',
  'backofficeApp.locations',
  'backofficeApp.properties',
  'backofficeApp.comments',
  'backofficeApp.headerDirective'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/locations'});
}]);