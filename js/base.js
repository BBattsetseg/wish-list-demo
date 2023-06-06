let firebaseConfig = {
   apiKey: "AIzaSyA6iPdryUkFQczhVqzDw87xWjjFJVIaM4c",
  authDomain: "wishlist-fa4d5.firebaseapp.com",
  projectId: "wishlist-fa4d5",
  storageBucket: "wishlist-fa4d5.appspot.com",
  messagingSenderId: "465255851907",
  appId: "1:465255851907:web:a0e248690dc79479ce38b6",
  measurementId: "G-H86RH6LQCZ"
};

let userUID;
let userType;


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();



// Login

if (window.location.href.endsWith('login.html')) {

    document.querySelector('.loginBtn').onclick = () => {
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
            
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            userUID = user.uid;
            localStorage.setItem('userUID', userUID); 
            localStorage.setItem('userType', 'parent'); //type parents
            window.location.href = "profile-select.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    document.querySelector('.password').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector('.loginBtn').click();
        }
    });

    document.querySelector('.signUp').onclick = () => {
        window.location.href = "signup.html";
    }
}

// Log out

let $logOutBtn = document.querySelector('.logOut');
if ($logOutBtn != null) {
    $logOutBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
        }).catch((error) => {
            alert(error);
        });
    }
}

// Sign up

if (window.location.href.endsWith('signup.html')) {
    firebase.auth().signOut();
    let $signUpBtn = document.querySelector('#signup');
    let parentPin = document.querySelector('.pin')

    $signUpBtn.onclick = () => {
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            userUID = user.uid;            
            // Create new family collection
            // function createFamily(){
            //     console.log(userUID);               
            // }
            // createFamily();
            localStorage.setItem('userUID', userUID);  //family UID-glocal storage deer hadgalah
            console.log("log", userUID);
            //Create family collection
            db.collection('family').doc(userUID).set({
                createAt: new Date(),
                parintPin: parentPin.value,
                
            }).then(()=>  {
                console.log("log");
                firebase.auth().signOut();
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.log(error)
            }) 
            
           
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });   
    }

    parentPin.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $signUpBtn.click();
        }
    })

    document.querySelector('.loginBtn').onclick = () => {
        window.location.href = 'login.html';
    }
}

// onAuthStateChanged

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let uid = user.uid;
        if (window.location.href.endsWith('login.html')) {
            window.location.href = 'profile-select.html';
        }
    } else {
        localStorage.clear();
        if(window.location.href.endsWith('signup.html')) {
            return;
        }
        if(!window.location.href.endsWith('login.html')) {
            window.location.replace('login.html');
        } 
    }
});
