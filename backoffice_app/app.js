'use strict';

// Declaring app level module which depends on views, and components

var backofficeApp = angular.module('backofficeApp', [
  'ngRoute',
  'backoffice.file_upload',
  'backofficeApp.locations',
  'backofficeApp.properties',
  'backofficeApp.comments',
  'backofficeApp.builder',
  'backofficeApp.specifications',
  'backofficeApp.changePassword',
  'builderService',
  'commentsService',
  'locationsService',
  'propertiesService',
  'specificationsService',
  'unitsService'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/locations'}); 
}])
