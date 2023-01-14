
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
//import { ref, set, get, getDatabase, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4kTjBxaAcmsz5QutEWu5QD_Vh89cpYJI",
    authDomain: "flutter-firebase-b11a3.firebaseapp.com",
    databaseURL: "https://flutter-firebase-b11a3-default-rtdb.firebaseio.com",
    projectId: "flutter-firebase-b11a3",
    storageBucket: "flutter-firebase-b11a3.appspot.com",
    messagingSenderId: "63657748609",
    appId: "1:63657748609:web:6f9931fb36974edb73c580",
    measurementId: "G-Q47YJESETB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
let inpEmail = document.getElementById("email")
let inpMotDePasse = document.getElementById("password")
let inpConfirmeMotDePasse = document.getElementById("confirmPassword");
let divInfo = document.getElementById("divInfo");
let btnCreer = document.getElementById("creer");
function creerCompte() {
    if (!(inpMotDePasse.value === inpConfirmeMotDePasse.value)) {
        divInfo.innerHTML = "Mot de passe invalid";
        divInfo.style.color = 'red';
        console.log("divInfo");
    } else {
        console.log("signin");
        createUserWithEmailAndPassword(auth, inpEmail.value, inpMotDePasse.value).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            divInfo.innerHTML = "compte crée avec succes";
            divInfo.style.color = 'green';
            inpEmail.value = "";
            inpMotDePasse.value = "";
            inpConfirmeMotDePasse.value = "";
            window.location.assign("../html/login.html");
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
                divInfo.style.color = 'red';
                divInfo.innerHTML = "Erreur verifiez votre connexion ou soit vos information de compte sons invalides";
            });
    }
}

btnCreer.addEventListener("click", creerCompte);