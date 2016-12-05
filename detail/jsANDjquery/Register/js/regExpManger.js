var regExpManger = {
	userNameReg:/^([\u4e00-\u9fa5]|\w|-)+$/, //用户名正则表达式
	regNum : /\d+/, 
	regWord : /[a-zA-Z]+/,      
	regOther : /[^\da-zA-Z]+/,
	emailReg: /^\w+@\w+(\.com)+$/,
	mobilReg: /^[1]\d*$/
}
