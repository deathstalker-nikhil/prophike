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
		$possessions = ($this->get('possessions')?explode(',',$this->get('possessions')):'');
		$allProjects = ($this->get('get_all_projects') && $this->get('get_all_projects') == 1)?true:false;
		$orderBy = ($this->get('order_by')? $this->get('order_by') : 'id DESC');
		$fields = ($this->get('fields')? $this->get('fields') : '*');
		$slug =($this->get('slug'))?$this->get('slug'):'';
		$where = str_replace (array('possession'),$this->tableFields,$where);
		$where = preg_replace('/(min_price.+and [0-9,]+)/', '($1)', $where);
		$getFor = preg_replace('/id/', 'projects.project_id', $getFor);
		$orderBy = preg_replace('/id/', 'projects.project_id', $orderBy);
		$possessionsArray = [['id'=>1,'min_val'=>0,'max_val'=>0],
												['id'=>2,'min_val'=>1,'max_val'=>6],
												['id'=>3,'min_val'=>7,'max_val'=>12],
												['id'=>4,'min_val'=>13,'max_val'=>24],
												['id'=>5,'min_val'=>25,'max_val'=>5000]];
		$possessionsQuery = '(';
		foreach ($possessionsArray as $key => $value) {
			if($possessions == ''){break;}
			if(in_array($value['id'],$possessions)){
				if($possessionsQuery == '('){
					$possessionsQuery .='TIMESTAMPDIFF(MONTH,NOW(),possession) BETWEEN '.$value['min_val'].' AND '.$value['max_val'];
				}else{
					$possessionsQuery .=' OR TIMESTAMPDIFF(MONTH,NOW(),possession) BETWEEN '.$value['min_val'].' AND '.$value['max_val'];
				}
			}
		}
		$possessionsQuery .= ' )';
		if($possessionsQuery =='( )'){$possessionsQuery = '';}
		if(intval($id = $this->get('id')))
		{
			$data = $this->properties->get($id,1,$fields,$allProjects);
			if(!$data){
				$this->response(['error'=>'Invalid Id'],REST_Controller::HTTP_NOT_FOUND);
			}else{
				$this->response($data,REST_Controller::HTTP_OK);
			}
		}else{
			$this->response($this->properties->get('',$limit,$fields,$allProjects,$getFor,$where,$orderBy,$units,$query,$slug,$possessionsQuery), REST_Controller::HTTP_OK);
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