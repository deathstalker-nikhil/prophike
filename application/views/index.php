<!DOCTYPE html>
<html lang="en" ng-app="prophikeApp" ng-controller="appController" ng-cloak>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="keywords" content="property, Delhi NCR, Yamuna Expressway, Greater Noida, Greater Noida West, Noida, Ghaziabad, prophike, prophike.com, hot projects, newly launched, investment projects, builders, supertech, gaur, amrapali, apartments, studio apartments, villas, villa, 2BHK, 3BHK, 4BHK, 1BHK, plot, office, office space, building, nikhil verma, prashant chaudhary, estate, real estate, investment">
  <title>{{app.title}} | PropHike</title>
  <link rel="shortcut icon" href=""> 
  <link href="/assets/css/bootstrap.min.css?v=1" rel="stylesheet">   
  <link href="/assets/css/owl.carousel.css?v=1" rel="stylesheet">
  <link href="/assets/css/owl.theme.css?v=1" rel="stylesheet">
  <link href="/assets/css/lightgallery.min.css?v=1" rel="stylesheet">
  <link href="/prophike_app/app.css?v=5" rel="stylesheet">
  <script src="/assets/js/angular.min.js?v=1"></script>
  <script>
    // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    // ga('create', 'UA-69508517-1', 'auto');
    // ga('send', 'pageview');

  </script>   
  <base href="/">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]--> 
</head>
<body id="page-top" class="index {{app.mainClass}}">
  <div ng-include="'/prophike_app/common_components/header.html'"></div>
  <div ui-view></div>
  <div my-footer></div>
  <script src="/assets/js/angular-ui-router.min.js?v=1"></script>
  <script src="/assets/js/angular-sanitize.min.js?v=1"></script>
  <script src="/assets/js/jquery-1.11.3.min.js?v=1"></script>
  <script src="/assets/js/bootstrap.min.js?v=1"></script>
  <script src="assets/js/owl.carousel.min.js?v=1"></script>
  <script src="/assets/js/lightgallery.min.js?v=1"></script>
  <script src="/assets/js/lg-fullscreen.min.js?v=1"></script>
  <script src="/assets/js/lg-thumbnail.min.js?v=1"></script>  
  <script src="/prophike_app/app.js?v=2"></script>
  <script src="/prophike_app/common_components/footer_directive/footerDirective.js?v=1"></script>
  <script src="/prophike_app/home/homeController.js?v=1"></script>
  <script src="/prophike_app/search/searchController.js?v=1"></script>
  <script src="/prophike_app/property/propertyController.js?v=4"></script>
  <script src="/backoffice_app/locations/locationsService.js?v=1"></script>
  <script src="/backoffice_app/builder/builderService.js?v=1"></script>
  <script src="/backoffice_app/specifications/specificationsService.js?v=1"></script>
  <script src="/backoffice_app/properties/propertiesService.js?v=1"></script>
  <script src="/backoffice_app/properties/units/unitsService.js?v=1"></script>
  <script src="/backoffice_app/comments/commentsService.js?v=1"></script>
  <script src="/backoffice_app/user_queries/userQueriesService.js?v=2"></script>
  <script src="assets/js/custom.js?v=2"></script>
</body>
</html>
