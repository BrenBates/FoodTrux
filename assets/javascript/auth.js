    $(window).on('load', function () {

        ////////////////////////////////
        // LOGIC.JS section ///////////
        ///////////////////////////////

        //Toggle logged out and logged in links depending on the user state.

        let loggedOutLinks = document.querySelectorAll('.logged-out');
        let loggedInLinks = document.querySelectorAll('.logged-in');

        const setUpUI = (user) => {

            if (user) {
                
                console.log(user);
                let userHTML = $('<div>');
                

                if(user.email) {
                    userHTML.html(`Logged in as ${user.email} ` + '<br>'
                    + `Current Location: ${user.Address}`
                    );
                } else {
                    // userHTML.text(`Logged in as ${user.email}`);
                }

                //update account info
                $('#accountInfo').empty().append(userHTML);
                //toggle UI elements

                loggedOutLinks.forEach(item => item.style.display = 'none');
                loggedInLinks.forEach(item => item.style.display = 'block');

            } else {
                //hide account info 
                $('#accountInfo').empty();
                //toggle UI elements 
                loggedInLinks.forEach(item => item.style.display = 'none');
                loggedOutLinks.forEach(item => item.style.display = 'block');

            }
        }

        //Example of building on the DOM with data from database. 

        let setUpLocations = (data) => {

            //If there is data (since we're logged in) then put on the page necessary information.
            if (data.length) {

                let html = '';
                data.forEach(doc => {
                    const location = doc.data();
                    const li = `
                <li>
                    <div>${location.Address}</div>
                    <div>${location.City}</div>
                    <div>${location.State}</div>
                </li>
            `;
                    html += li;

                });


                $('.locations').html(html);
                //If there is no data, show a message to login to see locations
            } else {
                $('.locations').html('<h5 class = "center-align">Login to view locations</h5>')
            }

        }

        ////////////////////////////////
        // AUTH.JS section ///////////
        ///////////////////////////////

        //listen for auth status changes
        auth.onAuthStateChanged(user => {
            db.collection('Locations').onSnapshot(snapshot => {

                if (user) {
                    //get a snapshot of the guides collection on firestore and run the setupGuides function on it
                    setUpLocations(snapshot.docs);
                    setUpUI(user);

                    console.log('user logged in: ', user);
                } else {
                    setUpLocations([]);
                    setUpUI();
                    console.log('user logged out');
                }

            }, err => {
                console.log(err.message)
            });
        });

        // Create a new location for the food truck.  Store the data in locations and users collections.  This will allow us to pin where that food truck is
        // but also keep track of popular food truck locations.

        let createLocation = document.querySelector('#newLocationForm');

        $('#newLocationSubmit').on('click', function (event) {
            event.preventDefault();


            let user = firebase.auth().currentUser;

            if (user) {
                user.Address = $('#location-address').val().trim();
                user.City = $('#location-city').val().trim();
                user.State = $('#location-state').val().trim();

                db.collection('users').doc(user.uid).update({
                    Address: user.Address,
                    City: user.City,
                    State: user.State
                });
            }

            let modal = $('#modalNewLocation').modal('hide');
            createLocation.reset();


            // db.collection('Locations').add({
            //     Address: $('#location-address').val().trim(),
            //     City: $('#location-city').val().trim(),
            //     State: $('#location-state').val().trim()
            // }).then(() => {
            //     let modal = $('#modalNewLocation').modal('hide');
            //     createLocation.reset();
            // }).catch(err => {
            //     console.log(err.message);
            // });

               
        });


        // signup a new user

        const signInForm = document.querySelector("#signUpForm");

        $('#submitSignUp').on('click', function (event) {
            
            event.preventDefault();

            let email = $('#signup-email').val().trim();
            let password = $('#signup-password').val().trim();
            let name = $('#signup-displayname').val().trim();

            console.log(email, password, name);

            // sign up the user using the auth method of createUserWithEmailAndPassword
            auth.createUserWithEmailAndPassword(email, password).then(cred => {

                let user = firebase.auth().currentUser;

                return db.collection('users').doc(user.uid).set({
                    displayName: name
                });
            });

            let modal = $('#modalSignUp').modal('hide');
            signUpForm.reset();
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
            console.log('hello');
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