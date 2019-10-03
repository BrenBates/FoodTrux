var cors = 'https://cors-anywhere.herokuapp.com/';
var queryURL = "https://api.yelp.com/v3/businesses/"
var input = $(".testInput").text()
var city = $(".city").text() + "/reviews";
var parsedCity = city.toLocaleLowerCase().split(" ").join("-");
var parsedInput = input.toLocaleLowerCase().split(" ").join("-");
$.ajax({
    url: cors + queryURL + parsedInput + "-" + parsedCity,
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
var cors = 'https://cors-anywhere.herokuapp.com/';
var queryURL = "https://api.yelp.com/v3/businesses/search?term=the-red-food-truck&location=84115"

$.ajax({
    url: cors + queryURL,
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