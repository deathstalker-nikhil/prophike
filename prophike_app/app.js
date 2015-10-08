angular.module('prophikeApp', [
  'ui.router',
  'prophikeApp.home',
  'prophikeApp.search',
  'prophikeApp.property',
  'contactDirective',
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
])

.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {
      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state("disclaimer", {
          url: "/disclaimer",
          templateUrl: '/prophike_app/disclaimer/disclaimerView.html'
        })

        .state('aboutUs',{
          url: "/about_us",
          templateUrl: '/prophike_app/about_us/aboutUsView.html'
        })

        .state('privacyPolicy',{
          url: "/privacy_policy",
          templateUrl: '/prophike_app/privacy_policy/privacyPolicyView.html'
        })        

      $locationProvider.html5Mode(true);   
    }
])