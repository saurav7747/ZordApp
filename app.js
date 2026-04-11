// Auto login check
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "home.html";
  }
});

// Show Signup
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

// Show Login
function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// Signup
function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const email = username + "@zord.com";

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {

      // Save user in Firestore
      return db.collection("users").doc(userCred.user.uid).set({
        username: username,
        uid: userCred.user.uid,
        createdAt: Date.now()
      });

    })
    .then(() => {
      alert("Signup successful!");
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}

// Login
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const email = username + "@zord.com";

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}
