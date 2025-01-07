import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore,getDoc,doc, onSnapshot } from 'firebase/firestore'

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

let jobDiv = document.querySelector(".bigjobdiv")

const docRef=doc(db,"jobs",jobId)

let button=""



 


 onAuthStateChanged(auth,(user)=> {
  if (user) {
    onSnapshot(docRef,(snapshot) => {

      if(snapshot.data().clientid==user.uid) {
       button="VIEW APPLICATIONS"
      }
      else {
       button="APPLY FOR THE JOB"
      }
   
      jobDiv.innerHTML += `<h1>${snapshot.data().jobtitle}</h1>
       <p class="jobdetails">${snapshot.data().description}</p>
       <p class="h">Job Category</p>
       <button class="jobcategory">${snapshot.data().category}</button>
       <p class="h">Skills and Experties Needed for The Job</p>
       <p class="jobdetails"> ${snapshot.data().skillsande} </p>
       <p class="h">Location</p>
       <p class="jobdetails">${snapshot.data().location} </p>
       <p class="h">Deadline</p>
       <p class="jobdetails">${snapshot.data().deadline} days </p>
        <p class="h">Activity on this job</p>
       <p class="jobdetails">Number of proposals: ${snapshot.data().proposals}  Number of accepted proposals: ${snapshot.data().accproposals}</p>
       <p class="h">About The Client</p>
       
       <p class="jobdetails">${snapshot.data().clientusername} </p>
       <p class="jobdetails">Email: ${snapshot.data().clientemail} </p>
       <button class="apply">${button} </button>`
   
       let applyButton=document.querySelector(".apply")
   
       applyButton.addEventListener("click", () => {
        if(snapshot.data().clientid==user.uid) {
         window.location.href = `applications.html?id=${jobId}`
        }
        else {
         window.location.href = `applyjob.html?id=${jobId}`
        }
       })
   
    })

  }
 })
