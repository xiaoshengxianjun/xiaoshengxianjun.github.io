$(function(){
	$('.pagination li').each(function(){
		$(this).click(function(){
			var length = $('.pagination li').length;
			var index = $(this).index();
			var obj = $(this).parent().find('li.active');
			
			if(index==0){
				if(obj.index()!=1){
					$('.imgContent').attr('src','img/doctor/GUI' + parseInt(obj.index()-1) + '.jpg');
					obj.removeClass('active').prev().addClass('active');
				}
			}
			if(index==(length-1)){
				if(obj.index()!=(length-2)){
					$('.imgContent').attr('src','img/doctor/GUI' + parseInt(obj.index()+1) + '.jpg');
					obj.removeClass('active').next().addClass('active');
				}
			}
			if(index!=0&&index!=(length-1)){
				$('.imgContent').attr('src','img/doctor/GUI' + index + '.jpg');
				$(this).addClass('active').siblings().removeClass('active');
			}
		})
	})
})
