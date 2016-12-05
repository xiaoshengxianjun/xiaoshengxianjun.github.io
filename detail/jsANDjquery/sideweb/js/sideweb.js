$(function(){
	//右侧导航
	var tempS; //定时器
	$(".rightNav a").each(function(i) { //each遍历
		$(this).css({ //为每个a标签添加position布局转换
			top: "32" * i, //每个a的top值加上margin值乘以它的索引值就是它距离父元素的高度的距离
			position: "absolute", //绝对定位
			margin: "0"
		});
	});
	$(".rightNav").hover(function() { //hover事件切换hover([over],out)
		var thisObj = $(this); //用闭包保存$(this)jquery的对象集合
		//console.log($(this));
		//当鼠标在该对象上多次快速的划进划出，animate（）会按顺序依次执行，将每一次的over和out都执行完，即使鼠标已经停止动作多时。对此，我采用了加入定时器的方法，每当对象更换hover状态时，清除之前的定时器，重新设置定时器来触发该状态应有的事件
		tempS = setTimeout(function() {
			//找到对象集合里的a标签each遍历为每个a开启一个延时运动的动画
			thisObj.find("a").each(function(i) {
				var tA = $(this); //用闭包保存$(this)jquery的对象集合
				setTimeout(function() { //这里的定时器是逐帧的效果
					tA.animate({
						right: "0"
					}, 200); //动画时间200mm后动画结束
				}, 50 * i); //让每个a间隔50 * i mm后开始动画
			});
		}, 150); //定时器150mm后自动关闭
	}, function() { //鼠标移除的时候首先清除tempS定时器
		if(tempS) { //如果定时器还没结束清除定时器定时器没关的话是true执行里面的代码  false跳过
			clearTimeout(tempS);
		}
		$(this).find("a").each(function(i) { //和移如的效果一样
			var tA = $(this); //用闭包保存$(this)jquery的对象集合
			setTimeout(function() {
				tA.animate({
					right: "-100"
				}, 200);
			}, 50 * i); //让每个a间隔50 * i mm后开始动画
		});
	});
})
