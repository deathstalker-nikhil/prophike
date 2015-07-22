'use strict';

angular.module('backofficeApp.comments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/comments', {
    templateUrl: 'backoffice_app/comments/comments.html',
    controller: 'commentsCtrl'
  });
}])

.controller('commentsCtrl', [function() {

}]);