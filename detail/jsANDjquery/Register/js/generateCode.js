var verifyCode = document.getElementById("verifyCode");
var codeNum = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"0","1","2","3","4","5","6","7","8","9"];
function randomNum(){
	var str = "";
	for(var i=0; i<5; i++){
		var index = parseInt(Math.random()*codeNum.length);
		str = str + codeNum[index];
	}
	verifyCode.innerHTML = str;
}
randomNum();
verifyCode.onclick = function(){
	randomNum();
}
