//@prepros-prepend vendor/magnific-popup.js
//@prepros-prepend vendor/TweenMax.min.js
//@prepros-prepend vendor/ScrollMagic.min.js
//@prepros-prepend vendor/animation.gsap.min.js
//@prepros-prepend vendor/jquery.smoothState.js

$(function() {

    // for init after SmoothState page transition
    initPlugins();
    function initPlugins() {

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

        // Request Info Popup
        $('li.button a').magnificPopup({
            type: 'inline',
            midClick: true,
            // Delay for animation
            removalDelay: 250,
            // Class that is added to popup wrapper and background
            mainClass: 'mfp-fade',
            focus: 'input[name="your-name"]'

        });

        ////////////////////////////////////////
        // 360 Photo animation
        ////////////////////////////////////////
        var images = $("#rotate-photos .hidden img").map(function() {
            return $(this).attr("src");
        });

        // TweenMax can tween any property of any object. We use this object to cycle through the array
        var obj = { curImg: 0 };

        // create tween
        var tween = TweenMax.to(obj, 0.5, {
            curImg: images.length - 1, // animate propery curImg to number of images
            roundProps: "curImg", // only integers so it can be used as an array index
            repeat: 0, // repeat 3 times
            immediateRender: true, // load first image automatically
            ease: Linear.easeNone, // show every image the same ammount of time
            onUpdate: function() {
                $("#rotate-photo").attr("src", images[obj.curImg]); // set the image source
            }
        });

        // init controller
        var controller = new ScrollMagic.Controller();

        // build scene
        var scene = new ScrollMagic.Scene({ triggerElement: ".features", duration: 300 })
            .setTween(tween)
            .addTo(controller);

    };

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
        },
        smoothState = $('#site-main').smoothState(options).data('smoothState');

});
