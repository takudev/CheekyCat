var root = document.getElementById('button-container');
var auth_button = document.getElementById('auth-button');
var logout_button = document.getElementById('logout-button');
var username_button = document.getElementById('username-button');
//CreateUserAccountForm();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     // ログアウトボタンを出す
     logout_button.style.display = "";
     auth_button.style.display = "none";
     FetchUserName();
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
    location.reload(true);
  }).catch(function(error) {
    console.log("ログアウトエラー");
});
}

function FetchUserName()
{
  var auth = firebase.auth().currentUser;
  var db = firebase.database().ref("users");
  var ref = db.child(auth.uid);
  ref.once("value", function(data) {
    if(data.val())
    {
      var text = document.getElementById("username_text");
      text.innerHTML = data.val().name;
      text.style.display = "";
    }
    else
    {
      username_button.style.display = "";
    }
});
}

function OnRegister()
{
  var nameField = document.getElementById('UserName');
  var database = firebase.database();
  var db = database.ref("users");
  var auth = firebase.auth().currentUser;
  var ref = db.child(auth.uid);
  ref.set(
    {
      name: nameField.value
    },function(error)
    {
      if(error)
      {
        console.log(error);
      }else
      {
        window.location.reload(true);
      }
    }
  );
}

function CreateUserAccountForm()
{
  // タイトル
  var title = document.createElement("h1");
  title.innerHTML = "名前登録";
  title.className = "title";
  // form作る
  var form = document.createElement("div");
  // テキストインプット作る
  var nameField = document.createElement("input");
  nameField.type = "text";
  nameField.id = "UserName";
  // ボタン作る
  var submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "決定";
  submitButton.onclick = function()
  {
    OnRegister();
  };

  // ラベル
  var userNameLabel = document.createElement("p");
  userNameLabel.innerHTML = "ユーザ名";

  // formに追加
  form.appendChild(title);
  form.appendChild(userNameLabel);
  form.appendChild(nameField);
  form.appendChild(submitButton);

  // formを追加
  var container = document.getElementById("register");
  container.appendChild(form);

  var body = document.getElementById("container");
  body.style.display = "none";
}
