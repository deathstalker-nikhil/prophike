<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Properties extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('properties_model','properties');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
		$this->tableFields = array('projects.possession');
	}

	public function projects_get()
	{
		$params = $this->get();
		$limit = ($this->get('per_page') && $this->get('per_page')>0 && $this->get('per_page') < 100? $this->get('per_page'):25);
		$where = ($this->get('where')? $this->get('where') : '');
		$units = ($this->get('units')? $this->get('units') : '');
		$query = ($this->get('query')? $this->get('query') : '');
		$getFor = ($this->get('get_for')?$this->get('get_for'):'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		$fields = ($this->get('fields')? $this->get('fields') : '*');
		$where = str_replace (array('possession'),$this->tableFields,$where);
		$where = preg_replace('/(min_price.+and [0-9,]+)/', '($1)', $where);
		$getFor = preg_replace('/id/', 'projects.project_id', $getFor);
		$orderBy = preg_replace('/id/', 'projects.project_id', $orderBy);
		if(intval($id = $this->get('id')))
		{
			$data = $this->properties->get($id,1,$fields);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->properties->get('',$limit,$fields,$getFor,$where,$orderBy,$units,$query), REST_Controller::HTTP_OK);
		}
	}

	public function projects_post()
	{
		$data = $this->_post_args;
		if(!isset($data['property'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$data['property']['data'] = (isset($data['property']['data']))?json_encode($data['property']['data']):''; 
		$result = $this->properties->create($data['property']);
		if(!$result['error']) {
			$data['property']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

	public function projects_delete($id = '')
	{	
		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->properties->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function projects_put($id = '')
	{
		$data = $this->_put_args;
		if(!isset($data['property']) || $id == '') 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if(isset($data['property']['data'])){
			$data['property']['data'] = json_encode($data['property']['data']);
		}
		$result = $this->properties->update($id,$data['property']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

}