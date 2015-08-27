<?php 

class User_model extends CI_Model {

	public function __construct()
	{
	    parent::__construct();
	}

	public function isValidUser($table,$username,$password)
	{
		$query = $this->db->get_where($table, array('username' => $username,'password'=>$password), 1, 0);
		if($query->result())
			return TRUE;
		else
			return FALSE;
	}

}