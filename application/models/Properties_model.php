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

	public function get($id = '',$limit = 10,$where = '' ,$orderBy = 'id DESC')
	{
		if ($id != '')
		{
			$query = $this->db->get_where('projects', array('project_id' => $id), $limit);
		}
		else
		{
			$this->db->where($where);
			$this->db->order_by($orderBy);
			$this->db->join('builders', 'builders.id = projects.builder_id');
			$query = $this->db->get('projects', $limit);	
		}
		return $query->result_array();
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
	// public function update($id,$data)
	// {
	// 	$this->db->db_debug = false;
	// 	$this->db->where('id', $id);
	// 	$this->db->update('locations', $data);
	// 	$this->db->db_debug = true;
	// 	$error = $this->db->error();
	// 	if ( $error['code'] == 0 ){
	// 		return ['error'=>false,'msg'=>''];
	// 	}
	// 	else{
	// 		return ['error'=>true,'msg'=>$error['message']];
	// 	}	
	// }

	// public function rowsCount()
	// {
	// 	$first_id = 0;
	// 	$query = $this->db->query('SHOW TABLE STATUS LIKE \'locations\'');
	// 	$query2 = $this->db->get('locations', 1);
	// 	if($query2->result()){
	// 		$first_id = $query2->result()[0]->id;
	// 	}
	// 	return ['total'=>$query->result()[0]->Rows,'last_id' =>$query->result()[0]->Auto_increment-1,'first_id'=>$first_id];
	// }
}