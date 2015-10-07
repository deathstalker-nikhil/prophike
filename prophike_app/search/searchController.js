angular.module('prophikeApp.search', [
  'ui.router'
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
])

.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {

      $stateProvider
        .state("search", {
          url: "/search",
          templateUrl: '/prophike_app/search/searchView.html',
          controller:'searchController'
        })

      $locationProvider.html5Mode(true);  
    }
  ]
)

.controller('searchController', ['$scope', function ($scope) {
          
}])