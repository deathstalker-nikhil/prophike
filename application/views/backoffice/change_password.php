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
                    <a href="contact.html" class="list-group-item">Add a new Property</a>
                    <a href="contact.html" class="list-group-item">Comments</a>
                </div>
            </div>
            <!-- Content Column -->
            <div class="col-md-9">
                <h2>Change Password</h2>
                <form name="sentMessage" id="contactForm" novalidate>
                 
                    <div class="col-md-7">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Current Password:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter Current Password">
                            <p class="help-block">Enter your current password.</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-7">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Current Password:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter New Password">
                            <p class="help-block">Enter new password.</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-7">
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Re-Enter Password:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter Re-Enter Password">
                            <p class="help-block">Enter your re-enter password.</p>
                        </div>
                    </div>
                    </div>
                    <div id="success"></div>
                    <div class="col-md-7">
                    <div class="control-group form-group">
                        <div class="controls">
                            <button class="btn btn-success btn-lg">Change Password</button>
                        </div>
                    </div>
                    </div>
                    
                    
                    <!-- For success/fail messages -->

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
