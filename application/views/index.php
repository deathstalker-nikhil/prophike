<!DOCTYPE html>
<html lang="en" ng-app="prophikeApp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Home|PropHike</title>
  <link href="/assets/backoffice/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="/assets/css/agency.css" rel="stylesheet">
  <link href="/assets/css/bootstrap-social.css" rel="stylesheet">
  <!-- Custom Fonts -->
  <link href="/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
  <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="/assets/css/owl.carousel.css">    
  <link rel="stylesheet" href="/prophike_app/app.css">
  <script src="/assets/js/angular.min.js"></script>
  <base href="/">
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->  
</head>
<body id="page-top" class="index">
  <div ng-include="'/prophike_app/common_components/header.html'"></div>
  <div ui-view></div>
  <div ng-include="'/prophike_app/common_components/footer.html'"></div>
  <script src="/assets/js/angular-ui-router.min.js"></script>
  <script src="/assets/backoffice/js/jquery.js"></script>
  <script src="/assets/backoffice/js/bootstrap.min.js"></script>
  <!-- Plugin JavaScript -->
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
  <!-- Custom Theme JavaScript -->
  <script src="/assets/js/agency.js"></script>
  <script src="/assets/js/owl.carousel.js"></script>
  <script src="/prophike_app/app.js"></script>
  <script src="/prophike_app/home/homeController.js"></script>
  <script src="/prophike_app/search/searchController.js"></script>
</body>
</html>
