    let map, infoWindow, marker; 
    let locations = []; 
    dataArray = [];
    let foodTruck;
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let queryURL = "https://api.yelp.com/v3/businesses/"
    let city ;
    let parsedFoodTruck;
    let parsedCity;


    //Nested the Yelp AJAX request inside the on click which is inside the google maps creation function.  This allowed us to only query our data base one time for the needed data.

    function createMap () { 

    //Set up the basic map and center it on Salt Lake City for now.

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(40.7761563, -111.8945562),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

    //Query the Firebase database to pull in all users information and push it into our dataArray.
      db.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            dataArray.push(doc.data());
            

    //Looping through the data array and putting it into new formatting needed to create all of the markers on the google Map.
    for (let i = 0; i < dataArray.length; i++) {  

        
      locations[i] = [dataArray[i].displayName, dataArray[i].Latitude, dataArray[i].Longitude, dataArray[i].zipCode, dataArray[i].yelpCity, i+1];
  
      infowindow = new google.maps.InfoWindow();
  
    //Create new Google maps marker
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });
  
    //On click function for the markers.  When you click on a marker it will query Yelp.
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);

            foodTruck = locations[i][0];
            parsedFoodTruck = foodTruck.toLocaleLowerCase().split(" ").join("-");
            console.log(parsedFoodTruck);
            city = locations[i][4];
            parsedCity = city.toLocaleLowerCase().split(" ").join("-");
            console.log(parsedCity);

            $.ajax({
              url: cors + queryURL + parsedFoodTruck + "-" + parsedCity,
              method: "GET",
              headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Authorization": "Bearer WS8n-Flb5OtfN8lYl8iyGgwC6x0wUZtgY26RugjGZD32PMwsgFz87eRCGk5KmZK5i0nNrKVGCG0-8vxKjBsJhRYxD_P4IC95wx2ivc8mteChGdUyIJIk3jaQqamSXXYx"
              },
          }).then(res => {
              console.log('res', res)
          }).catch(err => {
              console.log('err', err)
          })
          
          }
        })(marker, i));
      }
        });
    });

}