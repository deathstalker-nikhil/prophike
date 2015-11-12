<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url'); 
		$config['assets_dir'] = 'assets/';  
		$config['css_dir'] = FCPATH;
		$config['js_dir'] = FCPATH;		
		$this->load->library('minify',$config);
	}

	public function index()
	{ 		
		$this->load->view('index');
	}

	public function reconstructAssets()
	{
		$this->minify->css_file = 'prophikeApp.min.css';
		$this->minify->js_file = 'prophikeApp.min.js';
		$this->minify->css(array('prophike_app/app.css'));
		$this->minify->js(array(
	  'prophike_app/app.js',
	  'prophike_app/common_components/footer_directive/footerDirective.js',
	  'prophike_app/common_components/header_directive/headerDirective.js',
	  'prophike_app/home/homeController.js',
	  'prophike_app/search/searchController.js',
	  'prophike_app/property/propertyController.js',
	  'backoffice_app/locations/locationsService.js',
	  'backoffice_app/builder/builderService.js',
	  'backoffice_app/specifications/specificationsService.js',
	  'backoffice_app/properties/propertiesService.js',
	  'backoffice_app/properties/units/unitsService.js',
	  'backoffice_app/comments/commentsService.js',
	  'backoffice_app/user_queries/userQueriesService.js',
	  'assets/js/custom.js'
		)); 
		$this->minify->deploy_css(TRUE);
		$this->minify->deploy_js(TRUE);
	}
}
