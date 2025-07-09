
function activateSwipe(){
	if( $(window).width() <= 480 ){
		$('body').addClass('activeSwipe');
	}else{
		$('body').removeClass('activeSwipe');
		$('nav, .m-s-wrapper').removeClass('nav-toggle')
	};
};

function showShareContainer(){
	if( $(window).width() > 320 ){
		$('.f-share-container-hideShow').show();
	}else{
		$('.f-share-container-hideShow').hide();
	};
};


$(document).on("pagecreate","#pageone",function(){

		$("nav, .b-menu, body").on("swiperight",function(){
			if( $('body').hasClass('activeSwipe') ){
				$('nav, .m-s-wrapper').removeClass('nav-toggle');
			};
		}); 
		$(".b-menu, body").on("swipeleft",function(){
			if( $('body').hasClass('activeSwipe') ){
				$('nav, .m-s-wrapper').addClass('nav-toggle');
			};
		});
});


$(window).resize(function() {
	activateSwipe();
	showShareContainer();
});


$(document).ready(function() {

	activateSwipe();
	showShareContainer();

	var win = $(window);

	//sticky header
	function stickyNav(){
		var headerNav = $('header').outerHeight();
		var scrollPosition = win.scrollTop();

		if( headerNav <= scrollPosition){
			$('header').addClass('sticky');
		}else{
			$('header').removeClass('sticky');
		};

	};

	win.on('scroll', stickyNav);
	stickyNav();


	//scrollTo
	$('header a, nav a').click(function(event){
		var theHref = $(this).attr('href');
		var topOffset = $(theHref).offset().top;
		event.preventDefault();
		$('html,body').animate({'scrollTop':topOffset},1000);
	});

	//toogle nav responsive
	$('.b-menu').click(function(){
		$('nav, .m-s-wrapper').toggleClass('nav-toggle');
	});
	$('header nav a').click(function(){
		$('nav, .m-s-wrapper').removeClass('nav-toggle');
	});

	//show share buttons
	$('#show-share-btns, #f-s-c-close').click(function(event){
		event.preventDefault();
		$('.f-share-container-hideShow').fadeToggle(300);
	});

	//equalize height of descriptions
	var descriptionItems = $('.g-description');
	var maxHeightItems = 0;

	function findTallest(){
		var thisHeight = $(this).outerHeight();
		if( thisHeight > maxHeightItems ){
			maxHeightItems = thisHeight;
		};
	};

	descriptionItems.each(findTallest).height(maxHeightItems);


	//active nav link
	function activeNavLink(){

		var introLink = $('#intro').offset().top;
		var portfolioLink = $('#portfolio').offset().top;
		var aboutLink = $('#about').offset().top;
		var contactLink = $('#contact').offset().top;
		console.log(win.scrollTop());

		if(  win.scrollTop() < portfolioLink - 100 ){
			$('#nav_intro').addClass('activeNavLink').siblings().removeClass('activeNavLink');
		}else if( win.scrollTop() >= portfolioLink && win.scrollTop() < aboutLink ){
			$('#nav_portfolio').addClass('activeNavLink').siblings().removeClass('activeNavLink');
		}else if( win.scrollTop() >= aboutLink && win.scrollTop() < contactLink - 201 ){
			$('#nav_about').addClass('activeNavLink').siblings().removeClass('activeNavLink');
		}else if( win.scrollTop() >= contactLink - 100 ){
			$('#nav_contact').addClass('activeNavLink').siblings().removeClass('activeNavLink');
		};
	};
	win.on('scroll', activeNavLink);

});

$(window).load(function() {

	//scrolls to on page reload
	// var thisURL = location.hash;
	// var topOffsetHash = $(thisURL).offset().top;

	// if(thisURL == '#portfolio' || thisURL == '#about' || thisURL == '#contact' ){
		
	// 	$('html,body').delay(1000).animate({'scrollTop': topOffsetHash},9000);
	
	// };

	setTimeout(function() {
		$('.pace-inactive').hide();
	},4000);
});


Pace.on('done', function(){

	//hide preloader and in ie
	setTimeout(function() {
		$('.pace-inactive').hide();
	},1000);

	//inview
	$(".inview").appear(function(){
		var element = $(this);
		var animation = element.data('animation');
		var animationDelay = element.data('delay');
		setTimeout(function(){
		 element.addClass("animated " + animation);
		},animationDelay);
	});

	$('#intro h3, .about-box-1 h3').appear(function(){
		var element = $(this);
		setTimeout(function(){
		 element.addClass("inScreen");
		},400);
	});
});
