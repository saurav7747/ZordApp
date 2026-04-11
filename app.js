// Auto login
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "home.html";
  }
});

// Show Signup
function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

// Show Login
function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

// Signup FIXED
function signup() {
  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const email = username + "@zord.com";

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => {

      // IMPORTANT: return promise
      return db.collection("users").doc(userCred.user.uid).set({
        username: username,
        uid: userCred.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    })
    .then(() => {
      alert("Signup success");
      window.location.href = "home.html";
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });
}

// Login
function login() {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

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
