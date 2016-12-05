$(function(){
	var length = $('.pinpaiup ul li').length;
	var arr1 = [];
		var arr2 = [];
	for(var i=0; i<length; i++){
		arr1[i] = parseInt($('.pinpaiup ul li').eq(i).css('left'));
	}
	for(var i=0; i<length-1; i++){
		arr2[i] = arr1[i+1]+300;
	}
	$('.pinpaiup ul li').mouseover(function(){
		clearInterval(time);
		var left = parseInt($(this).css('left'));
		index = $(this).index();
		if(left == arr1[index]){
			for(var i=index+1; i<length; i++){
				$('.pinpaiup ul li').eq(i).stop().animate({left:arr2[i-1]});
			}
		}
		if(left == arr2[index-1]){
			for(var i=1; i<=index; i++){
				$('.pinpaiup ul li').eq(i).stop().animate({left:arr1[i]});
			}
			
		}
	});
	$('.pinpaiup ul li').mouseout(function(){
		time = setInterval(carousel,2000);
	});
	var index = 0;
	var itemlength = $('.pinpaiup ul li.item').length;
	for(var i=0; i<itemlength; i++){
		$('.pinpaiup ul li.item').eq(i).animate({left:arr2[i]});
	}
	function carousel(){
		$('.pinpaiup ul li.item').eq(index).animate({left:arr1[index+1]});
		index++;
		if(index > itemlength){
			clearInterval(time);
			index = 0;
			for(var i=0; i<itemlength; i++){
				$('.pinpaiup ul li.item').eq(i).animate({left:arr2[i]});
			}
			time = setInterval(carousel,2000);
		}
	}
	var time = setInterval(carousel,2000);
});
