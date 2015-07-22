<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Locations extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->rest_format = 'json';
	}

	public function index_get()
	{
		echo $this->rest_format;
	}

}