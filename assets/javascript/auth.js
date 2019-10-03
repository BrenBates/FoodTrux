    $(window).on('load', function () {
  
        

        ////////////////////////////////
        // LOGIC.JS section ///////////
        ///////////////////////////////

        //Toggle logged out and logged in links depending on the user state.

        let loggedOutLinks = document.querySelectorAll('.logged-out');
        let loggedInLinks = document.querySelectorAll('.logged-in');

        const setUpUI = (user) => {


            if (user) {
                
                
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
                    <div>${users.Address}</div>
                    <div>${users.City}</div>
                    <div>${users.State}</div>
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


        //Query all food truck data and push to dataArray

        let dataArray = [];

        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                dataArray.push(doc.data());
                console.log('this is the data Array');
                console.log(dataArray);
            });
        });

        


        ////////////////////////////////
        // AUTH.JS section ///////////
        ///////////////////////////////

        //listen for auth status changes
        auth.onAuthStateChanged(user => {
            db.collection('users').onSnapshot(snapshot => {

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

