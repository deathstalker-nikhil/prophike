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
	
	<div class="container">
            <div class="row">
                <div class="col-lg-12">
                     <div style="float:right;">

                      <br>
                      <label>We are socially active at</label>   
                            <img src="/assets/images/twitter.png" width="35px" style="border-radius: 50%;">
                              <img src="/assets/images/fb.png" width="35px" style="border-radius: 50%;">
                               <br>
                                <label style="font-size: 20px; float:right;">+91-9871363345</label>
                               
                                          
                              
                            
                            </div>
                           
                        <div class="col-md-4">
                                <img src="/assets/images/web-logo.png" width="100%" style="margin-top:8px;">
                            </div> 
                        
                            
                        
                                                       </div>

                    </div>      </div>  

	<section>
	<div id="contact-page" class="container">
    	<div class="bg">    	
    		<div class="row"> 
    		<h2 class="title text-center" style="font-size: 30px;">PRIVACY POLICY</h2>
    		
    	<p style="font-size: 16px; line-height:1.75; font-family: 'Roboto', sans-serif;">

			<p>This privacy policy sets out how PropHike uses and protects any information that you provide to PropHike when you use this website. PropHike is committed to ensuring that your privacy is protected. We ask you to provide certain information by which you can be identified when using this website and then you can be assured that it will only be used in accordance with this privacy statement. PropHike may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 01-Oct-2015.</p>

<p><strong>What we collect-</strong></p>

<p>We may collect the following information:</p>

<ul>
	<li>
	<p>Name and job title.</p>
	</li>
	<li>
	<p>Contact information including email address.</p>
	</li>
	<li>
	<p>Demographic information such as postcode, preferences and interests.</p>
	</li>
	<li>
	<p>Other information relevant to customer surveys and/or offers.</p>
	</li>
</ul>

<p><strong>What we do with the information we gather-</strong></p>

<p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>

<ul>
	<li>
	<p>Internal record keeping.</p>
	</li>
	<li>
	<p>We may use the information to improve our products and services.</p>
	</li>
	<li>
	<p>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</p>
	</li>
	<li>
	<p>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</p>
	</li>
</ul>

<p><strong>Security-</strong></p>

<p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>

<p><strong>How we use cookies-</strong></p>

<p>A cookie is a small file which asks permission to be placed on your computer&#39;s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>

<p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>

<p>Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>

<p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>

<p><strong>Links to other websites-</strong></p>

<p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>

<p><strong>Controlling your personal information-</strong></p>

<p>You may choose to restrict the collection or use of your personal information in the following ways:</p>

<ul>
	<li>
	<p>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</p>
	</li>
	<li>
	<p>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <em><a href="mailto:unsubscribe@prophike.com">unsubscribe@prophike.com</a> </em></p>
	</li>
</ul>

<p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>

<p>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable.</p>

<p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us at <em><a href="mailto:contact@prophike.com">contact@prophike.com</a> </em>as soon as possible. We will promptly correct any information found to be incorrect.</p>

</p>	


	    	</div>  
    	</div>	
    </div>
    </section>

<br>
	
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
