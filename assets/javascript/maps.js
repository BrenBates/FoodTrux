    
    
    //Maps script 

    var map, infoWindow; 

    function createMap () { 
        var options = { 
            center: { lat: 40.7761563, lng: -111.8945562},
            zoom: 10,
            // draggable: false,
            // mapTypeId: google.maps.MapTypeId.HYBRID,
            // disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map'),options);

        infoWindow = new google.maps.InfoWindow; 
        
    var locations = [
      ['Salt Lake City', 40.7761563, -111.8945562, 4],
      ['Draper', 40.5247, -111.8638, 5],
      ['Ogden', 41.2230, -111.9738, 3],
      ['South Jordan', 40.5622, -111.9297, 2],
      ['Sandy', 40.5650, -111.8390, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(40.7761563, -111.8945562),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}