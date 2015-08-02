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
		$this->response($this->locations->get(), REST_Controller::HTTP_OK);
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

}