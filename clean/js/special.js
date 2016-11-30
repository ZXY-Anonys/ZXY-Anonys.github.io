window.onload=function(){
	var aa=document.getElementsByTagName("a");
	for (var i=0;i<aa.length;i++) {
		aa[i].setAttribute("href","#0");
	}
	var index=0;
	var spLi=document.getElementsByClassName("small-plate-title")[0].getElementsByTagName("a");
	var spUl=document.getElementsByClassName("small-plate-content")[0].getElementsByTagName("ul");
	var nav =document.getElementsByClassName("nav-content")[0].getElementsByTagName("a");
	var slidep=document.getElementsByClassName("Beijing-content-bottom")[0].getElementsByTagName("li");
	var slide=document.getElementsByClassName("beijing-hidden")[0];
	var figureul=document.getElementsByClassName("figure-playing-img")[0];
	var figureli=figureul.getElementsByTagName("li");
	var figuremark=document.getElementsByClassName("figure-playing-mark")[0].getElementsByTagName("li");
	var beijingul=document.getElementsByClassName("Beijing-content-center-ul")[0];
	var beijingli=beijingul.getElementsByTagName("li");
	var beijingcenter=document.getElementsByClassName("Beijing-content-center")[0];
//	alert(beijingli.length);
	for (var i=0;i<nav.length;i++) {
		nav[i].addEventListener("click",function(){
			for (var i=0;i<nav.length;i++) {
				nav[i].className="nav-font";
			}
			this.className="nav-font nav-font-selected";
		},false);
	}
	for (var i=0;i<spLi.length;i++) {
		spLi[i].addEventListener("click",function(){
			for (var i=0;i<spLi.length;i++) {
				spLi[i].className="small-plate-title-unselected";
				spUl[i].className="small-plate-content-unselected";
			}
			var b=$(this).parent();
			var a=$(".small-plate-title>ul>li").index(b);
			this.className="small-plate-title-selected";
			spUl[a].className="small-plate-content-selected";
		},false);
	}
	var timer=setInterval(figure,3000);
	for (var i=0;i<figuremark.length;i++) {
		
		figuremark[i].addEventListener("click",function(){
			index=$(this).index()-1;
			figure();
			clearInterval(timer);
			for (var i=0;i<figuremark.length;i++) {
				figuremark[i].className="";
			}
			this.className="markselected";
		},false);
	}
	var timer2=setInterval(change,7000);
	$(beijingcenter).hover(function(){
		$(beijingul).pause();
		clearInterval(timer2);
	},function(){
		$(beijingul).resume();
		var timer2=setInterval(change,7000);
	})
	function  change(){
		$(beijingul).animate({
			"left":"-290px"
		},5000,function(){
			$(".Beijing-content-center-ul>li:last-child").after($(".Beijing-content-center-ul>li:first-child"));
			$(beijingul).css("left","0");
		})
	}
	
	function  figure(){
		index++;
		if(index>3){
			index=0;
		}
		figureul.style.left=-356*index+"px";
		for (var i=0;i<figuremark.length;i++) {
				figuremark[i].className="";
			}
		figuremark[index].className="markselected";
	}
	
	
}






