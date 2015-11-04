<?php 

class Properties_model extends CI_Model {

	private $db_debug;

	public function __construct()
	{
	    parent::__construct();
	    $this->db_debug = $this->db->db_debug;
	}

	/*
		Creates a new entry in the collection.
		returns an array with structure
		error['code'] - int 
		error['msg'] - string
	*/
	public function create($data)
	{
		$this->db->db_debug = false;
		$this->db->insert('projects', $data);
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ( $error['code'] == 0 ){
			return ['error'=>false,'msg'=>'','id'=>$this->db->insert_id()];
		}
		else{
			return ['error'=>true,'msg'=>$error['message']];
		}
	}

	public function get($id = '',$limit = 10,$fields,$allProjects,$getFor='',$where = '' ,$orderBy = 'id DESC',$units = '',$query='',$slug = '',$possessionsQuery = '')
	{
		$this->db->db_debug = false;
		if ($id != '' || $slug != '')
		{
			$this->db->select($fields);
			if($id != '')
				$this->db->where(array('project_id' => $id));
			else if($slug != '')
				$this->db->where(array('slug'=>$slug));
			if($allProjects){
				$this->db->where('is_live IN (0,1)');
			}else{
				$this->db->where(array('is_live'=>1));
			}
			$query = $this->db->get('projects',$limit);
		}
		else
		{
			preg_match ( '/city in \(([a-zA-Z,\s-_]+)\)/' ,$where, $matches);
			if($matches != []){
				$matches[1] = explode(',',$matches[1]); 
				foreach ($matches[1] as $key => $value) {
					$matches[1][$key] = "'$value'";		
				}
				$matches[1] = implode($matches[1],',');
				$where = preg_replace('/city in \([a-zA-Z,\s-_]+\)/','city in ('.$matches[1].')',$where);
			}		
			$this->db->select($fields);
			if($units != ''){
				$units = explode(',',$units);
				$x = '';
				foreach ($units as $key => $value) {
					$x .= "'$value',";
				}
				$x = substr($x,0,-1);
				if($where == ''){
					$where .= '( projects.project_id in (SELECT DISTINCT `p_id` FROM `units` WHERE `unit_type` IN ('.$x.')) OR property_type in ('.$x.'))';
				}else{
					$where .= ' AND (projects.project_id in (SELECT DISTINCT `p_id` FROM `units` WHERE `unit_type` IN ('.$x.')) OR property_type in ('.$x.'))';	
				}
			}
			if($query != ''){
				if($where != '')
					$where .= ' AND (name LIKE \'%'.$query.'%\' OR city LIKE \'%'.$query.'%\' OR area LIKE \'%'.$query.'%\' OR address LIKE \'%'.$query.'%\' ) ';
				else
					$where .= ' (name LIKE \'%'.$query.'%\' OR city LIKE \'%'.$query.'%\' OR area LIKE \'%'.$query.'%\' OR address LIKE \'%'.$query.'%\' ) '; 
			}
			if($where != '')
				$x = $where.' and '.$getFor;
			else
				$x = $getFor;
			$this->db->where($x);
			if($possessionsQuery != ''){
				$this->db->where($possessionsQuery);
			}
			if($allProjects){
				$this->db->where('is_live IN (0,1)');
			}else{
				$this->db->where(array('is_live'=>1));
			}			
			$this->db->order_by($orderBy);
			$this->db->join('builders', 'builders.id = projects.builder_id');
			$query = $this->db->get('projects', $limit);
		} 
		$first_id = 0;
		$last_id =0;
		if($where != '')
			$this->db->where($where);
		if($allProjects){
			$this->db->where('is_live IN (0,1)');
		}else{
			$this->db->where(array('is_live'=>1));
		}		
		if($possessionsQuery != ''){
			$this->db->where($possessionsQuery);
		}		
		$this->db->select('count(*) as total');
		$query2 = $this->db->get('projects');
		if($where != '')
			$this->db->where($where);
		if($allProjects){
			$this->db->where('is_live IN (0,1)');
		}else{
			$this->db->where(array('is_live'=>1));
		}		
		if($possessionsQuery != ''){
			$this->db->where($possessionsQuery);
		}		
		$query3 = $this->db->get('projects', 1);
		$this->db->order_by('project_id DESC');
		if($where != '')
			$this->db->where($where);
		if($allProjects){
			$this->db->where('is_live IN (0,1)');
		}else{
			$this->db->where(array('is_live'=>1));
		}		
		if($possessionsQuery != ''){
			$this->db->where($possessionsQuery);
		}		
		$query4 = $this->db->get('projects',1);
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ($error['code'] == 0){
			if($query3->result()){
				$first_id = $query3->result()[0]->project_id;
			}
			if($query4->result()){
				$last_id = $query4->result()[0]->project_id;
			}				
			if(is_object($query)){
				return ['data'=>$query->result_array(),'total'=>$query2->result()[0]->total,'last_id' =>$last_id,'first_id'=>$first_id];
			}
			else{
				return ['data'=>[],'total'=>$query2->result()[0]->total,'last_id' =>$last_id,'first_id'=>$first_id];				
			}
		}else{
			return ['data'=>[]];
		}		
	}

	public function delete($id)
	{
		return $this->db->delete('projects', array('project_id' => $id));
	}

	/*
		Updates an entry in the collection.
		returns an array with structure
		error['code'] - int 
		error['msg'] - string
	*/
	public function update($id,$data)
	{
		$this->db->db_debug = false;
		$this->db->where('project_id', $id);
		$this->db->update('projects', $data);
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ( $error['code'] == 0 ){
			return ['error'=>false,'msg'=>''];
		}
		else{
			return ['error'=>true,'msg'=>$error['message']];
		}	
	}
}