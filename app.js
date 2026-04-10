function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// Signup
function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  const email = username + "@zord.com";

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      db.collection("users").doc(userCred.user.uid).set({
        username: username,
        uid: userCred.user.uid
      });

      alert("Signup successful!");
    })
    .catch(err => alert(err.message));
}

// Login
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const email = username + "@zord.com";

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login success!");
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}
