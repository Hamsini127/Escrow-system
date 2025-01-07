import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore,doc,getDoc, collection, onSnapshot } from 'firebase/firestore'

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


const db=getFirestore()



onAuthStateChanged(auth,(user) => {
  if(user) {
    let docRef= doc(db,'users',user.uid)

    
    const info = document.querySelector(".info")
    

    console.log(info)

    console.log()

    const applicationRef = collection(docRef,"jobsapplied")
    onSnapshot(docRef, (snapshot) => {
      info.innerHTML=""

      console.log(snapshot.data())
      info.innerHTML += `<p class="h">Username</p>
                         <p>${user.displayName}</p>
                         <p class="h">About Me</p>
                         <p>${snapshot.data().me}</p>`
       if(snapshot.data().skills) {
        info.innerHTML += `<p class="h">Skills</p>
                            <p>${snapshot.data().skills}</p>`}
       if(applicationRef) {
        
        onSnapshot(applicationRef, (snapshota) => {
          let ajobs=""
          snapshota.forEach((doc)=> {
            ajobs += ` <div class="job">
          <h1>${doc.data().jobtitlef} </h1>
          <p class="description">${doc.data().descriptionf} </p>
          <button class="category">${doc.data().categoryf} </button>
          <button class="type">${doc.data().typef} </button>
          <p class="salary">$${doc.data().salaryf} </p>
          <p class="details" id= ${doc.id} >See Details <span class="arrow">&rarr;</span></p> 
          <p class="status">Status: ${doc.data().status}</p>
        </div>`
          
        })

        info.innerHTML += ajobs
        document.querySelectorAll(".details").forEach((button) => {
          button.addEventListener("click", () => {
            const jobId = button.getAttribute("id")
            window.location.href = `job.html?id=${jobId}`})
          })
        

        
    
       })                    
    
      }
    })

  }

})


