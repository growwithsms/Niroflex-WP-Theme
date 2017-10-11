//@prepros-prepend vendor/magnific-popup.js
//@prepros-prepend vendor/TweenMax.min.js
//@prepros-prepend vendor/ScrollMagic.min.js
//@prepros-prepend vendor/animation.gsap.min.js
//@prepros-prepend vendor/jquery.smoothState.js
//@prepros-prepend vendor/flickity.pkgd.min.js


// for init after SmoothState page transition
initPlugins();
function initPlugins() {

    ////////////////////////////////////////
    // Smooth scroll to anchors
    ////////////////////////////////////////
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
    });

    ////////////////////////////////////////
    // Mobile Menu
    ////////////////////////////////////////
    var $nav_main = $('.nav-main'),
        $nav_trigger = $('.nav-trigger');

    $nav_trigger.click(function() {
        console.log('clicked!');
        $nav_main.toggleClass('active');
        $nav_trigger.toggleClass('active');
        return false;
    });

    ////////////////////////////////////////
    // Request Info Popup
    ////////////////////////////////////////
    $('li.button a').magnificPopup({
        type: 'inline',
        midClick: true,
        // Delay for animation
        removalDelay: 250,
        // Class that is added to popup wrapper and background
        mainClass: 'mfp-fade',
        focus: 'input[name="your-name"]'

    });

    $('.user_or_distributor input').on('change', function(){
        if( $(this).val() == 'Distributor' ) {
            $('.preferred-supplier').addClass('active');
        } else {
            $('.preferred-supplier').removeClass('active');
        }
    });

    ////////////////////////////////////////
    // Customer carousel
    ////////////////////////////////////////
    $('.customer-logos').flickity({
        imagesLoaded: true,
        prevNextButtons: false,
        autoPlay: true,
        wrapAround: true,
        pageDots: false
    });

    ////////////////////////////////////////
    // 360 Photo animation
    ////////////////////////////////////////
    // var images = $("#rotate-photos .hidden img").map(function() {
    //     return $(this).attr("src");
    // });

    // // TweenMax can tween any property of any object. We use this object to cycle through the array
    // var obj = { curImg: 0 };

    // // create tween
    // var tween = TweenMax.to(obj, 0.5, {
    //     curImg: images.length - 1, // animate propery curImg to number of images
    //     roundProps: "curImg", // only integers so it can be used as an array index
    //     repeat: 0, // repeat 3 times
    //     immediateRender: true, // load first image automatically
    //     ease: Linear.easeNone, // show every image the same ammount of time
    //     onUpdate: function() {
    //         $("#rotate-photo").attr("src", images[obj.curImg]); // set the image source
    //     }
    // });

    // // init controller
    // var controller = new ScrollMagic.Controller();

    // // build scene
    // var scene = new ScrollMagic.Scene({ triggerElement: ".features", duration: 300 })
    //     .setTween(tween)
    //     .addTo(controller)
    //     .offset(170);

    // // destroy controller if leaving home page
    // if( $('.home').length ) {
    //     $('.nav-item-link').on('click', function() {
    //         controller.destroy(true);
    //         controller = null;
    //     });
    // }


}



// SmoothState.js - page transitions
var options = {
    anchors: 'a:not([href*="#"]):not([href$=".pdf"]):not([href$=".jpg"]):not([href$=".png"])',
    prefetch: true,
    cacheLength: 2,
    blacklist: 'form, .no-smoothState',
    onStart: {
        duration: 200, // Duration of our animation
        render: function($container) {
            $container.addClass('is-exiting');

            var pageHeight = $(window).height(),
                headerHeight = $('.site-header').height(),
                animateHeight = (pageHeight - headerHeight) / 100;

            $('.page-animation-red').css({
                'transform': 'scaleY(' + animateHeight + ')  translateY(0)',
                'opacity': '',
                'transition': ''
            });

            $(document.body).animate({scrollTop: 0}, 300);

            // Restart your animation
            smoothState.restartCSSAnimations();

        }
    },
    onReady: {
        duration: 200,
        render: function($container, $newContent) {
            $container.removeClass('is-exiting');

            var pageHeight = $(window).height(),
                headerHeight = $('.site-header').height(),
                animateHeight = (pageHeight - headerHeight) / 100;

            $('.page-animation-red').css({
                'transform': 'scaleY(' + animateHeight + ') translateY(-100%)'
            });
            // Inject the new content
            $container.html($newContent);
        }
    },
    onAfter: function($container, $newContent) {
        $('.page-animation-red').css({
            'opacity': '0',
            'transition': 'transform 0',
            'transform': ''
        });

        initPlugins();
    }
}

smoothState = $('#site-main').smoothState(options).data('smoothState');
