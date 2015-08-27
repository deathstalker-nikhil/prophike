'use strict';
angular.module('backoffice.file_upload', ['angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {
    templateUrl: 'backoffice_app/file_upload/fileUploadView.html',
    controller: 'fileUploadCtrl'
  });
}])

.controller('fileUploadCtrl', ['$scope', 'FileUploader','uploadedFilesService', function($scope, FileUploader,uploadedFilesService) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/file/do_upload'
    });
    $scope.type = 'const_update';
    $scope.uploadedFor = 'property';
    $scope.setData = function(){
      uploader.formData.push({type:$scope.type});  
    };
    uploader.formData.push({type:$scope.type});
    uploader.formData.push({csrf_token:document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1")});
    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|pdf|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        alert('adding file failed');
        // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        // console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        // console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        // console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        // console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        // console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        // console.info('onSuccessItem', fileItem, response, status, headers);
        if(response.error){
            alert(response.error);
            fileItem.remove();
        }else{
            uploadedFilesService.save({path:response.path,type:response.type},$scope.uploadedFor);
        }
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        if(status == 403){
            alert('File not uploaded to server ( can be due to file size too big )');
        }
        // console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        // console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        // console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        // console.info('onCompleteAll');
    };
    // console.info('uploader', uploader);
}]);