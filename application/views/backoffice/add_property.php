<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Backoffice|PropHike</title>

    <!-- Bootstrap Core CSS -->
    <link href="/assets/backoffice/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/assets/backoffice/css/modern-business.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/assets/backoffice/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

     <link href="/assets/backoffice/css/dataTables.bootstrap.css" rel="stylesheet">


    <link href="/assets/backoffice/css/dataTables.responsive.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">PropHike</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    
                    <li class="dropdown active">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Admin <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="full-width.html">Change Password</a>
                            </li>
                            <li>
                                <a href="sidebar.html">Sign Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">

        <!-- Page Heading/Breadcrumbs -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">PropHike
                    <small>BackOffice</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="index.html">Home</a>
                    </li>
                    <li class="active">Location(s)</li>
                </ol>
            </div>
        </div>
        <!-- /.row -->

        <!-- Content Row -->
        <div class="row">
            <!-- Sidebar Column -->
            <div class="col-md-3">
                <div class="list-group">
                    <a href="index.html" class="list-group-item">Home</a>
                    <a href="about.html" class="list-group-item">Cities</a>
                    <a href="services.html" class="list-group-item">Properties</a>
                    <a href="contact.html" class="list-group-item active">Add a new Property</a>
                    <a href="contact.html" class="list-group-item">Comments</a>
                </div>
            </div>
            <!-- Content Column -->
            <div class="col-md-9">
                <h2>Add a new Property</h2>
                <form name="sentMessage" id="contactForm" novalidate>
                 <div class="col-md-6">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>City Name:</label>
                            <select type="text" class="form-control" id="name" required>
                                <option>Noida</option>
                                <option>Greater Noida</option>
                                <option>YEIDA</option>
                            </select>
                            <p class="help-block">Select City</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Property Name:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter Property name">
                            <p class="help-block">Enter Property Name</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Property Overview:</label>
                            <textarea type="text" class="form-control" id="name" required data-validation-required-message="Please enter Property Overview"></textarea>
                            <p class="help-block">Enter brief description of the property</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Google Map Link:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter Property name">
                            <p class="help-block">Enter link for Google Map, with Width = 750 px and Height = 370 px</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Property Location (Address):</label>
                            <textarea type="text" class="form-control" id="name" required data-validation-required-message="Please enter Property Overview"></textarea>
                            <p class="help-block">Enter complete address of the property</p>
                        </div>
                    </div>
                    </div>
                    <label>Possession In</label>
                    <div class="col-md-12">
                        <div class="col-md-3">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Years</label>
                                    <select type="text" class="form-control">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Months</label>
                                    <select type="text" class="form-control">
                                        <option>0</option>
                                         <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                         <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Days</label>
                                    <select type="text" class="form-control">
                                        <option>0</option>
                                         <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                         <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                         <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                         <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>31</option>
                                    </select>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                           <div class="panel panel-default">
                        <div class="panel-heading">
                            Construction Log
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="dataTable_wrapper">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     
                                        <tr class="odd gradeX">
                                            <td>27-06-2015</td>
                                            <td>Outer Campus Completed</td>
                                            <td>Delete</td>
                                        </tr>
                                        <tr class="even gradeX">
                                            <td>03-07-2015</td>
                                            <td>Painting Started</td>
                                            <td>Delete</td>
                                        </tr>
                                     
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.table-responsive -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <a class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                Add Construction Update
                            </a>
          
          
          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <form action="" method="post">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="myModalLabel">Add Construction Update</h4>
                                        </div>
                                        <div class="col-md-12">
                                        <div class="modal-body">
                                        <div class="col-md-4">
                                           <div class="form-group">
                                            <label>Date</label>
                                            <input type="date" class="form-control" name="name">
                                           </div>  
                                           </div>                   
                                             <div class="col-md-8">
                                           <div class="form-group">
                                            <label>Status</label>
                                            <input type="text" class="form-control" name="name">
                                           </div>  
                                           </div>    
                                        </div>
                                        </div>
                                      
                                      
                                        <div class="modal-footer">
                                            <input type="hidden" name="<?php echo $csrf_token_name ?>" value="<?php echo $csrf_token ?>">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                           </form>
                            </div> 
                    </div>
                    <div class="col-md-6">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Property Thumbnail Image</label>
                                   <input type="file" class="form-control" id="name">
                                    <p class="help-block">Select Thumbnail Image, Width = 268px Height = 249px</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Property Cover Image</label>
                                   <input type="file" class="form-control" id="name">
                                    <p class="help-block">Select Cover Image, Width = 1140px Height = 441px</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Specifications</label>
                                   <select class="form-control" id="name" multiple="true">
                                   		<option>24 X 7 Electricity</option>
                                   		<option>24 X 7 Running Water</option>
                                   		<option>Metro Connectivity</option>
                                   </select>
                                    <p class="help-block">Press Ctrl on your keyboard to select more than one specifications</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Builder Name</label>
                                   <input type="text" class="form-control" id="name" required data-validation-required-message="Please select/enter Builder Name">
                                    <p class="help-block">Enter/Select Builder Name</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                            <div class="control-group form-group">
                                <div class="controls">
                                <label>Builder Logo</label>
                                   <input type="file" class="form-control" id="name">
                                    <p class="help-block">Select Builder Logo, Width = 360px Height = 240px</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Builder Details:</label>
                            <textarea type="text" class="form-control" id="name" required data-validation-required-message="Please enter Property Overview"></textarea>
                            <p class="help-block">Enter Builder Details</p>
                        </div>
                    </div>
                    </div>
                    <div id="success"></div>
                    <!-- For success/fail messages -->
                    <button type="submit" class="btn btn-success">Add Property</button>
                </form>
            </div>
        </div>
        <!-- /.row -->



        

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; PropHike 2015</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <!-- jQuery -->

        <script src="/assets/backoffice/js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/assets/backoffice/js/bootstrap.min.js"></script>
    <script src="/assets/backoffice/js/jquery.dataTables.min.js"></script>
    <script src="/assets/backoffice/js/dataTables.bootstrap.min.js"></script>



    <script type="text/javascript">

    $(document).ready(function() {
        $('#dataTables-example').DataTable({
                responsive: true
        });
    });
    
    </script>
</body>

</html>
