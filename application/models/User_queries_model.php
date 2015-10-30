<?php 

class User_queries_model extends CI_Model {

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
		$this->db->insert('user_queries', $data);
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
			$this->db->where(array('id' => $id));
			$this->db->join('projects', 'user_queries.p_id = projects.project_id','left');
			$query = $this->db->get('user_queries',$limit);
		}
		else
		{
			$this->db->select($fields);
			$this->db->where($where);
			$this->db->order_by($orderBy);
			$this->db->join('projects', 'user_queries.p_id = projects.project_id','left');
			$query = $this->db->get('user_queries', $limit);
		}
		$first_id = 0;
		$last_id =0;
		if($where != '')
			$this->db->where($where);
		$this->db->select('count(*) as total');
		$query2 = $this->db->get('user_queries');
		if($where != '')
			$this->db->where($where);
		$query3 = $this->db->get('user_queries', 1);
		$this->db->order_by('id DESC');
		if($where != '')
			$this->db->where($where);
		$query4 = $this->db->get('user_queries',1);	
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ($error['code'] == 0){
			if($query3->result()){
				$first_id = $query3->result()[0]->id;
			}
			if($query4->result()){
				$last_id = $query4->result()[0]->id;
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
		return $this->db->delete('user_queries', array('id' => $id));
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
		$this->db->where('id', $id);
		$this->db->update('user_queries', $data);
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