let dataArray = [];
var foodTruck;
var cors = 'https://cors-anywhere.herokuapp.com/';
var queryURL = "https://api.yelp.com/v3/businesses/"
var city ;
var parsedFoodTruck;
var parsedCity;


db.collection("users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        dataArray.push(doc.data());
        foodTruck = dataArray[0].displayName;
        parsedFoodTruck = foodTruck.toLocaleLowerCase().split(" ").join("-");
        console.log(parsedFoodTruck);
        city = dataArray[0].City + "/reviews";
        parsedCity = city.toLocaleLowerCase().split(" ").join("-");
        console.log(parsedCity)
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

    });
});

