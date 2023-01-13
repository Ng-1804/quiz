  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  

