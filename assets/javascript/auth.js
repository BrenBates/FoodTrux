    $(document).ready(function () {

        //listen for auth status changes
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log('user logged in: ', user);
            } else { 
                console.log('user logged out');
            }

        });
        
        
        // signup a new user

        const signUpForm = document.querySelector('#signUpForm');


        $('#signUpSubmit').on('click', function (event) {
            event.preventDefault();
            let email = $('#signup-email').val().trim();
            let password = $('#signup-password').val().trim();
            console.log(email, password);

            // sign up the user using the auth method of createUserWithEmailAndPassword
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                
                let modal = $('#modalSignUp').modal('hide');
                signUpForm.reset();

            });
        });


        //log out the user when logout button is clicked 
        $('#logOut').on('click', function (event) {
            event.preventDefault();
           
            // log out the user 
            auth.signOut();

        });


          //log in the user when login button is clicked and info input

          const logInForm = document.querySelector("#logInForm")
          $('#logInSubmit').on('click', function (event) {
            event.preventDefault();
            let email = $('#login-email').val().trim();
            let password = $('#login-password').val().trim();
            
            auth.signInWithEmailAndPassword(email, password).then(cred => {
                
                //close the log in modal and reset the form
                let modal = $('#modalLogIn').modal('hide');
                logInForm.reset();
            });
           
          

        });


    });







    //Create an instance of the Google provider object 

    // var provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider);

    //Authenticate with Firebase using the Google provider object. You can prompt your users to sign in with their Google Accounts either by opening a pop-up window
    //or by redirecting to the sign-in page. The redirect method is preferred on mobile devices.

    //Signing in with sign-in page redirect

    // $('#logIn').on('click', function(event) {

    // console.log('Hello World!');

    // firebase.auth().signInWithRedirect(provider);

    // //Retrieve the Google provider's OAuth token by calling getRedirectResult when your page loads: 

    // firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = result.credential.accessToken;
    //       // ...
    //     }
    //     // The signed-in user info.
    //     var user = result.user;
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // This is also where you can catch and handle errors. For a list of error codes have a look at the Auth Reference Docs.  https://firebase.google.com/docs/reference/js/firebase.auth.Auth#getRedirectResult
    //   });


    // });