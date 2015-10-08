<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Property | PropHike</title>
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="/assets/css/prettyPhoto.css" rel="stylesheet">
    <link href="/assets/css/price-range.css" rel="stylesheet">
    <link href="/assets/css/animate.css" rel="stylesheet">
	<link href="/assets/css/main.css" rel="stylesheet">
	<link href="/assets/css/responsive.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->       
    <link rel="shortcut icon" href="/assets/images/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/images/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/images/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/images/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="/assets/images/ico/apple-touch-icon-57-precomposed.png">


    <style type="text/css">
.testimonial
{
margin: 0;
background: #fff;
padding: 10px 50px;
position: relative;
font-family: Georgia, serif;
color: #666;
border-radius: 5px;
font-style: italic;
text-shadow: 0 1px 0 #ECFBFF;
background-image: linear-gradient(#fff, #fff);
}
.testimonial:before
{
content: "\201C";
position: absolute;
font-size: 80px;
line-height: 1;
color: #999;
font-style: normal;
}

.testimonial:after
{
position: absolute;
font-size: 80px;
line-height: 1;
color: #999;
font-style: normal;
}
.testimonial:before
{
top: 0;
left: 10px;
}
.testimonial:after
{
right: 10px;
bottom: -0.5em;
}
.arrow-down
{
width: 0;
height: 0;
border-left: 15px solid transparent;
border-right: 15px solid transparent;
border-top: 15px solid #B7EDFF;
margin: 0 0 0 25px;
}
.testimonial-author
{
margin: 0 0 0 25px;
font-family: Arial, Helvetica, sans-serif;
color: #999;
text-align:left;
}
.testimonial-author span
{
font-size: 12px;
color: #666;
}

    </style>

<!-- yahi se kand ho raha hai sab -->

  <link rel="stylesheet"  href="/assets/css/lightGallery.css"/>
    <style>
    	ul{
			list-style: none outside none;
		    padding-left: 0;
		}
		.gallery li {
			display: block;
			float: left;
			height: 100px;
			margin-bottom: 6px;
			margin-right: 6px;
			width: 100px;
		}
		.gallery li a {
			height: 100px;
			width: 100px;
		}
		.gallery li a img {
			max-width: 100px;
		}
    </style>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<!-- huhahahah -->

<script type="text/javascript" src="/assets/js/stickyfloat.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
	$('#contact-wrapper').stickyfloat({ duration: 400, cssTransition: true, offsetY:100}); //stickyfloat contact form
	$("#contact-btn").click(function() { //smoothly slide open/close form
		var floatbox = $("#floating-contact-wrap");
		if (floatbox.hasClass('visiable')){
			floatbox.animate({"right":"-340px"}, "fast").removeClass('visiable');
		}else{
			floatbox.animate({"right":"0px"}, "fast").addClass('visiable');
		}
	});
	
	$("#message-send-btn").click(function() { //try sending email
	
		//validate the form
		 var validator 		= $( "#floating-contact").validate();
		 var isValid 		= validator.form();
		 
			if(isValid){ //is everyting valid? proceed

				//collect values from input fields
				var user_name       = $('.floating-contact-inner input[name=name]').val(); 
				var user_email      = $('.floating-contact-inner input[name=email]').val();
				var user_message    = $('.floating-contact-inner textarea[name=message]').val();
				
				//prepare ajax data
				post_data = {'s_name':user_name, 's_email':user_email, 's_message':user_message};
				
				$(this).hide(); //hide submit button
				$('#ajax-loading-image').show(); //show loading image
				
				$.post('ajax_response.php', post_data, function(data){  
						validator.resetForm();
						//load success massage in #result div element,  
						$("#result").hide().html('<div class="success">'+data+'</div>').slideDown();
						$('#floating-contact').hide(); //show submit button
						
					}).fail(function(err) {  //load any error data
					
						$("#result").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
						$("#message-send-btn").show(); //show submit button
						$('#ajax-loading-image').hide(); //hide loading image

				});
			
			}else{
				$("#message-send-btn").show(); //show submit button
				$('#ajax-loading-image').hide(); //hide loading image
			}
	});
	
});
</script>

<style type="text/css">
	.transition200{
	transition:200ms;
	-webkit-transition:200ms;
	-o-transition:200ms;
}
#contact-wrapper{
	position: absolute;
	right: 0px;
	width: 365px;
	height:400px;
	overflow:hidden;
	z-index:99999;
	top:50px;
}
#contact-wrapper label.error {
	color: #F00;
	text-shadow: 1px 1px 1px #1F1F1F;
	width: 300px;
	text-align: right;
}
#contact-wrapper .floating-contact-inner {
	position: absolute;
	width: 320px;
	background: #3c424a url(/assets/imge/denim.png) repeat;
	padding: 30px 10px 20px 10px;
	font: 12px Arial, Helvetica, sans-serif;
	text-shadow: 1px 1px 1px #3C3C3C;
	color: #FFF;
	border-radius: 10px 0px 0px 10px;
	right: -340px;
}
#contact-wrapper .floating-contact-inner h1>span {
    display: block;
    font-size: 11px;
}
#contact-wrapper .floating-contact-inner label {
	display: block;
	margin: 0px 0px 10px;
}
#contact-wrapper .floating-contact-inner label>span {
    float: left;
    width: 80px;
    text-align: right;
    padding-right: 10px;
    margin-top: 10px;
}
#contact-wrapper .floating-contact-inner input[type="text"], 
#contact-wrapper .floating-contact-inner input[type="email"], 
#contact-wrapper .floating-contact-inner textarea, 
#contact-wrapper .floating-contact-inner select {
	border:1px solid #3C424A;
	color: #3C3C3C;
	height: 24px;
	outline: 0 none;
	padding: 3px 0px 3px 5px;
	width: 200px;
	font: normal 12px/12px arial, "Times New Roman", Times, serif;
	margin: 2px 0px 0px;
	border-radius: 5px;
}
#contact-wrapper .floating-contact-inner select {
    background: #FFF url('down-arrow.png') no-repeat right;
    background: #FFF url('down-arrow.png') no-repeat right);
    appearance:none;
    -webkit-appearance:none; 
    -moz-appearance: none;
    text-indent: 0.01px;
    text-overflow: '';
    width: 210px;
    height: 30px;
}
#contact-wrapper .floating-contact-inner textarea{
    height:100px;
}
#contact-wrapper .floating-contact-inner .button {
	background: #FE980F;
	border: none;
	padding: 5px 25px 5px 25px;
	color: #FFF;
	border-radius: 5px;
	text-shadow: 1px 1px 1px #223944;
	box-shadow: 1px 1px 1px #1D1D1D;
}
#contact-wrapper .floating-contact-inner .button:hover {
	background: #479AB6
}
#contact-wrapper #contact-btn {
	background: url(/assets/imge/contact-btn.png) no-repeat;
	height: 71px;
	width: 22px;
	float: left;
	cursor: pointer;
	margin: 80px 0px 0px -50px;
	
} 
#contact-wrapper #contact-btn:hover {
	background: url(/assets/imge/contact-btn.png) no-repeat -22px 0px;
}
#contact-wrapper .success{
	padding: 0px 20px 20px;
}
#contact-wrapper .success h2{
	font-size: 20px;
	border-bottom: 1px dotted #686868;
	padding: 0px;
	margin: 10px 0px 10px 0px;
}
#contact-wrapper #result .error{
	text-align: center;
	color: #FF0000;
	text-shadow: 1px 1px 1px #1F1F1F;
}
</style>

</head><!--/head-->

<body>
<div id="contact-wrapper">
<div class="floating-contact-inner" id="floating-contact-wrap">
<div id="contact-btn">&nbsp;</div>
<div id="result"></div>
<form action="" method="post" id="floating-contact" >
    <label>
        <span>Name</span>
        <input id="name" type="text" name="name" placeholder="Your Full Name"  required />
    </label>
    <label>
        <span>Email</span>
        <input id="email" type="email" name="email" placeholder="Valid Email Address"  email required />
    </label>
    <label>
        <span>Query</span>
        <textarea id="message" name="message" placeholder="Your Query for Us" required></textarea>
    </label> 
     <label>
        <span>&nbsp;</span> 
        <input type="button" class="button" id="message-send-btn" value="Send" />
        <img id="ajax-loading-image" style="display:none" src="/assets/imge/ajax-loader.gif" border="0" />
    </label>    
</form>
</div>
</div>
	<header id="header"><!--header-->
		<div class="header_top"><!--header_top-->
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href="#"><i class="fa fa-phone"></i> +91-9871363345</a></li>
								<li><a href="#"><i class="fa fa-envelope"></i> contact@prophike.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								<li><a href="#"><i class="fa fa-dribbble"></i></a></li>
								<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header_top-->
		
		<div class="header-middle"><!--header-middle-->
				<div class="container">
					<div class="row">
						<div class="col-sm-4">
							<div class="logo pull-left">
								<a href="index.html"><img src="/assets/images/home/logo.png" alt="" /></a>
							</div>
							
						</div>
						<div class="col-sm-8">
							<div class="shop-menu pull-right">
							<div class="search_box pull-right" style="padding-top: 18px;">
								<input type="text" placeholder="Search"/>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div><!--/header-middle-->
	
		
	</header><!--/header-->
	
	<section id="slider"><!--slider-->
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div id="slider-carousel" class="carousel slide" data-ride="carousel">
						
						
						<div class="carousel-inner">
							
								
								<div class="col-sm-12">
									<img src="/assets/images/home/PROP.png" class="girl img-responsive" alt="" />
								</div>
							
							
							
						</div>
						
						
						
					</div>
					
				</div>
			</div>
		</div>
	</section><!--/slider-->

	<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center">OVERVIEW</h2>
    		<p>Overview for the project goes here, overview includes details of the project in brief, Includes details regarding the project, and all other stuff. Thank You.Overview for the project goes here, overview includes details of the project in brief, Includes details regarding the project, and all other stuff. Thank You.Overview for the project goes here, overview includes details of the project in brief, Includes details regarding the project, and all other stuff. Thank You.</p>	

	    			
	    	</div>  
    	</div>	
    </div>
    </section>

<br><br>
<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center">UNIT AND PRICE LIST</h2>
    		<p>Unit and price list details goes here, *** this is pending ***</p>	

	    			
	    	</div>  
    	</div>	
    </div>
    </section>

<br><br>
<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center">SPECIFICATIONS</h2>
    		<div class="col-sm-1">
	    			
	    				<div class="productinfo text-center">
											<img src="/assets/images/specifications/metro.svg">
											<h6>Metro Connectivity</h6>
	    			
				    	
	    			</div>
	    		</div> 
	    				<div class="col-sm-1">
	    			
	    				
	    				<div class="productinfo text-center">
											<img src="/assets/images/specifications/phone.svg">
											<h6>Telephonic Services</h6>
	    				
	    			</div>
	    		</div>   		
	    		<div class="col-sm-1">
	    			
	    				<div class="productinfo text-center">
											<img src="/assets/images/specifications/power.svg">
											<h6>24 X 7 Electricity</h6>
	    				
	    			</div>
	    		</div>   		 	
	    		

	    			
	    	</div>  
    	</div>	
    </div>
    </section>
    <br><br>
	<section id="slider">
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row">  	
	    		<div class="col-sm-8">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Google Map</h2>
	    				
	    				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1750.7196716390667!2d77.373182559281!3d28.64656098170002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfabbae31843d%3A0xf5857c74104528f7!2sIndirapuram%2C+Ghaziabad%2C+Uttar+Pradesh!5e0!3m2!1sen!2sin!4v1435942698802" width="750" height="370" frameborder="0" style="border:0" allowfullscreen></iframe>
	    			
	    		</div>   	</div>

	    		<div class="col-sm-4">
	    			<div class="contact-form">
	    				<h2 class="title text-center">ADDRESS</h2>
	    				<address>
	    					<p style="text-align: center;"><b>Jaypee Utsav</b></p>
							<p style="text-align: center;">935, Sector-62</p>
							<p style="text-align: center;">Noida, Uttar Pradhesh</p>
							<p style="text-align: center;">India</p>
	    				</address>
				    	
	    			</div>
	    		</div>   			
	    	</div>  
    	</div>	
    </div>
	</section>
	


        
       
       
   
    <section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center">GALLERY</h2>
    		<ul id="light-gallery" class="gallery">
    		<div class="col-sm-1" style="margin-right: 8px;">
	    						
	    				
        <li data-src="http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1">
        	<a href="#">
            <img src="/assets/img/thumb1.jpg" />
            </a>
        </li>
				    	
	    			</div>
	    		
	    				<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				 <li data-src="img3.jpg">
        	<a href="#">
            <img src="/assets/img/thumb3.jpg" />
            </a>
        </li>
				    	
	    			
	    		</div>   		
	    		<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				<li data-src="img2.jpg" >
        	<a href="#">
            <img src="/assets/img/thumb2.jpg" />
            </a>
        </li>
				  </div>   
				  <div class="col-sm-1" style="margin-right: 8px;">
	    						
	    				
        <li data-src="http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1">
        	<a href="#">
            <img src="/assets/img/thumb1.jpg" />
            </a>
        </li>
				    	
	    			</div>
	    		
	    				<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				 <li data-src="img3.jpg">
        	<a href="#">
            <img src="/assets/img/thumb3.jpg" />
            </a>
        </li>
				    	
	    			
	    		</div>   		
	    		<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				<li data-src="img2.jpg" >
        	<a href="#">
            <img src="/assets/img/thumb2.jpg" />
            </a>
        </li>
				  </div>   
				  <div class="col-sm-1" style="margin-right: 8px;">
	    						
	    				
        <li data-src="http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1">
        	<a href="#">
            <img src="/assets/img/thumb1.jpg" />
            </a>
        </li>
				    	
	    			</div>
	    		
	    				<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				 <li data-src="img3.jpg">
        	<a href="#">
            <img src="/assets/img/thumb3.jpg" />
            </a>
        </li>
				    	
	    			
	    		</div>   		
	    		<div class="col-sm-1" style="margin-right: 8px;">
	    			
	    				
	    				<li data-src="img2.jpg" >
        	<a href="#">
            <img src="/assets/img/thumb2.jpg" />
            </a>
        </li>
				  </div>     	
	    		 </ul>	
	    				 	
	    		

	    			
	    	</div>  
    	</div>	
    </div>
    </section>
    <br><br>
     <section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row">  	
	    		<div class="col-sm-8">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Construction Updates</h2>
	    				<div style="overflow-y: scroll; height:208px;">
	    				<div class="status alert alert-success" style="display: none"></div>
	    				<p><label style="color: #FE980F">12-06-2015</label>&nbsp;Finishing in process</p>
	    				<p><label style="color: #FE980F">07-05-2015</label>&nbsp;Construction Completed</p>
	    				<p><label style="color: #FE980F">17-03-2014</label>&nbsp;Construction Started</p>
	    			</div>
	    		</div>   	</div>

	    		<div class="col-sm-4">
	    			
	    				<h2 class="title text-center">POSSESSION IN</h2>
	    				<div class="productinfo text-center">
											<img src="/assets/images/home/key.jpg" style="height: 50%; width:50%;">
											<h2>in 6 Months</h2>
	    				</div>
	    		</div>   			
	    	</div>  
    	</div>	
    </div>
    </section>
    <br><br>
	<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center">BUILDER</h2>
    		<div class="col-sm-4">
	    			<div class="contact-form">
	    				
	    				<div class="productinfo text-center">
											<img src="/assets/images/home/jaypee.png">
											<h2>JAYPEE GROUP</h2>
	    				</div>
				    	
	    			</div>
	    		</div>   		 	
	    		<div class="col-sm-8">
	    			
	    				
	    				
	    				
	    				<p>The Jaypee Group is an conglomerate based in Noida, India. It was founded by Jaiprakash Gaur which is involved in well diversified infrastructure conglomerate with business interests in Engineering & Construction, Power, Cement, Real Estate, Hospitality, Expressways, IT, Sports & Education (not-for-profit).</p>
	    				<p><b>Founder:</b>Jaiprakash Gaur</p>
	    				<p><b>Founded:</b>1979</p>

	    				<button class="btn btn-primary pull-right">View all Projects</button>


	    			
	    		</div>   	

	    			
	    	</div>  
    	</div>	
    </div>
    </section>
    <br><br>
	<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row">  	
	    		<div class="col-sm-8">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Comments</h2>
	    				<div style="overflow-y: scroll; height:400px;">
	    				<div class="status alert alert-success" style="display: none"></div>
	    				<p>Be the first person to comment on this...</p>
	    				<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Hello Guys, its a great property site, alert success, this is a test comment. its a great website to see property.</p>
</blockquote>

<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Hello Guys, its a great property site, awesome, test comment it is, its a great website to see property.</p>
</blockquote>
<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Great site to invest, great job, great website, awesome work. its a great website to see property.</p>
</blockquote>
<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Hello Guys, its a great website to see property. its a great website to see property.</p>
</blockquote>
<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Hello Guys, its a great property site, alert success, this is a test comment. its a great website to see property.</p>
</blockquote>
<b>Abhay</b> says
						<blockquote class="testimonial">
<p>Hello Guys, its a great property site, alert success, this is a test comment. its a great website to see property.</p>
</blockquote>
	    			</div>
	    		</div>   	</div>

	    		<div class="col-sm-4">
	    			<div class="contact-form">
	    				<h2 class="title text-center">POST COMMENT</h2>
	    				<div class="status alert alert-success" style="display: none"></div>
				    	<form id="main-contact-form" class="contact-form row" name="contact-form" method="post">
				            <div class="form-group col-md-12">
				                <input type="text" name="name" class="form-control" required="required" placeholder="Name">
				            </div>
				            <div class="form-group col-md-12">
				                <input type="text" name="Phone" class="form-control" required="required" placeholder="Phone">
				            </div>
				            <div class="form-group col-md-12">
				                <input type="email" name="email" class="form-control" required="required" placeholder="Email">
				            </div>
				            <div class="form-group col-md-12">
				                <textarea name="message" id="message" required="required" class="form-control" rows="8" placeholder="Your Query"></textarea>
				            </div>                   
				            <div class="form-group col-md-12">
				                <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit">
				            </div>
				        </form>
	    			</div>
	    		</div>   			
	    	</div>  
    	</div>	
    </div>
    </section>
   <br><br>
	<section>	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row">  	
	    		<div class="col-sm-12">
	    			<div class="contact-form">
	    				<h2 class="title text-center">Contact Us</h2>
	    				<div class="status alert alert-success" style="display: none"></div>
				    	<form id="main-contact-form" class="contact-form row" name="contact-form" method="post">
				            <div class="form-group col-md-4">
				                <input type="text" name="name" class="form-control" required="required" placeholder="Name">
				            </div>
				            <div class="form-group col-md-4">
				                <input type="text" name="Phone" class="form-control" required="required" placeholder="Phone">
				            </div>
				            <div class="form-group col-md-4">
				                <input type="email" name="email" class="form-control" required="required" placeholder="Email">
				            </div>
				            <div class="form-group col-md-12">
				                <textarea name="message" id="message" required="required" class="form-control" rows="8" placeholder="Your Query"></textarea>
				            </div>  
				            <div class="form-group col-md-12">
				                <input type="checkbox" name="site_visit">&nbsp;Arrange Site Visit
				            </div>                      
				            <div class="form-group col-md-12">
				                <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit">
				            </div>
				        </form>
	    			</div>
	    		</div>   			
	    	</div>  
    	</div>	
    </div>
</section>



	
			<footer id="footer"><!--Footer-->
			
			<div class="footer-widget">
				<div class="container">
					<div class="row">
						<div class="col-sm-2">
							<div class="single-widget">
								<h2>Customer Support</h2>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#">Advertise With Us</a></li>
									<li><a href="#">FAQ's</a></li>
									<li><a href="#">Contact Us</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="single-widget">
								<h2>Quick Links</h2>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Testimonials</a></li>
									<li><a href="#">Company Information</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="single-widget">
								<h2>Top-Projects</h2>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#">Amrapali</a></li>
									<li><a href="#">Jaypee</a></li>
									<li><a href="#">Shipra</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-2">
							<div class="single-widget">
								<h2>PropHike</h2>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#">Brands</a></li>
									<li><a href="#">Team</a></li>
									<li><a href="#">Disclaimer</a></li>
									<li><a href="#">Privacy Policy</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-3 col-sm-offset-1">
							<div class="single-widget">
								<h2>Newsletter Subscribtion</h2>
								<form action="#" class="searchform">
									<input type="text" placeholder="Your email address" />
									<button type="submit" class="btn btn-default"><i class="fa fa-arrow-circle-o-right"></i></button>
									<p>Get the most recent updates from <br /><b>PropHike</b> and be updated your self...</p>
								</form>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			
			<div class="footer-bottom">
				<div class="container">
					<div class="row">
						<p class="pull-left">Copyright © 2015 PropHike. All rights reserved.</p>
						<p class="pull-right">Developed by <span><a target="_blank" href="#">Me</a></span></p>
					</div>
				</div>
			</div>
			
		</footer><!--/Footer-->
	

  
  
	<script src="/assets/js/bootstrap.min.js"></script>
	    <script src="/assets/js/lightGallery.js"></script>
	    <script>
	    	 $(document).ready(function() {
				$("#light-gallery").lightGallery();
			});
	    </script>
	<script src="/assets/js/jquery.scrollUp.min.js"></script>
	<script src="/assets/js/price-range.js"></script>
    <script src="/assets/js/jquery.prettyPhoto.js"></script>
    <script src="/assets/js/main.js"></script>

</body>
</html>
