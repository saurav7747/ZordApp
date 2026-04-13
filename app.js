// Switch Forms
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// SIGNUP (🔥 FIXED)
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
      const user = userCred.user;

      console.log("Auth success:", user.uid);

      // 🔥 SAVE USER IN FIRESTORE
      db.collection("users").doc(user.uid).set({
        username: username,
        uid: user.uid
      })
      .then(() => {
        console.log("User added to Firestore ✅");
        alert("Signup success");
        window.location.href = "home.html";
      })
      .catch((err) => {
        console.error("Firestore error:", err);
        alert("Firestore error: " + err.message);
      });

    })
    .catch((err) => {
      console.error("Auth error:", err);
      alert(err.message);
    });
}

// LOGIN
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
      alert("Login success");
      window.location.href = "home.html";
    })
    .catch((err) => {
      alert(err.message);
    });
}

// AUTO LOGIN CHECK
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "home.html";
  }
});
