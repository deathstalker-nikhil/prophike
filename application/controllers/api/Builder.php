<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Builder extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('builder_model','builder');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

	public function builder_get()
	{	
		$params = $this->get();
		$limit = ($this->get('limit') && $this->get('limit')>0? $this->get('limit') : 10);
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		if(intval($id = $this->get('id')))
		{
			$data = $this->builder->get($id,1);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->builder->get('',$limit,$where,$orderBy), REST_Controller::HTTP_OK);
		}
		
	}

	public function builder_post()
	{

		$data = $this->_post_args;
		if(!isset($data['builder'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->builder->create($data['builder']);
		if(!$result['error']) {
			$data['builder']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

	public function builder_delete($id = '')
	{	
		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->builder->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function builder_put($id = '')
	{
		$data = $this->_put_args;
		if(!isset($data['builder']) || $id == '') 
		{
			$this->response(['error'=>'Incomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->builder->update($id,$data['builder']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}
/*
	public function pagination_get()
	{
		$data = $this->get();
		if(!isset($data['limit']) || $data['limit'] > 0){
			$result = $this->locations->rowsCount();
			$this->response(['total' => $result['total'],'last_id' => $result['last_id'],'pages' => ceil($result['total']/$data['limit']),'first_id'=>$result['first_id']], REST_Controller::HTTP_OK);
		}
	}

	*/

}