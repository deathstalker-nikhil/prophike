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

	public function get($id = '',$limit = 10,$fields,$where = '' ,$orderBy = 'id DESC')
	{
		$this->db->db_debug = false;
		if ($id != '')
		{
			$this->db->select($fields);
			$this->db->where(array('project_id' => $id));
			$query = $this->db->get('projects',$limit);
		}
		else
		{
			$this->db->select($fields);
			$this->db->where($where);
			$this->db->order_by($orderBy);
			$this->db->join('builders', 'builders.id = projects.builder_id');
			$query = $this->db->get('projects', $limit);	
		}
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ($error['code'] == 0){
			return $query->result_array();
		}else{
			return [];
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

	public function rowsCount()
	{
		$first_id = 0;
		$last_id =0;
		$query = $this->db->query('select count(*) as total from projects');
		$query2 = $this->db->get('projects', 1);
		$this->db->order_by('project_id DESC');
		$query3 = $this->db->get('projects',1);
		if($query2->result()){
			$first_id = $query2->result()[0]->project_id;
		}
		if($query3->result()){
			$last_id = $query3->result()[0]->project_id;
		}		
		return ['total'=>$query->result()[0]->total,'last_id' =>$last_id,'first_id'=>$first_id];
	}
}