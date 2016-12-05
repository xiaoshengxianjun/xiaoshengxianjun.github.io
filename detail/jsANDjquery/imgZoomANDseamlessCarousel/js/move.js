function move(dom, target, fn){ // 将第二个和第三个参数，合并为一个对象类型的参数，里面存放所有的属性名及其目标值
	clearInterval(dom.timer);
	dom.timer = setInterval(function (){
		// 在这儿定义一个标记，含义是是否需要停止定时器, false代表不需要停止（没有都运动到位了）
		// true代表需要停止（都运动到位了）
		// var needStop = false; // 姑且认为所有的属性还没有都运动到位，这个是不行的
		var needStop = true; // 姑且认为所有的属性都运动到位了
		for(var property in target){
			// 调用getStyle方法去获取物体的当前值
			if(property == "opacity"){
				var current = parseInt(parseFloat(getStyle(dom, property)) * 100);
			} else {
				var current = parseInt(getStyle(dom, property));
			}
			
			// 根据当前值和目标值计算缓冲运动的速度值
			var speed = (target[property] - current) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			if(target[property] != current){ // 如果这个属性还没有运动到位的话
				needStop = false; // 只要有一个没有运动到位，就不能停止定时器
			}else{
				continue;
			}
			
			// 判断是否是透明度运动，采取不同方式设置属性
			if(property == 'opacity'){
				dom.style[property] = (current + speed)/ 100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			} else {
				dom.style[property] = current + speed + "px";
			}
		}
		// 等上面的for循环结束之后，在检测一下needStop的值
		if(needStop){
			clearInterval(dom.timer);
			fn && fn();
			return;
		}
	}, 20);
}

function getStyle(dom, property){
	// IE   访问元素的currentStyle属性去获取
	// 标准下   window.getComputedStyle(dom)
	
	if(dom.currentStyle){
		return dom.currentStyle[property];
	} else {
		return window.getComputedStyle(dom)[property];
	}
}