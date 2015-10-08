<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('index');
	}

	public function home()
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
