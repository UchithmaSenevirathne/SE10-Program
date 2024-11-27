//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkW6sMPh9jDDsjpXF8rVQkBDCCBXmxynE",
    authDomain: "fir-practice-ae942.firebaseapp.com",
    projectId: "fir-practice-ae942",
    storageBucket: "fir-practice-ae942.appspot.com",
    messagingSenderId: "1080804585165",
    appId: "1:1080804585165:web:6d3f17451b2c37479f0384"
};

//firebase initialize
firebase.initializeApp(firebaseConfig);

//auth module enable
const auth = firebase.auth()

//signup - using auth module

document.getElementById('reg-btn')
    .addEventListener('click', () =>{
        //setup variables for catch email, pwd
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //create user
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log("User registered: ", user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                console.error("Error during registration: ", errorCode, errorMessage);
            });
    })
//signin - using auth module

document.getElementById('log-btn')
    .addEventListener('click', () =>{
        //setup variables for catch email, pwd
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //create user
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log("User signed in: ", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error during sign-in: ", errorCode, errorMessage);
            });
    })
