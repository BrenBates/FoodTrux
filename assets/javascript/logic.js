$(document).ready(function () { 

    
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAcvshv4oMqKChcOEg0EpF6zn5qPqEqjpo",
        authDomain: "fuudtruckz.firebaseapp.com",
        databaseURL: "https://fuudtruckz.firebaseio.com",
        projectId: "fuudtruckz",
        storageBucket: "",
        messagingSenderId: "422049961079",
        appId: "1:422049961079:web:6795965fcaadf1bc3ae272"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    
        let database = firebase.database();
    
    //////////////////////////////////////////
    //User Authentication with Firebase SDK //
    //////////////////////////////////////////
    
    //Create an instance of the Google provider object 
    
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    
    //Authenticate with Firebase using the Google provider object. You can prompt your users to sign in with their Google Accounts either by opening a pop-up window
    //or by redirecting to the sign-in page. The redirect method is preferred on mobile devices.
    
    //Signing in with sign-in page redirect
    
    $('#logIn').on('click', function(event) {
    
    console.log('Hello World!');
    
    firebase.auth().signInWithRedirect(provider);
    
    //Retrieve the Google provider's OAuth token by calling getRedirectResult when your page loads: 
    
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // This is also where you can catch and handle errors. For a list of error codes have a look at the Auth Reference Docs.  https://firebase.google.com/docs/reference/js/firebase.auth.Auth#getRedirectResult
      });
    
    
    });
    
    
    
    
    });