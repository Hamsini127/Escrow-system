import { initializeApp } from 'firebase/app'
import { getAuth,signOut } from 'firebase/auth'

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













document.addEventListener('DOMContentLoaded', (event) => {
    const quote= document.querySelector(".quote")
const strQuote= quote.textContent

console.log(strQuote)

const splitQuote= strQuote.split("")

console.log(splitQuote)
quote.textContent=""

for (let i =0; i<splitQuote.length;i++) {
    quote.innerHTML += "<span>"+ splitQuote[i] + "</span>"
}

let char=0
let timer = setInterval(onTick,50)

function onTick() {
    const span=quote.querySelectorAll("span")[char]
    span.classList.add("fade")
    char++
    if(char==splitQuote.length) {
        complete()
        return
    }
}

function complete() {
    clearInterval(timer)
    timer=null
}

})




const description= document.querySelector(".description")

setTimeout(() => {
    description.classList.add("show")
},3000)


document.querySelector(".logout").addEventListener("click", () => {
   signOut(auth)
    .then(() => {
        console.log("logged out")
    })
})


const freelancer=document.querySelector(".freelancer")

const client=document.querySelector(".client")

const pay=document.querySelector(".pay")



const options = { 
  rootMargin: "0px",
  threshold: 0.5

}

const observer = new IntersectionObserver(
    callbackFunction,
    options
)

observer.observe(freelancer)
observer.observe(client)
observer.observe(pay)

function callbackFunction(enteries) {
  enteries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add("show")

    }

    })
}

