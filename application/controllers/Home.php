<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
	{
		parent::__construct();
		//$this->head = $this->load->view('/common/dashboard_head',array(),true);
	}

	public function index()
	{
		$this->load->view('home');
	}

	public function search()
	{
		$this->load->view('search');
	}	

	public function disclaimer()
	{
		$this->load->view('disclaimer');
	}	

	public function privacy_policy()
	{
		$this->load->view('privacy_policy');
	}	


	public function property()
	{
		$this->load->view('property');
	}

	public function about_us()
	{
		$this->load->view('about_us');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
