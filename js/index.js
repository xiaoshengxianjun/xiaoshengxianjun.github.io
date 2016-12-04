$(document).ready(function () {
	var headSwiper = new Swiper('.swiper-contain', {
		onInit: function(swiper) {
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	})
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay:5000,
//		autoplayDisableOnInteraction : false,
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
    	prevButton: '.swiper-button-prev'
	})
})
$(function(){
	$(window).scroll(function(){
		var docTop = $(this).scrollTop();
		$('.pageitem').each(function(){
			var index = $(this).index();
			if(docTop+50>=$(this).offset().top){
				$('.nav li').eq(index-1).addClass('active').siblings().removeClass('active');
			}
		});
		
	});
	$('#sendbtn').click(function(){
		alert("不好意思，这是一个静态网站，您暂时无法发送消息，您可以根据联系方式进行联系。");
	})
	$('#UI-btn').click(function(){
		window.location.href = "detail/UI/UIDetail.html";
	})
	$('#css-canvas-btn').click(function(){
		window.location.href = "detail/C3andCanvas/C3andCanvas.html";
	})
	$('#js-jq-btn').click(function(){
		window.location.href = "detail/jsANDjquery/jsANDjquery.html";
	})
	$('#other-btn').click(function(){
		window.location.href = "detail/other/other.html";
	})
})
