<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Specifications extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('specifications_model','specifications');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

	public function specifications_get()
	{	
		$params = $this->get();
		$limit = ($this->get('limit') && $this->get('limit')>0? $this->get('limit') : 10);
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		if(intval($id = $this->get('id')))
		{
			$data = $this->specifications->get($id,1);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->specifications->get('',$limit,$where,$orderBy), REST_Controller::HTTP_OK);
		}
		
	}

	public function specifications_post()
	{

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
/*
	public function cities_put($id = '')
	{
		$data = $this->_put_args;
		if(!isset($data['location']) || $id == '') 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$data['location']['areas'] =  json_encode($data['location']['areas']);
		$result = $this->locations->update($id,$data['location']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

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