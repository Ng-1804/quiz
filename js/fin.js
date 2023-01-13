
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
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerHTML = "Score final: "+mostRecentScore;

const db = getDatabase()
var date_ = Date.now().toString();
    set(ref(db, "statistics/" + Date.now().toString()), {
        email: getCookie('email'),
        score:mostRecentScore
    }).then(data => {
        console.log('score saved')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('score error')
    })

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Save High Score to Local Storage
saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: finalScore.innerText,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("../html/listhautscore.html");
};
