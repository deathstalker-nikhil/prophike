<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Locations extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('locations_model','locations');
		$this->rest_format = 'json';
		$this->allowed_http_methods = ['get', 'delete', 'post', 'put'];
	}

	public function cities_get()
	{
		$params = $this->get();
		$limit = ($this->get('per_page') && $this->get('per_page')>0 && $this->get('per_page') < 100? $this->get('per_page') : 25);
		$fields = ($this->get('fields')? $this->get('fields') : '*');
		$where = ($this->get('where')? $this->get('where') : 'id>0');
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		if(intval($id = $this->get('id')))
		{
			$data = $this->locations->get($id,1,$fields);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->locations->get('',$limit,$fields,$where,$orderBy), REST_Controller::HTTP_OK);
		}
	}

	public function cities_post()
	{
		$data = $this->_post_args;
		if(!isset($data['location'])) 
		{
			$this->response(['error'=>'Imcomplete Data'], REST_Controller::HTTP_BAD_REQUEST);
		}
		$data['location']['areas'] =  json_encode($data['location']['areas']);
		$result = $this->locations->create($data['location']);
		if(!$result['error']) {
			$data['location']['id'] = $result['id'];
			$this->response($data, REST_Controller::HTTP_CREATED);
		}
		else
			$this->response($result['msg'], REST_Controller::HTTP_BAD_REQUEST);
	}

	public function cities_delete($id = '')
	{	
		if($id == '')
		{
			$this->response(['error'=>'No Id given'], REST_Controller::HTTP_BAD_REQUEST);
		}
		if($this->locations->delete($id)){
			$this->response(true,REST_Controller::HTTP_OK);
		}
		else{
			$this->response(['error'=>'Some error occured'],REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

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

}