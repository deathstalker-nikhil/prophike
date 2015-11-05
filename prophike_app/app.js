angular.module('prophikeApp', [
  'ui.router',
  'prophikeApp.home',
  'prophikeApp.search',
  'prophikeApp.property',
  'footerDirective',
  'builderService',
  'commentsService',
  'locationsService',
  'propertiesService',
  'specificationsService',
  'unitsService',
  'userQueriesService',
  'headerDirective'
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
          templateUrl: '/prophike_app/disclaimer/disclaimerView.html',
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

.controller('appController',['$scope','$rootScope',function($scope,$rootScope){
  $scope.app = {};
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    switch(toState.name){
      case 'home':
        document.title = "Home | PropHike";
        break;
      case 'aboutUs':
        document.title = "About Us | PropHike";
        break;
      case 'privacyPolicy':
        document.title = "Privacy Policy | PropHike";
        break;
      case 'disclaimer':
        document.title = "Disclaimer | PropHike";
        break;
      case 'search':
        document.title = "Search | PropHike";
        break;
      case 'property':
        break;        
      default:
        break;
    }
  });
  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){
    if(toState != fromState){
      $('html,body').animate({scrollTop: 0},10);     
    }
    if (toState.name=='property') {$('body').css('padding-top','35px')}
    else {$('body').css('padding-top','0')}
  }); 
}]);


