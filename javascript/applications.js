import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore,doc, collection, onSnapshot, updateDoc, increment } from 'firebase/firestore'

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

const url=new
URLSearchParams(window.location.search);
const jobId= url.get("id")

let div = document.querySelector(".applications")

const docRef=doc(db,"jobs",jobId)

const applicationRef=collection(docRef,"applications")

onSnapshot(applicationRef,(snapshot) => {
  
  div.innerHTML = ""

  

  snapshot.forEach((doc) => {
    div.innerHTML +=`<div class="middle">
    <div>
      <p class="sideh" >Full Name</p>
      <button id="name" class="input" >${doc.data().name} </button>
    </div>
    <div>
      <p class="sideh">Phone Number</p>
      <button id="no" class="input">${doc.data().number} </button>
    </div>
    <div>
      <p class="sideh" >Email Address</p>
      <button id="email" class="input" >${doc.data().email} </button>
    </div>
    
  
    <div>
      <p class="sideh">Your Proposal</p>
      <p class="prop" >${doc.data().prop} </p>
    </div>
    <div class="hdiv">
      <div class="left">
        <p class="sideh">Linkedln URL</p>
        <button id="linkedin" class="hinput">${doc.data().linkedin} </button>
      </div>
      <div>
        <p class="sideh">Portfolio URL</p>
        <button id="portfolio" class="hinput">${doc.data().portfolio} </button>
      </div>
      
    </div>
    
    <button class="accept" id=${doc.data().applicantid}>ACCEPT</button>
    <button class="reject" id=${doc.data().applicantid}>REJECT</button>

  
</div>`

   
    

    



  } )

  

  document.querySelectorAll(".accept").forEach((button) => {
    button.addEventListener("click", () => {
     let applicantid = button.getAttribute("id")
     updateDoc(doc(db, "users",`${applicantid}/jobsapplied/${jobId}`), {
     status: "Accepted" })
     updateDoc(doc(db,"jobs",jobId), {
      accproposals: increment(1)
     })
    })
   })

   document.querySelectorAll(".reject").forEach((button) => {
     button.addEventListener("click", () => {
      let applicantid = button.getAttribute("id")
      updateDoc(doc(db, "users",`${applicantid}/jobsapplied/${jobId}`), {
      status: "Rejected" })
     })
    })
})