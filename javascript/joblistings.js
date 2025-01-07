import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore,collection, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKvL3RD9dBN1EAXbWg4oITLVn1MuUTXcU",
  authDomain: "escrow-system-3bd3c.firebaseapp.com",  
  projectId: "escrow-system-3bd3c",
  storageBucket: "escrow-system-3bd3c.firebasesorage.app",
  messagingSenderId: "512242741868",
  appId: "1:512242741868:web:3cca6bd101d69cc1da5e49"
}

initializeApp(firebaseConfig)
const auth = getAuth()

let user = auth.currentUser
const db=getFirestore()

const collectionRef= collection(db,"jobs")
const jobListings=document.querySelector(".job-listings")
const details=document.querySelector(".details")


onSnapshot(collectionRef,(snapshot) => {
  jobListings.innerHTML=""
  snapshot.forEach((doc) => {
      
    
      const jobDiv = document.createElement("div")
      jobDiv.classList.add("job")
  
      jobDiv.innerHTML = `
        <h1>${doc.data().jobtitle}</h1>
        <p class="description">${doc.data().description}</p>
        <button class="category">${doc.data().category}</button>
        <button class="type">${doc.data().type}</button>
        <p class="salary">$${doc.data().salary}</p>
        <p class="details">See Details <span class="arrow">&rarr;</span></p>
      `
      const detailsButton = jobDiv.querySelector('.details')
      detailsButton.addEventListener('click', () => {
        
        window.location.href = `job.html?id=${doc.id}`
      })
  
      
      jobListings.appendChild(jobDiv)

  })
})
