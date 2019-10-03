$(window).on('load', function () {     
  


    //Maps script 

    var map; 

    function createMap () { 
        var options = { 
            center: { lat: 43.654, lng: -79.383},
            zoom: 10,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map'),options);
    }
  
 
    });