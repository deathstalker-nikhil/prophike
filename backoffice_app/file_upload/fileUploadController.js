'use strict';
angular.module('backoffice.file_upload', ['angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload/:type/:id', {
    templateUrl: 'backoffice_app/file_upload/fileUploadView.html',
    controller: 'fileUploadCtrl'
  });
}])

.controller('fileUploadCtrl', ['$scope', 'FileUploader','$routeParams','properties','builder','specifications','units', function($scope, FileUploader,$routeParams,properties,builder,specifications,units) {
    $scope.type = $routeParams.type;
    $scope.enableSave = true;
    var images = {};
    $scope.id = $routeParams.id;
    switch($scope.type){
        case 'property': $scope.subTypes = ['const_update','thumb','cover','gallery'];
                         $scope.app.state = 'properties';
                         images.property = {
                            'const_update':[],
                            'cover':[],
                            'thumb':[],
                            'gallery':[]
                         };
                        properties.get({id:$scope.id,'fields':'project_id as id,name,media','get_all_projects':1},function(data,status){
                            if(!angular.equals([],data.data)){
                                if(data.data[0].media)
                                    images = angular.fromJson(data.data[0].media);
                            }
                        });
                        break;
        case 'specification': $scope.subTypes = ['specification_logo'];
                              $scope.app.state = 'specifications';
                              images.logo = [];
                                specifications.get({id:$scope.id,'fields':'id,name,icon_path'},function(data,status){
                                    if(!angular.equals([],data.data)){
                                        if(data.data[0].icon_path)
                                            images = angular.fromJson(data.data[0].icon_path);
                                    }
                                });
                              break;
        case 'builder': $scope.subTypes = ['builder_logo'];
                        $scope.app.state = 'builders';
                        images.logo = [];
                        builder.get({id:$scope.id,'fields':'id,builder_name,logo_link'},function(data,status){
                            if(!angular.equals([],data.data)){
                                if(data.data[0].logo_link)
                                    images = angular.fromJson(data.data[0].logo_link);
                            }
                        });                        
                        break;
        case 'unit': $scope.subTypes = ['unit'];
                        $scope.app.state = 'properties';
                        images.img = [];
                        units.get({id:$scope.id,'fields':'id,unit_name,image_path'},function(data,status){
                            if(!angular.equals([],data.data)){
                                if(data.data[0].image_path)
                                    images = angular.fromJson(data.data[0].image_path);
                            }
                        });                        
                        break;
    }
    if(typeof($scope.subTypes) == 'undefined'){
        alert('Incorrect Url');
        window.history.back();
    }else{    
        $scope.subtype = $scope.subTypes[0];
    }
    var uploader = $scope.uploader = new FileUploader({
        url: '/file/do_upload'
    });
    uploader.formData.push({type:$scope.subtype});
    $scope.setData = function(){
      uploader.formData[0] = {type:$scope.subtype};
    };
    uploader.formData.push({csrf_token:document.cookie.replace(/(?:(?:^|.*;\s*)csrf_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1")});
    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|pdf|'.indexOf(type) !== -1;
        }
    });
    $scope.goback = function(){
        switch($scope.type){
            case 'property': window.location = '/backoffice#/properties/media/'+$scope.id;
            break;
            case 'builder': window.location = '/backoffice#/builder/media/'+$scope.id;
            break;
            case 'specification': window.location = '/backoffice#/specification/media/'+$scope.id;
            break;
            case 'unit' : window.location = '/backoffice#/units/media/'+$scope.id;            
        };
    }
    $scope.saveImages = function(){
        switch($scope.type){
            case 'property': 
                properties.update({'project_id':$scope.id,'media':angular.toJson(images)},function(data,status){
                    if(status == 204){
                        alert('Saved :)');
                        $scope.goback();
                    }
                });  
            break;
            case 'builder': 
                builder.update({'id':$scope.id,'logo_link':angular.toJson(images)},function(data,status){
                    if(status == 204){
                        alert('Saved :)');
                        $scope.goback();
                    }
                });  
            break;
            case 'specification': 
                specifications.update({'id':$scope.id,'icon_path':angular.toJson(images)},function(data,status){
                    if(status == 204){
                        alert('Saved :)');
                        $scope.goback();
                    }
                });  
            break;
            case 'unit': 
                units.update({'id':$scope.id,'image_path':angular.toJson(images)},function(data,status){
                    if(status == 204){
                        alert('Saved :)');
                        $scope.goback();
                    }
                });  
            break;            
        };        
    }
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
            $scope.enableSave = false;
            images.type = $scope.type;
            switch(response.type){
                case 'const_update':
                        images.property.const_update.push(response.path);
                    break;
                case 'thumb':
                        images.property.thumb.push(response.path);
                    break;
                case 'cover':
                        images.property.cover.push(response.path);
                    break;
                case 'gallery':
                        images.property.gallery.push(response.path);
                    break;
                case 'specification_logo':
                        images.logo.push(response.path);
                    break;
                case 'builder_logo':
                        images.logo.push(response.path);
                    break;
                case 'unit' :
                        images.img.push(response.path);
                    break;
            }     
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