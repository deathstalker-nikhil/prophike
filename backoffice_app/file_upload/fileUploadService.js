'use strict';
angular.module('backoffice.file_upload').factory('uploadedFilesService',['$rootScope',function($rootScope) {
		var fileService = {};
		fileService.images = {};
		fileService.images.property = {
			const_update:[],
			thumb:[],
			cover:[],
			gallery:[]
		};
		fileService.images.specification = [];
		fileService.images.builder = [];
		fileService.save = function(obj,uploadedFor){
			switch(uploadedFor){
				case 'property':
							switch(obj.type){
								case 'const_update':
										fileService.images.property.const_update.push(obj.path);
									break;
								case 'thumb':
										fileService.images.property.thumb.push(obj.path);
									break;
								case 'cover':
										fileService.images.property.cover.push(obj.path);
									break;
								case 'gallery':
										fileService.images.property.gallery.push(obj.path);
									break;
							}
							$rootScope.$broadcast( 'upload.property.update');
					break;
				case 'specification':
							fileService.images.specification.push(obj);
							$rootScope.$broadcast( 'upload.specification.update');
					break;
				case 'builder':
							fileService.images.builder.push(obj);
							$rootScope.$broadcast( 'upload.builder.update');
					break;
			}
		};
		fileService.get = function(getFor){
			switch(getFor){
				case 'property':
					return fileService.images.property;
					break;
				case 'specification':
					return fileService.images.specification;
					break;
				case 'builder':
					return fileService.images.builder;
					break;
			}
		};

		return fileService;
}]);