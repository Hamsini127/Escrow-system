import { initializeApp } from 'firebase/app'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { getFirestore,doc,setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKvL3RD9dBN1EAXbWg4oITLVn1MuUTXcU",
  authDomain: "escrow-system-3bd3c.firebaseapp.com",
  projectId: "escrow-system-3bd3c",
  storageBucket: "escrow-system-3bd3c.firebasestorage.app",
  messagingSenderId: "512242741868",
  appId: "1:512242741868:web:3cca6bd101d69cc1da5e49"
};

const app=initializeApp(firebaseConfig)
const auth = getAuth()


const db=getFirestore()


let finish= document.querySelector(".finish-button")
let meText=document.querySelector(".me")


onAuthStateChanged(auth,(user) => {
  if (user) {
    finish.addEventListener("click", () => {
      setDoc(doc(db,"users",user.uid), {
        me: meText.value
      }).then(() => {
        window.location.href="homepage.html"
      })
    
    })
    
  } else {
    console.log("no user")
  }


})
