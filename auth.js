// 🔥 Auto login check (already logged in ho to direct main page)
auth.onAuthStateChanged(function(user){
  if(user){
    window.location.href = "main.html";
  }
});


// 🔥 SIGNUP FUNCTION
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

    // 🔥 Firestore me user save
    db.collection("users").doc(res.user.uid).set({
      uid: res.user.uid,
      username: u
    });

    alert("Signup success");

    // 👉 direct main page
    window.location.href = "main.html";
  })
  .catch(function(error){
    alert(error.message);
  });
}


// 🔥 LOGIN FUNCTION
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

    // 👉 main page redirect
    window.location.href = "main.html";
  })
  .catch(function(error){
    alert(error.message);
  });
}
