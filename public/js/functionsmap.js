function initialize() {
        var latitude = 37.7990,
            longitude = -122.3600,
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

        setMarkers(center, radius, map);
    }

    function setMarkers(center, radius, map) {
        var json = (function () {
            $.ajax({
                'async': false,
                'global': false,
                'url': "js/test.json",
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
            latLng = new google.maps.LatLng(data.lat, data.lng);

                if ((data.lat == 37.761647) && (data.lng == -122.412064)) {
                    // Creating a marker and putting it on the map
                    var image = 'images/Pin-(53px)-Orange.png';
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                });
              }


                // Creating a marker and putting it on the map
                var image = 'images/map_pin.png';
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                });
                infoBox(map, marker, data);

        }
    }

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
