<?php 

class Locations_model extends CI_Model {

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
		$this->db->insert('locations', $data);
		$this->db->db_debug = true;
		$error = $this->db->error();
		if ( $error['code'] == 0 ){
			return ['error'=>false,'msg'=>''];
		}
		else{
			return ['error'=>true,'msg'=>$error['message']];
		}
	}

	public function get($limit = 10,$offset = 0)
	{
		$query = $this->db->get('locations', $limit, $offset);
		return $query->result_array();
	}

	public function delete($id)
	{
		return $this->db->delete('locations', array('id' => $id));
	}

}