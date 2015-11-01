angular.module('headerDirective', [])
.controller('headerController', ['$scope','properties', function($scope,properties) {
  properties.get({'where':'is_project_of_the_day=1','fields':'is_project_of_the_day,media,id,name,slug','per_page':1},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.projectOfTheDay = data.data[0];
      $scope.projectOfTheDay.media = ($scope.projectOfTheDay.media !='')?angular.fromJson($scope.projectOfTheDay.media):'';
    }else{
      $scope.projectOfTheDay = '';
    }
  });

}])

.directive('myHeader', function() {
  return {
    templateUrl: '/prophike_app/common_components/header_directive/headerTemplate.html'
  };
});