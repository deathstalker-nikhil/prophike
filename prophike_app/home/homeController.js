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

.controller('homeController', ['$scope','$state','locations','properties', function ($scope,$state,locations,properties) {
  $scope.basicSearch = {};
  $scope.advancedSearch = {};
  var config = {
    items:4,
    autoPlay:true,
    stopOnHover:true
  };
  properties.get({'where':'is_hot_project=1','fields':'is_hot_project,media,id,name,slug','per_page':8},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.hotProperties = data.data;
    }       
    angular.forEach($scope.hotProperties, function(value, key){
      if(value.media != '')
        $scope.hotProperties[key].media = angular.fromJson(value.media);
    }); 
    setTimeout(function() {
      $("#hotProjects").owlCarousel(config);
      $(document).on('click','.suggestions li a',function(){
        $(this).closest('.suggestions').removeClass('showSuggestionsBox');
      });
    }, 300);
  });

  properties.get({'where':'is_best_investment_project=1','fields':'is_best_investment_project,media,id,name,slug','per_page':8},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.BIProperties = data.data;
    }       
    angular.forEach($scope.BIProperties, function(value, key){
      if(value.media != '')
        $scope.BIProperties[key].media = angular.fromJson(value.media);
    });
    setTimeout(function(){
      $("#bestInvestmentProjects").owlCarousel(config);
    },300);
  });

  properties.get({'fields':'media,id,name,slug','per_page':8},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.newProperties = data.data;
    }       
    angular.forEach($scope.newProperties, function(value, key){
      if(value.media != '')
        $scope.newProperties[key].media = angular.fromJson(value.media);
    });
    setTimeout(function(){
      $("#newlyLaunchedProjects").owlCarousel(config);
    },300);  
  });

  locations.get({limit:10000,'fields':'id,city'},function(data,status){
    if(!angular.equals([], data.data)){
      $scope.cities = data.data;
      $scope.basicSearch.city = $scope.cities[0].city;
      $scope.advancedSearch.city = $scope.cities[0].city;
    } 
  });  

  $scope.priceRanges = [{'id':1,'text':'Less than 30 Lakhs','min_val':0,'max_val':3000000,'is_checked':0},
                       {'id':2,'text':'Between 30 to 50 Lakhs','min_val':3000000,'max_val':5000000,'is_checked':0},
                       {'id':3,'text':'Between 50 to 80 Lakhs','min_val':5000000,'max_val':8000000,'is_checked':0},
                       {'id':6,'text':'More than 80 Crore','min_val':8000000,'max_val':10000000000,'is_checked':0}];

  $scope.unitTypes = [{'text':'2 BHK'},
                      {'text':'3 BHK'},
                      {'text':'4 BHK'},
                      {'text':'Studio Apartments'},
                      {'text':'Villa'},
                      {'text':'Plot'},
                      {'text':'Office Space'},
                      {'text':'Showrooms or Shops'},
                      {'text':'Hotels'}];
         
  $scope.BSearch = function(form){
    if(form.$valid){
      $state.go('search',{'where':'city in ('+$scope.basicSearch.city+')','query':$scope.basicSearch.query});
    }
  }

  $scope.ASearch = function(form){
    if(form.$valid){
      $state.go('search',{'where':'city in ('+$scope.advancedSearch.city+') and min_price between '+$scope.priceRanges[$scope.advancedSearch.price].min_val+' and '+$scope.priceRanges[$scope.advancedSearch.price].max_val,'query':$scope.advancedSearch.query,'units':$scope.advancedSearch.unit_type,'selectedPriceIds':$scope.priceRanges[$scope.advancedSearch.price].id});
    }
  }

  $scope.basicLiveSearch = function(){
    if($scope.basicSearch.query == ''){
      delete $scope.basicLiveSearchResult;
      $('.basicForm .suggestions').removeClass('showSuggestionsBox');
      return;
    }
    if( typeof basicSearching != "undefined") {
        clearTimeout(basicSearching);
    }
    basicSearching = setTimeout(function(){
      properties.get({'fields':'id,name,slug','per_page':8,'query':$scope.basicSearch.query,'where':'city in ('+$scope.basicSearch.city+')'},function(data,status){
        if(!angular.equals([],data.data)){       
          $scope.basicLiveSearchResult = data.data;
          $('.home .basicForm .suggestions').addClass('showSuggestionsBox');
        }else{
          $scope.basicLiveSearchResult = '';
        }
      });      
    }, 100);
  }

  $scope.advancedLiveSearch = function(){
    if($scope.advancedSearch.query == ''){
      delete $scope.advancedLiveSearchResult;
      $('.advancedForm .suggestions').removeClass('showSuggestionsBox');
      return;
    }
    if( typeof advancedSearching != "undefined") {
        clearTimeout(advancedSearching);
    }
    advancedSearching = setTimeout(function(){
      properties.get({'fields':'id,name,slug','per_page':8,'query':$scope.advancedSearch.query,'where':'city in ('+$scope.advancedSearch.city+') and min_price between '+$scope.priceRanges[$scope.advancedSearch.price].min_val+' and '+$scope.priceRanges[$scope.advancedSearch.price].max_val,'units':$scope.advancedSearch.unit_type},function(data,status){
        if(!angular.equals([],data.data)){       
          $scope.advancedLiveSearchResult = data.data;
          $('.home .advancedForm .suggestions').addClass('showSuggestionsBox');
        }else{
          $scope.advancedLiveSearchResult = '';
        }
      });      
    }, 100);
  }  

}]);