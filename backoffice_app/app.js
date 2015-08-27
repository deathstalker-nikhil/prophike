'use strict';

// Declaring app level module which depends on views, and components

var backofficeApp = angular.module('backofficeApp', [
  'ngRoute',
  'backoffice.file_upload',
  'backofficeApp.locations',
  'backofficeApp.properties',
  'backofficeApp.user_comments',
  'backofficeApp.builder',
<<<<<<< HEAD
	'backofficeApp.specifications',
=======
  'backofficeApp.specifications',
>>>>>>> a1ec5217e3ef6297dcbac8439b2bbd9f8ecfb610
  'backofficeApp.headerDirective'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/locations'});
}])
