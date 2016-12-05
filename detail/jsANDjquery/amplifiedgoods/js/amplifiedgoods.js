window.onload = function() {
	// tab切换最外面的框
	var tabs = document.getElementById('tabs');
	// 获取两个箭头
	var as = tabs.getElementsByTagName('a');
	// 获取listbox（放tab图片的div）
	var listBox = document.getElementById('listBox');
	// 获取tab图片
	var tabImgs = listBox.getElementsByTagName('img');
	// 弄一个公共的变量存一下现在显示的是哪一张图（索引）
	var tabIndex = 0;
	// 将tab图片做一个定位
	for(var i = 0; i < tabImgs.length; i++) {
		tabImgs[i].index = i;
		tabImgs[i].style.left = i * 30 + "px";
		// tab图片添加一个点击事件
		tabImgs[i].onclick = function() {
			// 把原来那张图片的边框去掉
			tabImgs[tabIndex].className = "";
			// 更新显示的是第几张图片
			tabIndex = this.index;
			// 把自己的边框换成红色
			this.className = "rB";
			// 调整要放大的图片
			adjustMagnifyImg();
		};
	}

	// 给向左的按钮添加点击事件
	as[0].onclick = function() {
		// 把原来那张图片的边框去掉
		tabImgs[tabIndex].className = "";
		// tabIndex每次减1,但不能小于零
		tabIndex--;
		if(tabIndex <= 0) {
			tabIndex = 0;
		}
		// 把新的边框换成红色
		tabImgs[tabIndex].className = "rB";
		// 调整要放大的图片
		adjustMagnifyImg();
		// 调整一下listImg的位置
		adjustImgList();
	};

	// 给向左的按钮添加点击事件
	as[1].onclick = function() {
		// 把原来那张图片的边框去掉
		tabImgs[tabIndex].className = "";
		// tabIndex每次加1,但不能小于零
		tabIndex++;
		if(tabIndex >= tabImgs.length - 1) {
			tabIndex = 11;
		}
		// 把新的边框换成红色
		tabImgs[tabIndex].className = "rB";
		// 调整要放大的图片
		adjustMagnifyImg();
		// 调整一下listImg的位置
		adjustImgList();
	};
	// 定义一个函数用于调整imglist的left值
	function adjustImgList() {
		// 根据imgList的现在的left值，计算出当前显示的是哪五张
		var left = listBox.offsetLeft;
		// 计算当前显示的第一张图片的索引值
		var firstIndex = left / -30;
		// 计算当前显示的最后一张图片的索引值
		var lastIndex = firstIndex + 4;

		if(tabIndex > lastIndex) { // 如果向右超出可视范围，那么整个列表向左移动30px,让这张图片显示出来
			listBox.style.left = listBox.offsetLeft - 30 + 'px';
		} else if(tabIndex < firstIndex) { // 如果向左超出可视范围，那么整个列表向右移动30px,让这张图片显示出来
			listBox.style.left = listBox.offsetLeft + 30 + 'px';
		}

	}
	// 定义一个函数用于调整要放大的图片
	function adjustMagnifyImg() {
		// 计算要放大的是哪个图片
		var srcIndex = tabIndex + 1 < 10 ? "0" + (tabIndex + 1) : tabIndex + 1;
		// 更新要放大的图片的src
		sImg.src = "img/img" + srcIndex + ".jpg";
		bImg.src = "img/img" + srcIndex + ".jpg";
	}

	// 下面是放大镜的实现
	var box = document.getElementById('box');
	// 放大镜模块外面的框
	var container = document.getElementById('container');
	// 放大后图片放在这个div里面
	var magnify = document.getElementById('magnify');
	// 随鼠标移动的div遮罩
	var move = document.getElementById('move');
	// 放大后的图片
	var bImg = document.getElementById('bImg');
	// 需要被放大的图片
	var sImg = document.getElementById('sImg');

	container.onmouseover = function() {
		//console.log("over");
		move.style.display = "block";
		magnify.style.display = "block";
	};

	container.onmouseout = function() {
		//console.log("out");
		move.style.display = "none";
		magnify.style.display = "none";
	};

	container.onmousemove = function(e) {
		// 事件对象的兼容性处理
		var evt = e || window.event;
		// 获取鼠标的位置
		var cx = evt.clientX;
		var cy = evt.clientY;
		// 计算move块的left和top
		var toLeft = cx - container.offsetLeft - box.offsetLeft - move.offsetWidth / 2;
		var toTop = cy - container.offsetTop - box.offsetTop - move.offsetHeight / 2;

		// 最大允许的top值
		var maxTop = container.offsetHeight - move.offsetHeight;
		// 限制top值的范围
		if(toTop >= maxTop) {
			toTop = maxTop;
		} else if(toTop <= 0) {
			toTop = 0;
		}

		// 最大允许的left值
		var maxLeft = container.offsetWidth - move.offsetWidth;
		// 限制top值的范围
		if(toLeft >= maxLeft) {
			toLeft = maxLeft;
		} else if(toLeft <= 0) {
			toLeft = 0;
		}

		// move块移动到指定位置
		move.style.left = toLeft + "px";
		move.style.top = toTop + "px";

		// 大图跟着动
		// 先算一个比例，就是小图每移动1px 大图应该动多少px
		// var rate = 225 / 100;
		var rate = (bImg.offsetWidth - magnify.offsetWidth) / (container.offsetWidth - move.offsetWidth)
		bImg.style.left = -toLeft * rate + "px";
		bImg.style.top = -toTop * rate + "px";

	};

}