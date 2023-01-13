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
var ret = [];

var uid = "";
function connexion() {
    signInWithEmailAndPassword(auth, getCookie('email'), getCookie('password')).then((userCredential) => {
        const user = userCredential.user;
        uid = user.uid;
        read();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
connexion();

function read() {
  const db = getDatabase();
  const starCountRef = ref(db, 'questions/');
  var tab = [];
  onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      tab = Object.values(snapshot.val());
    
      //console.log("-----------------"+console.log(tab));

      for (let index = 0; index < tab.length; index++) {

        var q = {
          choixsujet: tab[index].choixsujet,
          question: tab[index].question,
          auteur: tab[index].auteur,
          choice1: tab[index].choix1,
          choice2: tab[index].choix2,
          choice3: tab[index].choix3,
          choice4: tab[index].choix4,
          answer: tab[index].reponse
        }
        //console.log(ret);
        ret.push(q);
        
      }
      console.log(ret);
      localStorage.setItem('questions', JSON.stringify(ret));;
      ///return ret;
      
      //document.getElementById('data').innerHTML = snapshotToArray(snapshot)[0].auteur;
      //console.log(snapshotToArray(snapshot));
  });
}


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