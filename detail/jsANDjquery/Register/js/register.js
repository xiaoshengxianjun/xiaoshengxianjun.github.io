var userName = document.getElementById("userName");//获取用户名节点对象
var userPwd = document.getElementById("userPwd");//获取密码节点对象
var confirmPwd = document.getElementById("confirmPwd");//获取确认密码节点对象
var email = document.getElementById("email");//获取邮箱节点对象
var mobile = document.getElementById("mobile");//获取手机号节点对象
var code = document.getElementById("code");//获取验证码节点对象
var agreement = document.getElementById("agreement");//获取协议节点对象
var btn = document.getElementById("btn");//获取注册按钮节点对象
var verifyCode = document.getElementById("verifyCode");//获取生成的验证码节点对象

/*----------------------------校验用户名----------------------------*/
function checkUserName (e) {
	var _e = window.event || e;
	var box = userName.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = userName.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind default";
				span.innerHTML = "支持汉字、字母、数字、-、_的组合，4-20个字符";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box error";
		remind.className = "remind error";
		span.innerHTML = "请输入用户名";
		return false;
	}else{
		if(regExpManger.userNameReg.test(v)){
			if(v.length>=4 && v.length<=20){
				box.className = "box right";
				remind.className = "remind hide";
				return true;
			}else{
				box.className = "box error";
				remind.className = "remind error";
				span.innerHTML = "长度4-20个字符";
				return false;
			}
		}else{
			box.className = "box error";
			remind.className = "remind error";
			span.innerHTML = "格式错误，仅支持汉字、字母、数字、-、_的组合，4-20个字符";
			return false;
		}
	}
}
userName.onfocus = checkUserName;//获得焦点
userName.onblur = checkUserName;//失去焦点
userName.onkeyup = checkUserName;//按键弹起

/*----------------------------校验密码----------------------------*/
function checkPwd (e) {
	var _e = window.event || e;
	var box = userPwd.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = userPwd.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind default";
				span.innerHTML = "建议使用数字、字母和符号两种以上的组合，6-20个字符";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box error";
		remind.className = "remind error";
		span.innerHTML = "请输入密码";
		return false;
	}else{
		/*验证密码长度和安全等级*/
		if(v.length>=6 && v.length<=20){
			box.className = "box right";
			var level = 0;
			if(regExpManger.regNum.test(v)){
				level++;
			}
			if(regExpManger.regWord.test(v)){
				level++;
			}
			if(regExpManger.regOther.test(v)){
				level++;
			}
			switch(level){
				case 1:
					remind.className = "remind ruo";
					span.innerHTML = "密码强度弱";
					break;
				case 2:
					remind.className = "remind zhong";
					span.innerHTML = "密码强度中";
					break;
				case 3:
					remind.className = "remind qiang";
					span.innerHTML = "密码强度强";
					break;
				default:
					remind.className = "remind ruo";
					span.innerHTML = "密码强度弱";
			}
			return true;
		}else{
			box.className = "box error";
			remind.className = "remind error";
			span.innerHTML = "密码长度不符合";
			return false;
		}
	}
}
userPwd.onfocus = checkPwd;//获得焦点
userPwd.onblur = checkPwd;//失去焦点
userPwd.onkeyup = checkPwd;//按键弹起

/*----------------------------校验确认密码----------------------------*/
function checkConfirmPwd (e) {
	var _e = window.event || e;
	var box = confirmPwd.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = confirmPwd.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind default";
				span.innerHTML = "请确保密码一致";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box error";
		remind.className = "remind error";
		span.innerHTML = "请再次输入密码";
		return false;
	}else{
		if(v.length>=6 && v.length<=20){
			if(v == userPwd.value){
				box.className = "box right";
				remind.className = "remind hide";
				return true;
			}else{
				box.className = "box error";
				remind.className = "remind error";
				span.innerHTML = "您输入的密码有误";
				return false;
			}
		}else{
			box.className = "box error";
			remind.className = "remind error";
			span.innerHTML = "您输入的密码位数有误";
			return false;
		}
	}
}
confirmPwd.onfocus = checkConfirmPwd;//获得焦点
confirmPwd.onblur = checkConfirmPwd;//失去焦点
confirmPwd.onkeyup = checkConfirmPwd;//按键弹起

/*----------------------------校验邮箱----------------------------*/
function checkEmail (e) {
	var _e = window.event || e;
	var box = email.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = email.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind default";
				span.innerHTML = "请输入常用邮箱";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box error";
		remind.className = "remind error";
		span.innerHTML = "请输入常用邮箱";
		return false;
	}else{
		if(regExpManger.emailReg.test(v)){
			if(v.length>=6 && v.length<=20){
				box.className = "box right";
				remind.className = "remind hide";
				return true;
			}else{
				box.className = "box error";
				remind.className = "remind error";
				span.innerHTML = "长度6-20个字符";
				return false;
			}
		}else{
			box.className = "box error";
			remind.className = "remind error";
			span.innerHTML = "您输入的邮箱有误";
			return false;
		}
	}
}
email.onfocus = checkEmail;//获得焦点
email.onblur = checkEmail;//失去焦点
email.onkeyup = checkEmail;//按键弹起

/*----------------------------校验手机号----------------------------*/
function checkMobile (e) {
	var _e = window.event || e;
	var box = mobile.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = mobile.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind default";
				span.innerHTML = "请输入常用手机号";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box error";
		remind.className = "remind error";
		span.innerHTML = "请输入常用手机号";
		return false;
	}else{
		if(regExpManger.mobilReg.test(v)){
			if(v.length==11){
				box.className = "box right";
				remind.className = "remind hide";
				return true;
			}else{
				box.className = "box error";
				remind.className = "remind error";
				span.innerHTML = "请检查输入的手机号";
				return false;
			}
		}else{
			box.className = "box error";
			remind.className = "remind error";
			span.innerHTML = "非正常手机号，请重新输入";
			return false;
		}
	}
}
mobile.onfocus = checkMobile;//获得焦点
mobile.onblur = checkMobile;//失去焦点
mobile.onkeyup = checkMobile;//按键弹起

/*----------------------------校验验证码----------------------------*/
function checkCode (e) {
	var _e = window.event || e;
	var box = code.parentNode;//获取父节点
	var remind = box.nextElementSibling;//下一个兄弟节点
	var span = remind.lastElementChild;//获取remind中的span节点
	var v = code.value;
	/*获取焦点*/
	if(_e){
		if(_e.type =="focus"){
			if(v.length == 0){
				box.className = "box verify";
				remind.className = "remind default";
				span.innerHTML = "请正确输入验证码";
				return false;
			}
		}
		if(_e.type == "blur"){
			if(v.length == 0){
				box.className = "box verify";
				remind.className = "remind hide";
				return false;
			}
		}
	}
	/*其他事件*/
	if(v.length == 0){
		box.className = "box verify error";
		remind.className = "remind error";
		span.innerHTML = "请输入验证码";
		return false;
	}else{
		if(v.length == verifyCode.innerHTML.length){
			if(v == verifyCode.innerHTML){
				box.className = "box verify right";
				remind.className = "remind hide";
				return true;
			}
		}else{
			box.className = "box verify error";
			remind.className = "remind error";
			span.innerHTML = "您输入的验证码有误";
			return false;
		}
	}
}
code.onfocus = checkCode;//获得焦点
code.onblur = checkCode;//失去焦点
code.onkeyup = checkCode;//按键弹起

/*----------------------------点击注册按钮----------------------------*/
btn.onclick = function(){
	var agreeBox = agreement.parentNode;
	var remind = agreeBox.nextElementSibling;
	var span = remind.lastElementChild;
	if(agreement.checked){
		agreeBox.className = "agreeBox";
		remind.className = "remind hide";
		if(checkUserName()&&checkPwd()&&checkConfirmPwd()&&checkEmail()&&checkMobile()&&checkCode()){
			location.href="index.html";
		}
	}else{
		agreeBox.className = "agreeBox error";
		remind.className = "remind error";
		span.innerHTML = "请同意协议";
		return false;
	}
}
