jQuery('.dropdown-toggle').click(function() {
    var location = jQuery(this).attr('href');
    window.location.href = location;
    return false;
});



// GET FILENAME/TITLE
var fileName = window.location.pathname;

// NAVIGATION BAR
$(document).ready(function () {
	var folded = true; 
	var nav = $('.navbar');
	var scrollDist = 0;
	var endPoint = window.innerHeight / 2; 
	var opacity = 0;

	// if (fileName == '/index.html' || fileName == '/') {
		$(document).scroll(function () {
			scrollDist = $(document).scrollTop();
			opacity = scrollDist / endPoint;
			if (opacity > 1) {
				opacity = 1;
			}
			if (folded) {
				nav.css('transition', 'unset');
				nav.css('background-color', 'rgba(77, 72, 61, ' + opacity + ')');
			} else {
				nav.css('background-color', 'rgba(77, 72, 61, 1)');
			}
		});

		$('#btn-menu').click(function () {
			if (folded && opacity <= 1) {
				folded = false;
				nav.css('transition', 'background-color 200ms ease');
				nav.css('background-color', 'rgba(77, 72, 61, 1)');
			} else if (!folded) {
				folded = true;
				nav.css('transition', 'background-color 500ms ease');
				nav.css('background-color', 'rgba(77, 72, 61, ' + opacity + ')');
			}
		});
	// } else {
	// 	nav.css('background-color', 'rgba(77, 72, 61, 1)');
	// }

	jQuery('.dropdown-toggle').click(function () {
		var location = jQuery(this).attr('href');
		window.location.href = location;
		return false;
	});
});

// PARALLAX ANIMATIONS
if (fileName == '/about.html') {
	$(document).ready(function () {
		var parallaxElement = document.getElementsByClassName('parallax-item');
		new simpleParallax(parallaxElement, {
			overflow: true,
			delay: 0.6,
			transition: 'cubic-bezier(0, 1, 0, 1)',
			// scale: '1.2'
		});
	});
}

// FOR SERVICES PAGE
if (fileName == '/services.html') {
	// Execute when document loads
	$(document).ready(function () {
		zoom();
		$('.service__img').css('height', parallaxFactor * 100 + '%'); // For parallax
		parallax();
		imageSizing();
	});

	// Execute on scroll
	$(document).scroll(function () {
		zoom();
		parallax();
	});

	// Execute on resize
	$(window).resize(function () {
		imageSizing();
	});

	// Background Zoom Effect
	let zoomFactor = 50;
	function zoom() {
		if ($(window).width() > 992) {
			let viewportHeight = $(window).height();
			let viewportBottom = $(window).scrollTop() + viewportHeight;
			$('.all-service').each(function (index) {
				let imageTop = $(this).offset().top;
				let imageHeight = $(this).outerHeight();
				percentage = 100 + zoomFactor * (1 - (viewportBottom - imageTop) / (viewportHeight + imageHeight));
				$(this).css('background-size', percentage + '%');
			});
		} else {
			$('.all-service').css('background-size', 'cover');
		}
	}

	// Image Parallax Effect
	let parallaxFactor = 1.5;
	let parallaxRange = ((parallaxFactor - 1) / parallaxFactor) * 100;
	function parallax() {
		let viewportHeight = $(window).height();
		let viewportBottom = $(window).scrollTop() + viewportHeight;
		$('.service__img').each(function () {
			let imageTop = $(this).parent().offset().top;
			let imageHeight = $(this).parent().outerHeight();
			let percentage = ((viewportBottom - imageTop) / (viewportHeight + imageHeight) - 0.5) * parallaxRange;
			$(this).css('transform', 'translateY(' + percentage + '%)');
		});
	}

	// Image Sizing
	function imageSizing() {
		let height = $('.service').outerHeight();
		if ($(window).width() > 977) {
			$('.service__img-container').css({ 'max-height': height + 'px', 'height': height + 'px' });
		} else {
			$('.service__img-container').css({ 'max-height': '200px', 'height': '200px' });
		}
	}
}

// LIGHTBOX SETTINGS
if (fileName == '/portfolio.html' || '/') {
	lightbox.option({
		'disableScrolling': true,
		'fadeDuration': 0,
		'imageFadeDuration': 0,
		'resizeDuration': 400,
		'wrapAround': true,
	});
}

// CAROUSEL SETTINGS
$('.carousel').carousel({
  interval: 4000
})