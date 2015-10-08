angular.module('prophikeApp.property', [
  'ui.router'
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
])

.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {

      $stateProvider
        .state("property", {
          url: "/property",
          templateUrl: '/prophike_app/property/propertyView.html',
          controller:'propertyController'
        })

      $locationProvider.html5Mode(true);  
    }
  ]
)

.controller('propertyController', ['$scope', function ($scope) {
  $("#light-gallery").lightGallery();      
  $('section').css('padding-bottom','15px');
}])