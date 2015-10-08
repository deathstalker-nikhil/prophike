angular.module('prophikeApp.home', [
  'ui.router'
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
])

.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: '/prophike_app/home/homeView.html',
          controller:'homeController'
        })

      $locationProvider.html5Mode(true);  
    }
  ]
)

.controller('homeController', ['$scope', function ($scope) {
    var owl1 = $("#owl-demo1");
    owl1.owlCarousel({
        items : 4, //10 items above 1000px browser width
        itemsDesktop : [1000,5], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,2], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });

    // Custom Navigation Events
    $(".next1").click(function(){
      owl1.trigger('owl.next');
    })
    $(".prev1").click(function(){
      owl1.trigger('owl.prev');
    })
    var owl2 = $("#owl-demo2");
    owl2.owlCarousel({
        items : 4, //10 items above 1000px browser width
        itemsDesktop : [1000,5], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,2], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });

    // Custom Navigation Events
    $(".next2").click(function(){
      owl2.trigger('owl.next');
    })
    $(".prev2").click(function(){
      owl2.trigger('owl.prev');
    })
    var owl3 = $("#owl-demo3");
    owl3.owlCarousel({
        items : 4, //10 items above 1000px browser width
        itemsDesktop : [1000,5], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,2], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });
   
    // Custom Navigation Events
    $(".next3").click(function(){
      owl3.trigger('owl.next');
    })
    $(".prev3").click(function(){
      owl3.trigger('owl.prev');
    })          
}])