<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class UserQueries extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('user_queries_model','user_queries');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

		public function user_queries_get()
	{	
		$params = $this->get();
		$limit = ($this->get('per_page') && $this->get('per_page')>0 && $this->get('per_page') < 100? $this->get('per_page'):25);
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		$fields = ($this->get('fields')? $this->get('fields') : '*');
		// $where = preg_replace('/(?<!project_)(id)/', 'comments.id', $where);
		// $orderBy = preg_replace('/(?<!project_)(id)/', 'comments.id', $orderBy);		
		if(intval($id = $this->get('id')))
		{
			$data = $this->user_queries->get($id,1,$fields);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->user_queries->get('',$limit,$fields,$where,$orderBy), REST_Controller::HTTP_OK);
		}
		
	}

	public function user_queries_post()
	{
		$data = $this->_post_args;
		if(!isset($data['user_query'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		} 
		$result = $this->user_queries->create($data['user_query']);
		if(!$result['error']) {
			$data['user_query']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

public function user_queries_delete($id = '')
	{	
		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->user_queries->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function user_queries_put($id = '')
	{
		$data = $this->_put_args;
		if(!isset($data['user_query']) || $id == '') 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->user_queries->update($id,$data['user_query']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

}