angular.module('footerDirective', [])
.controller('footerController', ['$scope','properties','locations','userQueries', function($scope,properties,locations,userQueries) {
  properties.get({'where':'is_hot_project=1','fields':'is_hot_project,id,name,slug','per_page':4},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.hotProperties = data.data;
    }       
  });

  properties.get({'fields':'id,name,slug','per_page':4},function(data,status){
    if(!angular.equals([],data.data)){         
      $scope.newProperties = data.data;
    }       
  });

  locations.get({limit:10000,'fields':'id,city'},function(data,status){
    if(!angular.equals([], data.data)){
      $scope.cities = data.data;
    } 
  });

  $scope.submitQuickQuery = function(form){
    if(form.$valid && form.$dirty){
      var quickQuery = $scope.quickQuery;
      quickQuery.quick_contact = 1;
      userQueries.save(quickQuery,function(data,status){
        if (status == 201) {
          $scope.quickQuery = {};
          alert('Query Saved. Will reach you soon quicky.');
          toggleQuickContact();
        }else{
          console.log(data);
        }       
      });
    }    
  };

}])

.directive('myFooter', function() {
  return {
    templateUrl: '/prophike_app/common_components/footer_directive/footerTemplate.html'
  };
});