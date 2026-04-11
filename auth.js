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

onAuthStateChanged(auth, (user)=>{
  if(user){
    window.location.href = "main.html";
  }
});

window.signupUser = async function(){
  let u = username.value;
  let p = password.value;

  let res = await createUserWithEmailAndPassword(auth, u+"@app.com", p);

  await setDoc(doc(db,"users",res.user.uid),{
    uid:res.user.uid,
    username:u
  });
};

window.loginUser = function(){
  let u = username.value;
  let p = password.value;

  signInWithEmailAndPassword(auth, u+"@app.com", p);
};
