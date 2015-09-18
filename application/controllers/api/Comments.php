<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Comments extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('comments_model','comments');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

		public function comments_get()
	{	
		$params = $this->get();
		$limit = ($this->get('per_page') && $this->get('per_page')>0 && $this->get('per_page') < 100? $this->get('per_page'):10);
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		$fields = ($this->get('fields')? $this->get('fields') : '*');
		$where = preg_replace('/id/', 'comments.id', $where);
		$orderBy = preg_replace('/id/', 'comments.id', $orderBy);		
		if(intval($id = $this->get('id')))
		{
			$data = $this->comments->get($id,1,$fields);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->comments->get('',$limit,$fields,$where,$orderBy), REST_Controller::HTTP_OK);
		}
		
	}

	public function comments_post()
	{
		$data = $this->_post_args;
		if(!isset($data['comment'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		} 
		$result = $this->comments->create($data['comment']);
		if(!$result['error']) {
			$data['comment']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

public function comments_delete($id = '')
	{	
		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->comments->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function comments_put($id = '')
	{
		$data = $this->_put_args;
		if(!isset($data['comment']) || $id == '') 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$result = $this->comments->update($id,$data['comment']);
		if(!$result['error']) {
			$this->response(TRUE, REST_Controller::HTTP_NO_CONTENT);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

	public function tableInfo_get()
	{
		$result = $this->comments->rowsCount();
		$this->response(['total' => $result['total'],'last_id' => $result['last_id'],'first_id'=>$result['first_id']], REST_Controller::HTTP_OK);
	}	

}