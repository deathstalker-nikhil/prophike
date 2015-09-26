'use strict';

// Declaring app level module which depends on views, and components

var backofficeApp = angular.module('backofficeApp', [
  'ngRoute',
  'backoffice.file_upload',
  'backofficeApp.locations',
  'backofficeApp.properties',
  'backofficeApp.user_comments',
  'backofficeApp.builder',
  'backofficeApp.specifications',
  'backofficeApp.headerDirective'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/locations'});
}])
