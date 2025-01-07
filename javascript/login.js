import { initializeApp } from 'firebase/app'
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAKvL3RD9dBN1EAXbWg4oITLVn1MuUTXcU",
  authDomain: "escrow-system-3bd3c.firebaseapp.com",
  projectId: "escrow-system-3bd3c",
  storageBucket: "escrow-system-3bd3c.firebasestorage.app",
  messagingSenderId: "512242741868",
  appId: "1:512242741868:web:3cca6bd101d69cc1da5e49"
};

initializeApp(firebaseConfig)
const auth=getAuth()


let email=document.querySelector(".email")
let password=document.querySelector(".password")
let login= document.querySelector(".login-button")

login.addEventListener("click",(e) => {
  e.preventDefault()
  signInWithEmailAndPassword(auth,email.value,password.value)
  .then((cred) => {
    email.value=''
    password.value=''
    window.location.href="homepage.html"
  })
  .catch((err) => {
    document.querySelector("login").innerHTML += `<p class="err">${err.message}</p>`

  })
})



//console.log(auth.currentUser.uid)