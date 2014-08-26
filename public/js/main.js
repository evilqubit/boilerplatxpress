jQuery(document).ready(function($){
    var name = $(".prf-name").html();
    var abbr = name.match(/[a-zA-Z]+\s?\w/);
    $(".prf-name").html(abbr[0]+".");
    //Nav-Bar pop over
    var landing_page = $('.new_landing_popover_menu');
    $(".container_fixed_landing .menu").on("mouseenter", function(event){
        landing_page.stop(true, true).fadeIn('600');
    });
    landing_page.on("mouseleave", function(event){
        landing_page.stop(true, true).fadeOut('600');
    });

    //Nav-Bar shadow
    var nav = $('.landing_fixed_menu'); // Change to nav div
    var nav_class = 'shadow-nav'; // Change to class name
    var threshold = 100; // Change to pixels scrolled

    $(window).scroll(function () {
        var distance = $(this).scrollTop();
        if (distance > threshold) { // If scrolled past threshold
            nav.addClass(nav_class); // Add class to nav
        } else { // If user scrolls back to top
            if (nav.hasClass(nav_class)) { // And if class has been added
                nav.removeClass(nav_class); // Remove it
            }
        }
    });

    //Scroll To Map
     $('#neighborhood').click(function(){
        $('html, body').animate({
            scrollTop: $('.bottom-container').position().top },
            1000
        );
    });

    //Slider
    $('.slider-container').flexslider({
        animation: "fade",
        prevText: "",
        nextText: "",
        itemWidth: "100%",
        slideshow: true,
        after: function(){
                var max_num = $(".slider-container ol li").length;
                var active = $(".slider-container ol li .flex-active").html();
                var current_active = $('.current-slide');
                var max_slide = $('.max-slide');
                current_active.html(active);
                max_slide.html(max_num);
        }
    });

    //Slider nav-control
    var max_num = $(".slider-container ol li").length;
    var max_slide = $('.max-slide');
    max_slide.html(max_num);

});
