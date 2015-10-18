angular.module('prophikeApp.property', [
  'ui.router',
  'ngSanitize'
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
])

.config(['$stateProvider','$urlRouterProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {

      $stateProvider
        .state("property", {
          url: "/property/:slug",
          templateUrl: '/prophike_app/property/propertyView.html',
          controller:'propertyController'
        })

      $locationProvider.html5Mode(true);  
    }
  ]
)

.controller('propertyController', ['$scope','$stateParams','properties','$sce','builder','specifications','comments', function ($scope,$stateParams,properties,$sce,builder,specifications,comments) { 
  $scope.property = {};
  if($stateParams.slug != '')
    properties.get({'slug':$stateParams.slug},function(data,status){
      if(!angular.equals([],data.data)){          
        $scope.property = data.data[0];
        if($scope.property.data != '')
          $scope.property.data = angular.fromJson($scope.property.data);
        if($scope.property.media != '')
          $scope.property.media = angular.fromJson($scope.property.media);
        $scope.property.data.price_list = $sce.trustAsHtml($scope.property.data.price_list);
        $scope.property.data.payment_plan = $sce.trustAsHtml($scope.property.data.payment_plan);
        $scope.property.data.google_map_code = $('<textarea />').html($scope.property.data.google_map_code).text();
        $scope.property.data.google_map_code = $sce.trustAsHtml($scope.property.data.google_map_code);
        $scope.property.data.features = $sce.trustAsHtml($scope.property.data.features);
        if($scope.property.possession == "0"){$scope.property.possession_text = "Ready to move in"}
        if($scope.property.possession == "3"){$scope.property.possession_text = "0 to 6 months"}
        if($scope.property.possession == "9"){$scope.property.possession_text = "6 to 12 months"}
        if($scope.property.possession == "18"){$scope.property.possession_text = "1 to 2 years"}
        if($scope.property.possession == "36"){$scope.property.possession_text = "Greater than 2 years"} 
        builder.get({'id':$scope.property.builder_id},function(data,status){
          if(status == 200){
              $scope.builder = data.data[0];
              if($scope.builder.logo_link != '')
                $scope.builder.logo_link = angular.fromJson($scope.builder.logo_link);
              else{
                $scope.builder.logo_link = {'logo':[]};
              }
          }else{
            console.log(data);  
          }
        }); 
        if(angular.isDefined($scope.property.data.specifications) && !angular.equals([],$scope.property.data.specifications))
          specifications.get({'where':'id in ('+$scope.property.data.specifications.join(',')+')'},function(data,status){
            if(!angular.equals([],data.data)){   
              $scope.specifications= data.data;
              angular.forEach($scope.specifications,function(value,key){
                if(value.icon_path != '')
                  $scope.specifications[key].icon_path = angular.fromJson(value.icon_path);
                else{
                  $scope.specifications[key].icon_path = {'logo':[]};
                }
              });
            }
          });                      
        comments.get({'where':'comments.project_id='+$scope.property.project_id+' and comments.is_approved=1','fields':'user_name,user_comment'},function(data,status){
          if(!angular.equals([],data.data)){    
            $scope.comments = data.data;
          }
        });         
        setInterval(function(){
          $('.priceList').find('table').addClass('table table-bordered table-striped table-condensed');
          $('.paymentList').find('table').addClass('table table-bordered table-striped table-condensed');
          $('iframe').attr('width','100%');
          $('iframe').attr('height','450px');   
          $('section').css('padding-bottom','15px');          
          jQuery('#light-gallery').lightGallery(); 
        }, 500);
      }
    });
}])