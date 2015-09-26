<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Backoffice extends REST_Controller {

	public function __construct()
	{
		parent::__construct();	
		$this->load->library('auth_lib');
		$this->load->helper('url');
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
}
