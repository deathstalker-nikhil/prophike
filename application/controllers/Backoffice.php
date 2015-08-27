<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Backoffice extends REST_Controller {

	public function __construct()
	{
		parent::__construct();	
		$this->load->library('auth_lib');
		$this->load->helper('url');
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
		$this->response(array('url' => '/backoffice'), 200);
	}

	public function logout_get()
	{
		$this->auth_lib->logout('backoffice/login');
	}	

	public function add_property_get()
	{
		$this->load->view('backoffice/add_property');
	}


	public function change_password_get()
	{
		$this->load->view('backoffice/change_password');
	}

	public function comments_get()
	{
		$this->load->view('backoffice/comments');
	}

	public function edit_property_get()
	{
		$this->load->view('backoffice/edit_property');
	}

	public function locations_get()
	{
		$this->load->view('backoffice/locations');
	}

	public function properties_get()
	{
		$this->load->view('backoffice/properties');
	}
}
