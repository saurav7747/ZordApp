// 🔥 ONLY AUTO LOGIN CHECK (NO REDIRECT LOOP)
auth.onAuthStateChanged(function(user){
  if(user){
    console.log("User logged in");
  }
});


// 🔥 SIGNUP
function signup(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(!u || !p){
    alert("Fill all fields");
    return;
  }

  let email = u + "@app.com";

  auth.createUserWithEmailAndPassword(email, p)
  .then(function(res){

    db.collection("users").doc(res.user.uid).set({
      uid: res.user.uid,
      username: u
    });

    alert("Signup success");

    // ✅ DIRECT REDIRECT
    window.location.href = "./main.html";
  })
  .catch(function(error){
    alert(error.message);
  });
}


// 🔥 LOGIN
function login(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(!u || !p){
    alert("Fill all fields");
    return;
  }

  let email = u + "@app.com";

  auth.signInWithEmailAndPassword(email, p)
  .then(function(){

    alert("Login success");

    // ✅ DIRECT REDIRECT
    window.location.href = "./main.html";
  })
  .catch(function(error){
    alert(error.message);
  });
}
