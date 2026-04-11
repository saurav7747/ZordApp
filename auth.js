// Signup
function signup(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(!u || !p) return alert("Fill all fields");

  let email = u + "@app.com";

  auth.createUserWithEmailAndPassword(email, p)
  .then((res)=>{
    db.collection("users").doc(res.user.uid).set({
      uid: res.user.uid,
      username: u
    });

    alert("Signup success");
  })
  .catch(err => alert(err.message));
}


// Login
function login(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  let email = u + "@app.com";

  auth.signInWithEmailAndPassword(email, p)
  .then(()=>{
    alert("Login success");
  })
  .catch(err => alert(err.message));
}
