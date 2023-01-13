
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { ref, set, get, getDatabase, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function connexion() {
    signInWithEmailAndPassword(auth, getCookie('email'), getCookie('password')).then((userCredential) => {
        const user = userCredential.user;
        console.log(getCookie('email'));
        console.log(getCookie('password'));
        console.log(user.email);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}



connexion();
let ajouter = document.getElementById("ajouter");
let divInfo = document.getElementById("divInfo");
function ajouterQuestion() {
    let choixsujet = document.getElementById("choixsujet").value;
    let question = document.getElementById("question").value;
    let choix1 = document.getElementById("choix1").value;
    let choix2 = document.getElementById("choix2").value;
    let choix3 = document.getElementById("choix3").value;
    let choix4 = document.getElementById("choix4").value;
    let choixbonereponse = document.getElementById("choixbonereponse").value;

    const db = getDatabase()
    set(ref(db, "questions/" + Date.now().toString()), {
        choixsujet: choixsujet,
        question: question,
        choix1: choix1,
        choix2: choix2,
        choix3: choix3,
        choix4: choix4,
        reponse: choixbonereponse,
        auteur: auth.currentUser.email
    }).then(data => {
        divInfo.innerHTML = "data saved successfully";
        divInfo.style.color = 'green';
        document.getElementById("choixsujet").value = "";
        document.getElementById("question").value = "";
        document.getElementById("choix1").value = "";
        document.getElementById("choix2").value = "";
        document.getElementById("choix3").value = "";
        document.getElementById("choix4").value = "";
        document.getElementById("choixbonereponse").value = "";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + "--->" + errorCode);
    });
}

ajouter.addEventListener('click', ajouterQuestion)


