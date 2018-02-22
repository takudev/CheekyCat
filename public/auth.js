var root = document.getElementById('button-container');
var auth_button = document.getElementById('auth-button');
var logout_button = document.getElementById('logout-button');

CreateUserAccountForm();

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

function CreateUserAccountForm()
{
  // form作る
  var form = document.createElement("div");
  form.className = "search-form-text-box";
  // テキストインプット作る
  var nameField = document.createElement("input");
  nameField.type = "text";
  // ボタン作る
  var submitButton = document.createElement("input");
  submitButton.type = "submit";

  // formに追加
  form.appendChild(nameField);
  form.appendChild(submitButton);

  // formを追加
  var container = document.getElementById("register");
  container.appendChild(form);

  var body = document.getElementById("container");
  body.style.display = "none";
}
