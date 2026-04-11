import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Auto redirect if logged in
onAuthStateChanged(auth, (user)=>{
  if(user){
    alert("Login success");
  }
});


// Signup
window.signup = async function(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(!u || !p) return alert("Fill all fields");

  let res = await createUserWithEmailAndPassword(auth, u+"@app.com", p);

  await setDoc(doc(db,"users",res.user.uid),{
    uid:res.user.uid,
    username:u
  });

  alert("Signup success");
};


// Login
window.login = async function(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(!u || !p) return alert("Fill all fields");

  await signInWithEmailAndPassword(auth, u+"@app.com", p);

  alert("Login success");
};
