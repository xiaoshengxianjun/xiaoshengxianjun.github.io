window.onload = function() {
	// 获取遮罩
	var mask = document.getElementById('mask');
	// 获取容器
	var box = document.getElementById('gameDiv');
	// 获取可以拖拽的div
	var divs = box.getElementsByTagName('div');

	// 用一个循环背景都加上
	for(var i = 0; i < 4; i++) { // 循环行
		for(var j = 0; j < 4; j++) { // 循环列 // "url(1.jpg) 1px 1px"
			divs[i * 4 + j].style.background = "url(img/1.jpg) " + (-118) * j + "px " + (-118) * i + "px";
		}
	}
	// 将可拖拽的div打乱(利用数组将这些div打乱)
	var slices = [];
	for(var i = 0; i < divs.length; i++) {
		divs[i].origin = i;
		slices.push(divs[i]);
	}
	slices.sort(function() {
		return Math.random() - 0.5;
	});
	// 在重新将打乱后的div放回box中
	for(var i = 0; i < slices.length; i++) {
		box.appendChild(slices[i]);
	}

	divs = slices; // 将数组的应用赋值给divs
	// 弄一个循环将可拖拽的div的原来的位置保存一下
	var posArr = []; // [{left:1,top:2}, {lef:3,top:4}]
	for(var i = 0; i < divs.length; i++) {
		divs[i].index = i;
		posArr.push({
			left: divs[i].offsetLeft,
			top: divs[i].offsetTop
		});
	}
	// 做一个布局转化
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.left = divs[i].offsetLeft + "px";
		divs[i].style.top = divs[i].offsetTop + "px";
	}
	for(var i = 0; i < divs.length; i++) {
		divs[i].style.position = "absolute";
		divs[i].style.margin = "0";
		drag(divs[i]);
	}

	// 封装一个函数用于拖拽
	var zIndex = 0;

	function drag(dom) {
		dom.onmousedown = function(e) {
			var evt = e || window.event;
			var l = evt.offsetX;
			var t = evt.offsetY;
			var nearestDiv = null;
			zIndex += 2;
			dom.style.zIndex = zIndex;
			document.onmousemove = function(e) {
				var evt = e || window.event;
				var toLeft = evt.clientX - l;
				var toTop = evt.clientY - t;

				dom.style.left = toLeft + "px";
				dom.style.top = toTop + "px";

				nearestDiv = findNearest(dom);
				if(nearestDiv) {
					//nearestDiv.style.background = "green";
					mask.style.zIndex = zIndex - 1;
					mask.style.display = "block";
					mask.style.left = posArr[nearestDiv.index].left + "px";
					mask.style.top = posArr[nearestDiv.index].top + "px";
				}
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				// 当鼠标抬起时做交换位置的动作
				if(nearestDiv) {
					// 位置要交换
					nearestDiv.style.left = posArr[dom.index].left + "px";
					nearestDiv.style.top = posArr[dom.index].top + "px";
					dom.style.left = posArr[nearestDiv.index].left + 'px';
					dom.style.top = posArr[nearestDiv.index].top + 'px';
					// 索引值也要交换
					var temp = nearestDiv.index;
					nearestDiv.index = dom.index;
					dom.index = temp;
					// 索引交换之后检测一下是否完成
					if(isSuccess()) {
						alert("恭喜你，拼图成功！")
					}
				} else { // 如果没有块碰的上，那么让dom回到原来的位置
					dom.style.left = posArr[dom.index].left + "px";
					dom.style.top = posArr[dom.index].top + "px";
				}
			};
			return false;
		}
	}

	// 用于寻找碰上的div中最近的那个(如果有的话，说明有人碰上，如果找不到，说明没有碰撞)
	function findNearest(dom) {
		var leastDis = 999999; // 设一个比较大的值认为是最小距离
		var index = -1; // 给个index存放距离最短div的下标
		for(var i = 0; i < divs.length; i++) {
			if(dom == divs[i]) {
				continue;
			}
			if(detectKnock(dom, divs[i])) { // 距离的计算基于碰撞
				var currentDis = calcDis(dom, divs[i]);
				if(currentDis < leastDis) { // 如果检测到更近的div，更新最小距离和下标
					leastDis = currentDis;
					index = i;
				}
			}
			//divs[i].style.background = "red";
		}

		if(index == -1) { // 如果这个判断成立，说明没有块碰上
			return null;
		}
		return divs[index];
	}

	// 封装一个函数用于计算两个元素之间的距离
	function calcDis(dom1, dom2) {
		// 获取两个中心点的坐标
		var centerLeft1 = dom1.offsetLeft + dom1.offsetWidth / 2;
		var centerTop1 = dom1.offsetTop + dom1.offsetHeight / 2;
		var centerLeft2 = dom2.offsetLeft + dom2.offsetWidth / 2;
		var centerTop2 = dom2.offsetTop + dom2.offsetHeight / 2;

		// 算两条直角边的长度
		var a = centerTop1 - centerTop2;
		var b = centerLeft1 - centerLeft2;

		return Math.sqrt(a * a + b * b);
	}

	// 封装函数用于检测碰撞
	function detectKnock(dom1, dom2) {
		// 先获取dom1的四条边
		var t1 = dom1.offsetTop;
		var l1 = dom1.offsetLeft;
		var b1 = t1 + dom1.offsetHeight;
		var r1 = l1 + dom1.offsetWidth;

		// 先获取dom2的四条边
		var t2 = dom2.offsetTop;
		var l2 = dom2.offsetLeft;
		var b2 = t2 + dom1.offsetHeight;
		var r2 = l2 + dom1.offsetWidth;

		if(t1 > b2 || l1 > r2 || b1 < t2 || r1 < l2) {
			return false;
		}
		return true;
	}

	// 加一个函数用于检测拼图是否完成
	function isSuccess() {
		// 用一个循环去检测所有的div上面的origin编号和打乱后的
		// 位置编号index是否相等，如果都相等就拼图成功（true），否则失败（false）
		for(var i = 0; i < divs.length; i++) {
			if(divs[i].origin != divs[i].index) {
				return false;
			}
		}
		return true;
	}
}