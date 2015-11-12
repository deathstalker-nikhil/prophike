<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';


class Backoffice extends REST_Controller {

	public function __construct()
	{
		parent::__construct();	
		$this->load->library('auth_lib');
		$this->load->helper('url');
		$config['assets_dir'] = 'assets/';  
		$config['css_dir'] = FCPATH;
		$config['js_dir'] = FCPATH;		
		$this->load->library('minify',$config);		
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];		
	}

	public function index_get()
	{
		$this->auth_lib->auth('backoffice/login');
		$this->load->view('backoffice/index');
	}

	public function login_get()
	{
		if($this->auth_lib->auth())
			redirect(base_url().'backoffice','refresh');
		$csrf = array(
	        'name' => $this->security->get_csrf_token_name(),
	        'hash' => $this->security->get_csrf_hash()
		);
		$data['csrf'] = $csrf;
		$this->load->view('backoffice/login',$data);
	}

	public function doLogin_post()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		if (!$username || !$password) {
			$this->response(array('error' => 'Incomplete Credentials'), 401);
		}
		if (!$this->auth_lib->doLogin($username,$password)){
			$this->response(array('error' => 'Incorrect username or password'), 400);
		}
		$this->response(array('url' => '/backoffice#/locations'), 200);
	}

	public function logout_get()
	{
		$this->auth_lib->logout('backoffice/login');
	}

	public function changePassword_post(){
		$params = $this->post();
		if(!isset($params['oldPwd']) || !isset($params['newPwd']) || $params['oldPwd'] == '' || $params['newPwd'] == ''){
			$this->response(array('error'=>'Insufficient Data given'), 400);	
		}else{
			$this->load->model('user_model','user');
			if(!$this->user->isValidUser('admin','admin@prophike.com',$params['oldPwd'])){
				$this->response(array('error'=>'Wrong password given'), 400);
			}
			$response = $this->user->updatePassword('admin@prophike.com',$params['newPwd']); 
			if($response['error']){
				$this->response(array('error'=>$response['msg']),400);
			}else{
				$this->response('',204);
			}
		}
	}

	public function reconstructAssets_get()
	{
		$this->minify->css_file = 'backofficeApp.min.css';
		$this->minify->js_file = 'backofficeApp.min.js';
		$this->minify->css(array('backoffice_app/app.css'));
		$this->minify->js(array(
			'backoffice_app/app.js',
			'backoffice_app/file_upload/fileUploadController.js',
			'backoffice_app/file_upload/fileUploadService.js',
		  'backoffice_app/file_upload/components/previewDirective.js',
		  'backoffice_app/locations/locationsController.js',
		  'backoffice_app/locations/locationsService.js',
		  'backoffice_app/builder/builderController.js',
		  'backoffice_app/builder/builderService.js',
		  'backoffice_app/builder/media/builderMediaController.js',
		  'backoffice_app/builder/create/createBuilderController.js',
		  'backoffice_app/specifications/specificationsController.js',
		  'backoffice_app/specifications/specificationsService.js',
		  'backoffice_app/specifications/media/specificationMediaController.js',
		  'backoffice_app/specifications/create/createSpecificationController.js',
		  'backoffice_app/locations/create/createLocationController.js',
		  'backoffice_app/locations/edit/editLocationController.js',
		  'backoffice_app/builder/edit/editBuilderController.js',
		  'backoffice_app/properties/propertiesController.js',
		  'backoffice_app/properties/propertiesService.js',
		  'backoffice_app/properties/create/createPropertyController.js',
		  'backoffice_app/properties/edit/editPropertyController.js',
		  'backoffice_app/properties/view/propertiesViewController.js',
		  'backoffice_app/properties/units/unitsController.js',
		  'backoffice_app/properties/units/unitsService.js',
		  'backoffice_app/properties/units/create/createUnitController.js',
		  'backoffice_app/properties/units/edit/editUnitController.js',
		  'backoffice_app/properties/media/mediaController.js',
		  'backoffice_app/properties/units/media/mediaController.js',
		  'backoffice_app/components/ckeditor/ckEditorDirective.js',
		  'backoffice_app/comments/commentsController.js',
		  'backoffice_app/comments/commentsService.js',
		  'backoffice_app/change_password/changePsswdController.js',
		  'backoffice_app/user_queries/userQueriesController.js',
		  'backoffice_app/user_queries/userQueriesService.js'
		)); 
		$this->minify->deploy_css(TRUE);
		$this->minify->deploy_js(TRUE);
	}	
}
