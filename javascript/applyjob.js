import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore,setDoc,doc, collection,increment,updateDoc,onSnapshot,addDoc } from 'firebase/firestore'

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

const nameinp= document.getElementById("name")
const numberinp=document.getElementById("no")
const emailinp=document.getElementById("email")
const propinp= document.querySelector(".prop")
const linkedininp=document.getElementById("linkedin")
const portfolioinp=document.getElementById("portfolio")
const apply=document.querySelector(".submit")

let docRef= doc(db,"jobs",jobId)

const subcollectionRef=collection(docRef,"applications")



  
onAuthStateChanged(auth,(user)=> {
  if (user) {
    
    apply.addEventListener("click",() => {
        addDoc(subcollectionRef, {
        applicantid: user.uid,
        name: nameinp.value,
        number: numberinp.value,
        email: emailinp.value,
        prop: propinp.value,
        linkedin: linkedininp.value,
        portfolio: portfolioinp.value
      })
      .then(() => {
         updateDoc(docRef, {
          proposals: increment(1)
        })
         .then(() => {
          let docRef2=doc(db,"users",user.uid)
          let subcollection2 = collection(docRef2,"jobsapplied")
          onSnapshot(docRef,(snapshot) => {

            setDoc(doc(subcollection2,jobId), {
              clientusernamef: snapshot.data().clientusername,
              clientidf: snapshot.data().clientid,
              clientemailf: snapshot.data().clientemail,
              jobtitlef: snapshot.data().jobtitle,
              skillsandef: snapshot.data().skillsande,
              locationf: snapshot.data().location,
              categoryf: snapshot.data().category,
              typef: snapshot.data().type,
              salaryf: snapshot.data().salary,
              deadlinef: snapshot.data().deadline,
              descriptionf: snapshot.data().description,
              proposalsf:snapshot.data().proposals,
              accproposalsf: snapshot.data().accproposals,
              status: "pending"
            })
            .then(()=> {
            window.location.href = `job.html?id=${jobId}`
            console.log(snapshot.data())
    
          })

          
         })
         })
      })
    })
  }
})



