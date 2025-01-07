import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore,collection,addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKvL3RD9dBN1EAXbWg4oITLVn1MuUTXcU",
  authDomain: "escrow-system-3bd3c.firebaseapp.com",  
  projectId: "escrow-system-3bd3c",
  storageBucket: "escrow-system-3bd3c.firebasesorage.app",
  messagingSenderId: "512242741868",
  appId: "1:512242741868:web:3cca6bd101d69cc1da5e49"
};

initializeApp(firebaseConfig)
const auth = getAuth()

let user = auth.currentUser
const db=getFirestore()

let title=document.getElementById("title")
let email=document.getElementById("email")
let loc = document.getElementById("location")
let salary = document.getElementById("salary")
const skills=document.getElementById("skills")
const dead=document.getElementById("deadline")
const jdes=document.getElementById("description")
const jCategory=document.getElementById("cat")
const jobType=document.getElementById("type")
const name=document.getElementById("name")


const submit=document.querySelector(".submit")






onAuthStateChanged(auth,(user)=> {
  submit.addEventListener("click",(e) => {
    e.preventDefault()
    addDoc(collection(db,"jobs"), {
      clientusername: name.value,
      clientid: user.uid,
      clientemail: email.value,
      jobtitle: title.value,
      skillsande: skills.value,
      location: loc.value,
      category: jCategory.value,
      type: jobType.value,
      salary: salary.value,
      deadline: dead.value,
      description: jdes.value,
      proposals:0,
      accproposals:0
    })
    .then(() => {
      document.querySelectorAll(".input").value=""
      document.querySelector(".job").innerHTML+=`<p class="post">Job Posted Successfully</p>`
  
    })
  })

})





