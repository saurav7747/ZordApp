import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logout = function(){
  signOut(auth).then(()=>{
    location.href="../index.html";
  });
};
