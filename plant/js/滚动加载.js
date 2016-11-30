(function(win){
	$(function(){
		$(win).scroll(function(){
		
			var winHeight=$(window).height();
//			alert(winHeight);
			var scrollHeight=$(window).scrollTop();
			var sensitivity=-200;
			var a=$(".information-list>ul>li:first-child").offset().top;
			var b=$(".information-list>ul>li:nth-child(2)").offset().top;
			var c=$(".information-list>ul>li:last-child").offset().top;
			
			if(a-winHeight+sensitivity<scrollHeight){
				$(".information-list>ul>li:first-child").css({
								"transform": "translateY(0)",
								"-ms-transform": "translateY(0)",
								"-o-transform": "translateY(0)",
								"-webkit-transform": "translateY(0)",
								"-moz-transform": "translateY(0)"						
				});
			}//if
			if(b-winHeight+sensitivity<scrollHeight){
				$(".information-list>ul>li:nth-child(2)").css({
								"transform": "translateY(0)",
								"-ms-transform": "translateY(0)",
								"-o-transform": "translateY(0)",
								"-webkit-transform": "translateY(0)",
								"-moz-transform": "translateY(0)"						
				});
			}//if
			if(c-winHeight+sensitivity<scrollHeight){
				$(".information-list>ul>li:last-child").css({
								"transform": "translateY(0)",
								"-ms-transform": "translateY(0)",
								"-o-transform": "translateY(0)",
								"-webkit-transform": "translateY(0)",
								"-moz-transform": "translateY(0)"						
				});
			}//if
			
		})//$(win).scroll
				
	})//$(function()
}(window))//(function(win)