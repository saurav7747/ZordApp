import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth,(user)=>{
  if(!user) location.href="../index.html";

  onSnapshot(collection(db,"users"),snap=>{
    users.innerHTML="";
    snap.forEach(doc=>{
      let u=doc.data();
      if(u.uid===user.uid) return;

      let div=document.createElement("div");
      div.innerText=u.username;

      div.onclick=()=>{
        localStorage.setItem("chatUser",u.uid);
        localStorage.setItem("chatName",u.username);
        parent.document.getElementById("frame").src="pages/chat.html";
      };

      users.appendChild(div);
    });
  });
});
