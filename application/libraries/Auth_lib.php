<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Auth_lib{

    protected $CI;

    public function __construct()
    {
        // Assign the CodeIgniter super-object
        $this->CI = &get_instance();
        $this->CI->load->library('session');
    }

    // Function to check user is logged in or not
	public function auth($redirectTo = '')
	{
        if (!$this->CI->session->userdata('adminLoggedIn')) {
            if ($redirectTo != '')
                redirect(base_url().$redirectTo,'refresh');
            else
                return FALSE;
        }
        return TRUE;
	}
    
    // Login in admin if username and password is correct
    public function doLogin($username,$password)
    {
        $this->CI->load->model('user_model','user');
        if (!$this->CI->user->isValidUser('admin',$username,$password)) {
            return FALSE;
        }
        $_SESSION['adminLoggedIn'] = TRUE;
        return TRUE;
    }

    // Logout admin
    public function logout($redirectTo = '')
    {
        $this->CI->session->unset_userdata('adminLoggedIn');
        if ($redirectTo != '')
            redirect(base_url().$redirectTo,'refresh');
    }

}