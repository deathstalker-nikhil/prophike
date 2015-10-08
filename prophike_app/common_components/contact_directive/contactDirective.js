angular.module('contactDirective', [])
.controller('contactController', ['$scope', function($scope) {
  $('#contact-wrapper').stickyfloat({ duration: 400, cssTransition: true, offsetY:100}); //stickyfloat contact form
  $(document).on('click','#contact-btn',function() { //smoothly slide open/close form
    var floatbox = $("#floating-contact-wrap");
    if (floatbox.hasClass('visiable')){
      floatbox.animate({"right":"-340px"}, "fast").removeClass('visiable');
    }else{
      floatbox.animate({"right":"0px"}, "fast").addClass('visiable');
    }
  });
}])
.directive('contactUs', function() {
  return {
    templateUrl: '/prophike_app/common_components/contact_directive/contactTemplate.html'
  };
});