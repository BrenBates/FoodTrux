
    //Maps script 

    var map, infoWindow; 

    function createMap () { 
        var options = { 
            center: { lat: 40.839, lng: -111.892},
            zoom: 10,
            // draggable: false,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            // disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map'),options);

        infoWindow = new google.maps.InfoWindow;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) { 
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };
                console.log(position);
                infoWindow.setPosition(position);
                infoWindow.setContent('Your location!');
                infoWindow.open(map);

            }, function () { 
                handleLocationError('Geolocation service failed', map.center());
            })
        } else { 
            handleLocationError('No geolocation available', map.center());

        }

        var input = document.getElementById('search-location');
        var searchBox = new google.maps.places.SearchBox(input);

        //listener for bounds changed on the map, so we're only displaying info in the current bounds.
        map.addListener('bounds_changed', function() { 
            searchBox.setBounds(map.getBounds());
        })

        var markers = [];

        searchBox.addListener('places_changed', function() { 
            var places = searchBox.getPlaces();

            if(places.length === 0) {return;}

            markers.forEach(function (m) {m.setMap(null);});
            markers = [];

            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (p) { 
                if (!p.geometry)
                    return;

                    markers.push(new google.maps.Marker({
                        map: map,
                        title: p.name,
                        position: p.geometry.location
                    }));

                    if(p.geometry.viewport)
                        bounds.union(p.geometry.viewport);
                    else
                        bounds.extend(p.geometry.location);
            });
            map.fitBounds(bounds);
        });

    };


    function handleLocationError (content,position) {
        infoWindow.setPosition(position);
        infoWindow.setContent(content);
        infoWindow.open(map);
    }
  
 