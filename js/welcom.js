
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
        let nom = document.getElementById("nom");
        let divInfo = document.getElementById("divInfo");
        nom.innerHTML = "<strong>" + auth.currentUser.email + "</strong>";
        divInfo.innerHTML = new Date.now();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

connexion();

function read() {
    var listhautscore = document.getElementById("listhautscore");
    const db = getDatabase();
    const starCountRef = ref(db, 'statistics/');
    var tab = [];
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        tab = Object.values(snapshot.val());

        console.log("-----------------" + console.log(tab), tab.length);
        for (let index = 0; index < tab.length; index++) {
            //console.log(index);
            if (tab[index].email === getCookie('email')) {
                const li = document.createElement("li");
                li.className = "hautscore"
                li.innerHTML = tab[index].email + ": " + tab[index].score;
                listhautscore.appendChild(li);
            }
        }


        //document.getElementById('data').innerHTML = snapshotToArray(snapshot)[0].auteur;
        //console.log(snapshotToArray(snapshot));
    });
}

read();


