Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

jQuery(document).ready(function($){

    //Format Currency
    var ammount = $('.list-info li').first();
    var frmAmmount = ammount.text().split('$')[1];
    frmAmmount = frmAmmount/100;
    console.log(frmAmmount);
    ammount.html('<strong>Price Per Hour: $</strong>'+frmAmmount.formatMoney(2, '.', ','));

    //Stars
    var stars = $(".prf-raiting").attr('id');
    $('ul.prf-raiting li').each(function(i){
        if (stars <= i)
            $(this).addClass('off');
    })

    //Remove Last comma
    $('.comma').last().text('.');

    var host = document.location.origin;
    var production = false;
    if(host == "http://www.peerspace.com"){
        production = true;
    }

    var name = $(".prf-name").html();
    var abbr = name.match(/[a-zA-Z]+\s?\w/) || 'unkown';
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
    var threshold = 150; // Change to pixels scrolled
    var get_app = $(".landing_get_app");
    $(window).scroll(function () {
        var distance = $(this).scrollTop();
        if (distance > threshold) { // If scrolled past threshold
            nav.addClass(nav_class); // Add class to nav
            get_app.show();
        } else { // If user scrolls back to top
            if (nav.hasClass(nav_class)) { // And if class has been added
                nav.removeClass(nav_class); // Remove it
                get_app.hide();
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
    var max_num = $(".slider-container ul li").length;
    if (max_num == 1){
        $('.slider-container').css("visibility","visible");
        $('ul.slides li').css('width','100%');
        $('.slide-control-num').css("visibility","hidden");
    }
    else{
        $('.slide-control-num').css("visibility","visible");
        //Slider
        $('.slider-container').flexslider({
            animation: "fade",
            prevText: "",
            nextText: "",
            itemWidth: "100%",
            slideshow: true,
            after: function(){

                    $('.slider-container').css("visibility","visible");
                    var active = $(".slider-container ol li .flex-active").html();
                    var current_active = $('.current-slide');
                    var max_slide = $('.max-slide');
                    current_active.html(active);
                    max_slide.html(max_num);
            }
        });
    }

    //Slider nav-control
    var max_num = $(".slider-container ol li").length;
    var max_slide = $('.max-slide');
    max_slide.html(max_num);

    //Maps
    function initialize() {
            var latitude = $("#lat").val(),
                longitude = $("#lon").val(),
                radius = 8000, //how is this set up
                center = new google.maps.LatLng(latitude,longitude),
                bounds = new google.maps.Circle({center: center, radius: radius}).getBounds(),
                mapOptions = {
                    center: center,
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

            var image = host+'/spaces/images/map_pin.png';
            var data = {'latitude':latitude,'longitude':longitude}
            latLng = new google.maps.LatLng(data.latitude, data.longitude);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image
            });
            infoBox(map, marker, data);
        }

        /*
        function setMarkers(center, radius, map) {
            var json = (function () {
                $.ajax({
                    'async': false,
                    'global': false,
                    'url': host + (production == true ? "/spaces/api/geo" : "/api/geo"),
                    'dataType': "json",
                    'success': function (data) {
                         json = data;
                     }
                });
                return json;
            })();
            //loop between each of the json elements
            for (var i = 0, length = json.length; i < length; i++) {
                var data = json[i],
                latLng = new google.maps.LatLng(data.latitude, data.longitude);

                    if ((data.latitude == $("#lat").val()) && (data.longitude == $("#lon").val())) {
                        // Creating a marker and putting it on the map
                        var image = host+'/spaces/images/Pin-(53px)-Orange.png';
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: image
                    });
                  }


                    // Creating a marker and putting it on the map
                    var image = host+'/spaces/images/map_pin.png';
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: image
                    });
                    infoBox(map, marker, data);

            }
        }
*/
        function infoBox(map, marker, data) {
            var infoWindow = new google.maps.InfoWindow();
            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent(data.content);
                infoWindow.open(map, marker);
            });

            // Creating a closure to retain the correct data
            // Note how I pass the current data in the loop into the closure (marker, data)
            (function(marker, data) {
              // Attaching a click event to the current marker
              google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent(data.content);
                infoWindow.open(map, marker);
              });
            })(marker, data);
        }

       google.maps.event.addDomListener(window, 'load', initialize);

    $('ul.slides li').each(function(i, item){
            var image = new Image();
            var thisLi = $(this);
            var imageD = thisLi.find('img');
            image.src = imageD.attr('src');

            image.onload = function(){
                if(image.width <= image.height ){
                    imageD.removeClass('landscape');
                    var ratio = image.width/image.height;
                    $('<img style="margin-left:-'+ratio*400/2+'px;" class="small-img" src="'+image.src+'" />').appendTo(thisLi.find('a'));
                    if (max_num == 0)
                        $('ul.slides li a img.small-img').css('top','67px');
                    else
                        $('ul.slides li a img.small-img').css('top','0');
                    imageD.css({'-webkit-filter' : 'blur(5px)'
                                ,'-webkit-transition': 'none'
                                ,'transition': 'none'});
                }

            }
    });
});
