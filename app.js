
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, addDoc, collection, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSoLqQmyZzSjI6_6DIINAm2iU3JeDhnLI",
  authDomain: "firestore-and-authentication.firebaseapp.com",
  projectId: "firestore-and-authentication",
  storageBucket: "firestore-and-authentication.firebasestorage.app",
  messagingSenderId: "434794202539",
  appId: "1:434794202539:web:3722eacf3df90b53a57eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db, "users");



const form = document.getElementById("signUpForm");
const emailInpt = document.getElementById("email");
const passwordInpt = document.getElementById("password");
const GoogleBtn = document.getElementById("googleBtn");
const signinBtn = document.getElementById("signinBtn");


form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!emailInpt.value || !passwordInpt.value) {
    alert("Please fill the forms.");
    return;
  }
  else{
  let emailVal = emailInpt.value
  let passwordVal = passwordInpt.value

  createUserWithEmailAndPassword(auth, emailVal, passwordVal).then(() => {
    alert("Account Created Successfully");

    emailInpt.value = "";
    passwordInpt.value = "";

    const obj = {
      email: emailVal,
      createdAt: serverTimestamp()
    }

    addDoc(usersCollection, obj).then((res) => {
      window.location.href = "./DataBase/index.html";
      console.log("User Added Successfully");
      getUsers();
    })
    .catch((err) => {
      console.log("Error adding user", err);
    });

  }).catch((err) => {
      console.log("Error", err);
  })}
})

GoogleBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const userData = {
                email: user.email,
                createdAt: serverTimestamp()
            };
            console.log(userData);
            addDoc(usersCollection, userData).then((res) => {
              alert("Account Created Successfully");
              window.location.href = "./DataBase/index.html";
              console.log("User Added Successfully");
              getUsers();
            })
            .catch((err) => {
              console.log("Error adding user", err);
            })
        }).catch((error) => {
            console.log("Error", error);
        });
})


signinBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let emailVal = email.value;
    let passwordVal = password.value;

    signInWithEmailAndPassword(auth, emailVal, passwordVal).then(() =>{
        alert("Sign in successfuly");

        const obj = {
            email: emailVal,
            createdAt: serverTimestamp()
        }

        addDoc(usersCollection, obj).then(() => {
            window.location.href = "./DataBase/index.html";
            console.log("Document added");
        })
        .catch((err) => {
            console.log(err);
        });

    }).catch((err) =>{
        console.log(err)
    })
})  

const getUsers = () => {
  getDocs(usersCollection).then((result) => {
    result.forEach((user) => {
      const userData = user.data();
      console.log(userData);
    }
    )})
    .catch((err) => {
      console.log("Error fetching users", err);
    })
}
getUsers();
    
