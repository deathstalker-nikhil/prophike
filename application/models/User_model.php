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

	public function updatePassword($username,$psswd){
		$this->db->db_debug = false;
		$this->db->where('username', $username);
		$this->db->update('admin', array('password'=>$psswd));
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