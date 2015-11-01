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
    if(toState.name == 'home'){
      $scope.app.mainClass = 'home';
      document.title = "Home | PropHike Real Estate Simplified";
    }else if(toState.name == 'aboutUs'){
      $scope.app.mainClass = 'aboutUs';
      document.title = "About Us | PropHike Real Estate Simplified";     
    }else if(toState.name == 'privacyPolicy'){
      $scope.app.mainClass = 'privacyPolicy';
      document.title = "Privacy Policy | PropHike Real Estate Simplified";       
    }else if(toState.name == 'disclaimer'){
      $scope.app.mainClass = 'disclaimer';
      document.title = "Disclaimer | PropHike Real Estate Simplified";        
    }else if(toState.name == 'search'){
      $scope.app.mainClass = "search";
      document.title = "Search | PropHike Real Estate Simplified";
    }else if(toState.name == 'property'){
      $scope.app.mainClass = "property";
    }
  });
  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){
    if(toState != fromState){
      $('html,body').animate({scrollTop: 0},10);     
    }
  }); 
}]);


