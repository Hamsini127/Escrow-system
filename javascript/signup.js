import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAKvL3RD9dBN1EAXbWg4oITLVn1MuUTXcU",
  authDomain: "escrow-system-3bd3c.firebaseapp.com",
  projectId: "escrow-system-3bd3c",
  storageBucket: "escrow-system-3bd3c.firebasestorage.app",
  messagingSenderId: "512242741868",
  appId: "1:512242741868:web:3cca6bd101d69cc1da5e49"
};

initializeApp(firebaseConfig)

const auth = getAuth()

const username = document.querySelector(".username")
const email = document.querySelector(".email")
const password = document.querySelector(".password")
const signup = document.querySelector(".signup-button")
let signupDiv= document.querySelector(".signup")



onAuthStateChanged(auth,(user)=> {
  if (user) {
    signup.addEventListener('click',(e) => {
      e.preventDefault()
    
      createUserWithEmailAndPassword(auth,email.value,password.value)
       .then((cred) =>{
        updateProfile(cred.user, {
          displayName: username.value
        }).then(() => {
          username.value=''
          email.value=''
          password.value=''
          window.location.href="corf.html"
         
        })
       })
       .catch((err) => {
        signupDiv.innerHTML += `<p class="err">${err.message}</p>`
       })
    })

  }
})






  
