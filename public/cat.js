// ローカル変数
var isTalking = false;
var catImage = document.createElement('img');
var PATH = "images/cat_";
var loadingCount = 0;
var message_elm = document.getElementById('message');
var lastSelectedId = -1;

// 実行
Init();

// 猫の初期化
function Init()
{
		var place = document.getElementById('cat-placeholder');
		catImage.src = "images/cat_loading.png";
		catImage.id = "cat";
		//catImage.addEventListener("click",ChangeCatImage);
		catImage.addEventListener("click",OnCatClicked);
		place.insertBefore(catImage, place.firstChild);
		requestAnimationFrame(Update);
}

function Update()
{
		requestAnimationFrame(Update);
		if(!isTalking)
		{
			 loadingCount++;
			 if(loadingCount > 40)
			 {
				 loadingCount = 0;
			 }

			 UpdateLoadingText(loadingCount);
		}
}

function UpdateLoadingText(count)
{
		var text = ".";
		for(i = 0; i < count/10; i++)
		{
				text += ".";
		}
		message_elm.innerHTML = text;
}

function ChangeCatImage()
{
	if(isTalking){
		catImage.src = PATH+"loading.png";
	}
	else {
		catImage.src = PATH+"talking.png";
	}
	isTalking = !isTalking;
}

function OnCatClicked()
{
	// firebaesからデータを取ってくる
	var data = FetchMessageData();
}

function FetchMessageData()
{
	var database = firebase.database();
	var message = [];
	database.ref('/cat_message/message').once('value').then(function(snapshot){
		snapshot.forEach(function(childSnapshot) {
			message.push(childSnapshot.val());
		});

		// メッセージの抽選
		var random = Math.floor( Math.random() * message.length );
		while (lastSelectedId == random)
		{
			random = Math.floor( Math.random() * message.length );
		}
		lastSelectedId = random;
		message_elm.innerHTML = message[random];
		ChangeCatImage();
	});
}
