<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Specifications extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('specifications_model','specifications');
		$this->rest_format = 'json';
		$this->load->library('auth_lib');
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

	public function specifications_get()
	{	
		$params = $this->get();
		$limit = ($this->get('per_page') && $this->get('per_page')>0 && $this->get('per_page') < 100? $this->get('per_page') : 25);
		$fields = ($this->get('fields')? $this->get('fields') : '*');		
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		if(intval($id = $this->get('id')))
		{
			$data = $this->specifications->get($id,1,$fields);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->specifications->get('',$limit,$fields,$where,$orderBy), REST_Controller::HTTP_OK);
		}
		
	}

	public function specifications_post()
	{
		if(!$this->auth_lib->auth()){
			$this->response(['error'=>'Unauthorized to perform this action'], REST_Controller::HTTP_BAD_REQUEST);
		}

		$data = $this->_post_args;
		if(!isset($data['specifications'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->specifications->create($data['specifications']);
		if(!$result['error']) {
			$data['specifications']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

	public function specifications_delete($id = '')
	{	
		if(!$this->auth_lib->auth()){
			$this->response(['error'=>'Unauthorized to perform this action'], REST_Controller::HTTP_BAD_REQUEST);
		}

		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->specifications->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function specifications_put($id = '')
	{
		if(!$this->auth_lib->auth()){
			$this->response(['error'=>'Unauthorized to perform this action'], REST_Controller::HTTP_BAD_REQUEST);
		}

		$data = $this->_put_args;
		if(!isset($data['specification']) || $id == '') 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->specifications->update($id,$data['specification']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

}