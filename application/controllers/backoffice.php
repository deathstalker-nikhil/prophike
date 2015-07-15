<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Backoffice extends CI_Controller {

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

	public function add_property()
	{
		$this->load->view('backoffice/add_property');
	}

	public function change_password()
	{
		$this->load->view('backoffice/change_password');
	}

	public function comments()
	{
		$this->load->view('backoffice/comments');
	}

	public function edit_property()
	{
		$this->load->view('backoffice/edit_property');
	}

	public function locations()
	{
		$this->load->view('backoffice/locations');
	}

	public function properties()
	{
		$this->load->view('backoffice/properties');
	}
}
