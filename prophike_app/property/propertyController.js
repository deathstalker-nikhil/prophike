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

.controller('propertyController', ['$scope','$stateParams','properties','$sce','builder','specifications','comments','units','userQueries', function ($scope,$stateParams,properties,$sce,builder,specifications,comments,units,userQueries) { 
  $scope.property = {};
  if($stateParams.slug != '')
    properties.get({'slug':$stateParams.slug},function(data,status){
      if(!angular.equals([],data.data)){          
        $scope.property = data.data[0];
        $scope.property.possession = new Date($scope.property.possession);
        document.title = $scope.property.name+" | PropHike Real Estate Simplified";
        if($scope.property.data != '')
          $scope.property.data = angular.fromJson($scope.property.data);
        if($scope.property.media != ''){
          $scope.property.media = angular.fromJson($scope.property.media);
        }else{
          $scope.property.media = {};
          $scope.property.media.property = {};
          $scope.property.media.property.gallery = [];
        }
        if(angular.equals($scope.property.media.property.gallery,[])){$scope.property.media.property.gallery=''};
        $scope.property.data.price_list = $sce.trustAsHtml($scope.property.data.price_list);
        $scope.property.data.payment_plan = $sce.trustAsHtml($scope.property.data.payment_plan);
        $scope.property.data.google_map_code = $('<textarea />').html($scope.property.data.google_map_code).text();
        $scope.property.data.google_map_code = $sce.trustAsHtml($scope.property.data.google_map_code);
        if($scope.property.data.google_map_code == ''){
          $scope.hideGMap = true;
        }
        $scope.property.data.features = $sce.trustAsHtml($scope.property.data.features);
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
        $scope.specifications = '';
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
          }else{
            $scope.comments = '';
          }
        });         
        $scope.units = '';
        units.get({where:'p_id='+$scope.property.project_id},function(data,status){
          if(!angular.equals([],data.data)){    
            $scope.units = data.data;
            angular.forEach($scope.units,function(value,key){
              if(value.image_path != '')
                $scope.units[key].image_path = angular.fromJson(value.image_path);
              else{
                $scope.units[key].image_path = {'img':[]};
              }
              if(value.unit_price < 100000){
                $scope.units[key].unit_price_value = value.unit_price/1000;
                $scope.units[key].unit_price_unit_value = 'Thousand';
              }else if(value.unit_price < 10000000){
                $scope.units[key].unit_price_value = value.unit_price/100000;
                $scope.units[key].unit_price_unit_value = 'Lakhs';
              }else{
                $scope.units[key].unit_price_value = value.unit_price/10000000;
                $scope.units[key].unit_price_unit_value = 'Crore';
              } 
              if(angular.isDefined(value.unit_details) && value.unit_details!=''){
                $scope.units.unit_details = $sce.trustAsHtml(value.unit_details);           
              }
            });            
          }   
        });        
        setInterval(function(){
          $('#priceList').find('table').addClass('table table-bordered table-striped table-condensed');            
          $("#lightgallery").lightGallery();
          $('body').scrollspy({ target: '#navigationMenu' });
        }, 700);
          $('a[href^="#"]').on('click',function (e) {
              e.preventDefault();
              var target = this.hash,
                  $target = $(target);
              $('html, body').stop().animate({
                  'scrollTop': $target.offset().top
              }, 900, 'swing', function () {
                  // window.location.hash = target;
              });
          });          
      }
    });
  $scope.submitComment = function(form){
    if(form.$valid && form.$dirty){
      $scope.comment.project_id = $scope.property.project_id;
      comments.save($scope.comment,function(data,status){
        if(status == 201){
          alert('Comment saved for review');
          $scope.comment = {};
        }else{
          console.log(data);
        }
      });
    }
  };  

  $scope.submitQuery = function(form){
    if(form.$valid && form.$dirty){
      var query = $scope.query;
      query.p_id = $scope.property.project_id;
      userQueries.save(query,function(data,status){
        if (status == 201) {
          $scope.query = {};
          alert('Query Saved. Will reach you soon quicky.');
        }else{
          console.log(data);
        }       
      });
    }    
  }
}])