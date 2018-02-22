var root = document.getElementById('button-container');
var auth_button = document.getElementById('auth-button');
var logout_button = document.getElementById('logout-button');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     // ログアウトボタンを出す
     logout_button.style.display = "";
     auth_button.style.display = "none";
  } else {
    logout_button.style.display = "none";
    auth_button.style.display = "";
  }
});

function Auth()
{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function Logout()
{
  firebase.auth().signOut().then(function() {
    console.log("ログアウトしました");
  }).catch(function(error) {
    console.log("ログアウトエラー");
});
}
