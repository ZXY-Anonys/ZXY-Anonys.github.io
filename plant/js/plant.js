
function f(id){
	return  typeof id=="string"?document.getElementById(id):id;
}
window.onload=function(){	
	//***********************页面轮换**********************************************
	   var plantTitle=f("nav-menu").getElementsByTagName("li");
	   var plantTitleA=f("nav-menu").getElementsByTagName("a");
		var plantPage=f("content").getElementsByClassName("plant");
//		ContentHeight=f("content").getElementsByClassName("plant");
//		var a=document.getElementById("content").style.height=document.getElementById("homepage").style.height;
//		b=document.getElementById("ManMan").style.height;
//		alert(b); 
//		alert(plantPage.length);
//		alert(plantTitle.length);
		for (var i=0;i<plantTitle.length;i++){
			plantTitle[i].id=i;
			plantTitleA[i].id=i;
			f("content").style.height="2100px";
			plantTitle[i].onclick=function(){
				if(this.id!=0){						
						for (var i=0;i<plantTitle.length;i++) {
						plantTitle[i].className="";
						plantTitleA[i].className="";
					}
					for (var j=0;j<plantPage.length;j++) {
						plantPage[j].id=j;
						plantPage[j].style.display="none";
					}
					plantTitle[this.id].className="nav-menu-selected";
					plantTitleA[this.id].className="Acolor";
					var b=this.id-1;
					plantPage[b].style.display="block";	
					if(this.id==1){
							f("content").style.height="2100px";
						}
					else{
						f("content").style.height="1870px";
					}
				}
			}
		}//***************************页面轮换***********************************************	
		
//******************************返回顶部**********************************************************
			var backtop=f("BackTop");
			window.onscroll=function(){
				var pagelookHeight=document.documentElement.clientHeight;
//				alert(pagelookHeight);
				 backtp=document.body.scrollTop;
//				alert(backtop);
				if(backtp>pagelookHeight){					
					backtop.style.display="block";
				}else{
					backtop.style.display="none";
				}				
			}
			backtop.onclick=function(){
				var timer=null;
				timer=setInterval(function(){
					 backtop1=document.body.scrollTop;
					var speedtop=backtop1/8;
					document.body.scrollTop=backtop1-speedtop;	
					if(backtop1==0){
						clearInterval(timer);
					}
				},30);
			}
		//******************************返回顶部**********************************************************
			
		//*****************************轮播图******************************************************************	
			index=0;
			$('.pictures-play .move-pot').eq(0).addClass('bc');
			var timer=setInterval(change,6000);
			$(".pictures-play").hover(function(){
				clearInterval(timer);
				$(".btn-arrow-right").stop().animate({'right':'30px'},300);
				$('.btn-arrow-left').stop().animate({'left':'30px'},300);
			},function(){
				$(".btn-arrow-right").stop().animate({'right':'-60px'},300);
				$('.btn-arrow-left').stop().animate({'left':'-60px'},300);
				timer=setInterval(change,6000);
			});
			//小点移动看图*****************************************************************************************
			$(".pictures-play-pot>ul>li").hover(function(){
				clearInterval(timer);
				a=$(this).index();
							
				if(a==1){
					$('.move-pot').stop().eq(1).addClass('bc');
					$('.move-pot').stop().eq(0).removeClass('bc');
					$(".pictures-play-ul").stop().css({
					"transition":"left 2s ease-out",
					"webkitTransition":"left 2s ease-out",
					"left":"-1398px"
				});	
					index=1;					
				}else{
					$('.move-pot').stop().eq(0).addClass('bc');
					$('.move-pot').stop().eq(1).removeClass('bc');
					$(".pictures-play-ul").stop().css("left","0");
					index=0;					
				}							
			},function(){
				timer=setInterval(change,6000);
			})
//			$(".pictures-play-pot>ul>li").mouseleave(function(){
//				timer=setInterval(change,6000);
//			})
			//箭头看图*********************************************************************************************************
			$('.btn-arrow-right').click(function(){
				clearInterval(timer);
				if(index==2){
					change();
					setTimeout(change,100);
					
				}else{
					change();
				}				
			});
				
			$(".btn-arrow-left").click(function(){
				clearInterval(timer);
				if(index==0){
					$(".pictures-play-ul").css({
						"transition":"none",
						"webkitTransition":"none",
						'left':"-2698px"
					});
					setTimeout(change,100);
				}else{
					index=index-2;
					change();
				}				
			});
		//*****************************轮播图******************************************************************	
		
}//window.onload
function change(){
	index++;
	if(index>2){
			index=0;
			$(".pictures-play-ul").css({
			"transition":"none",
			"webkitTransition":"none",
			'left':"0"
		});
		return;
	}
		var left=index*(-1349);
		$(".pictures-play-ul").css({
			"transition":"left 2s ease-out",
			"webkitTransition":"left 2s ease-out",
			'left':left+"px"
		});
		
		if(index==1){
			$('.move-pot').eq(1).addClass('bc');
			$('.move-pot').eq(0).removeClass('bc');
		}else{
			$('.move-pot').eq(0).addClass('bc');
			$('.move-pot').eq(1).removeClass('bc');
		}		
}//change












