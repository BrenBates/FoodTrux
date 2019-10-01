# Project-1

Project Title: Fuud Trukx 

Trello Board: https://trello.com/b/fWcucCBN/project1


Pencil picture layout for the web page is attached to the Trello.

Sketch of the design: 

Team Members: Myles, Kyle, Brennen

APIs to be used: Google Maps API, Yelp API

Project description: 

Generate a web app that allows users to conveniently locate where food trucks are on a map and see reviews and the food truck site.  There will be two different login types on the page, one for foodtruck owners and one for users for additional features.   There will also be a base home page.

Base Homepage Features:
    Basic search - with a modal popup to prompt them to sign up to save their searches, or ignore.
    
Two different logins for additional features 

Foodtruck Login Features: 
    Need a form for them to input their information.  Food Category / address.
    Only they can update their location, nobody else.
    Force foodtrucks to sign in for their name as a username.  Allow spaces as a username.  

Customer Login Features: 
    Name
    zip code
    location
    type of food 
    Customer reviews input screen 
    Save their favorite food trucks, so if they move they can locate them.


Rough breakdown of tasks: 

    1. Build HTML wireframe 
        a.Build Foodtruck information form
        b. Need link to foodtruck info form on the page - navbar?
    2. Style with CSS 
    3. Start a Firebase Database and pull in inputs from Foodtruck information form
    4. Use foodtruck information to query API for Yelp 
    5. Use foodtruck information to query API for Google Maps for location
    6. Develop Firebase user authentication for food truck and customer logins.
    7. Style page differently based on food truck and customer login. 
   



_______________________________________________________________________________________________________________________________________________
Yelp API information

Yelp App Name = FoodTrux
Yelp Client ID = c9a6S4rrdzfdtCBuKg3n6A
Yelp API Key = WrRLVyL0emxzhfACAN0CxMijIiIeEx21Zec9OsJBC0CCUuF4XJe9alBN_v6CKGe8WysIsLd_Lfo6X-KuKM5ywG2RhYIvBc-BdGoCA-RgbCxOIABnMXhvIZ-Y2GuSXXYx
Code Samples on GitHub = https://github.com/Yelp/yelp-fusion#code-samples

example GET https://api.yelp.com/v3/businesses/search?limit=2&location=Roma&locale=it_IT&categories=indpak&term=restaurant

https://api.yelp.com/v3/businesses/search?limit=2&locale=en_US&Authorization&Authorization=WrRLVyL0emxzhfACAN0CxMijIiIeEx21Zec9OsJBC0CCUuF4XJe9alBN_v6CKGe8WysIsLd_Lfo6X-KuKM5ywG2RhYIvBc-BdGoCA-RgbCxOIABnMXhvIZ-Y2GuSXXYx

Steps to get necessary information: 

First get business with the business search endpoint
GET https://api.yelp.com/v3/businesses/search?name=kiitos 
https://www.yelp.com/developers/documentation/v3/business_search
Next get reviews with the business/{id}/reviews endpoint using the business ID from the business search endpoint
GET https://api.yelp.com/v3/businesses/{id}/reviews?
https://www.yelp.com/developers/documentation/v3/business_reviews

Video on Postman chrome extension to do Yelp API - https://www.youtube.com/watch?v=0Sy14hX8T-A
______________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________
Google Maps API Information


Maps Javascript API infromation: https://developers.google.com/maps/documentation/javascript/tutorial
Tutorial for Google Maps API v3.36: https://www.youtube.com/watch?v=oVr6unKZbg4

______________________________________________________________________________________________________________________________________________



