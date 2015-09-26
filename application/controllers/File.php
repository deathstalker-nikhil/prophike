<?php
class File extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
        }

        public function do_upload()
        {
                $type = (($this->input->post('type') != null) ? $this->input->post('type') : 'other');
                switch ($type) {
                        case 'const_update':
                                $path = 'assets/uploads/construction_updates';
                                break;
                        case 'thumb':
                                $path = 'assets/uploads/project_thumbnails';
                                break;
                        case 'cover':
                                $path = 'assets/uploads/project_cover_images';
                                break;
                        case 'gallery':
                                $path = 'assets/uploads/gallery';
                                break;
                        case 'pdf':
                                $path = 'assets/uploads/pdf';
                                break;
                        case 'specification_logo':
                                $path = 'assets/uploads/specifications';
                                break;
                        case 'builder_logo':
                                $path = 'assets/uploads/builders';
                                break;
                        case 'other':
                                $path = 'assets/uploads';
                                break;
                        default:
                                $path = 'assets/uploads';
                                break;
                }
                $config['upload_path']          = $path;
                $config['allowed_types']        = 'gif|jpg|png|pdf|jpeg';
                $config['max_size']             = 1024;
                $config['max_width']            = 1920;
                $config['max_height']           = 1080;
                $this->load->library('upload', $config);
                if ( ! $this->upload->do_upload('file'))
                {
                        $error = array('error' => $this->upload->display_errors());
                        echo json_encode($error);
                }
                else
                {
                        $data = array('path' => $path.'/'.$this->upload->data()['file_name'],'type'=>$type);
                        echo json_encode($data);
                }
        }
}
?>