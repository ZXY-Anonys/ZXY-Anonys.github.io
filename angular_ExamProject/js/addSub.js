var app2=angular.module("app.addSub",[]);
app2.controller("addSubControl",function($scope,xuanSer,$location){
    xuanSer.findType(function(type){
        $scope.type=type;
    });
    xuanSer.findHard(function(hard){
        $scope.hard=hard;
    });
    xuanSer.findDire(function(dire){
        $scope.dire=dire;
    });
    xuanSer.findKnow(function(know){
        $scope.know=know;
    });
    //点击题目类型时双向绑定的值
    $scope.subject1={
         typeId:1,
         levelId:1,
         direId:1,
         topicId:1,
         stem:"",
         answer:"",
         analysis:"",
        chiocesCorrect:[],
        chiocesContent:[]
    }
    //提交
    $scope.saveContinue=function(){
        //获取以上的每个填写的内容发送至后台
        var sub={};
        for(var index in $scope.subject1){
            if($scope.type.id==1||$scope.type.id==2){
            switch(index){
                case "typeId":
                    sub["subject.subjectType.id"]=$scope.subject1.typeId;
                    break;
                case "levelId":
                    sub[" subject.subjectLevel.id"]=$scope.subject1.levelId;
                    break;
                case "direId":
                    sub["subject.department.id"]=$scope.subject1.direId;
                    break;
                case "topicId":
                    sub["subject.topic.id"]=$scope.subject1.topicId;
                    break;
                case "stem":
                    sub["subject.stem"]=$scope.subject1.stem;
                    break;
                case "analysis":
                    sub["subject.analysis"]=$scope.subject1.analysis;
                    break;
                case "chiocesCorrect":
                    sub["chiocesCorrect"]=$scope.subject1.chiocesCorrect;
                    break;
                case "chiocesContent":
                    sub["chiocesContent"]=$scope.subject1.chiocesContent;
                    break;
            }
            }else {
                switch (index) {
                    case "typeId":
                        sub["subject.subjectType.id"] = $scope.subject1.typeId;
                        break;
                    case "levelId":
                        sub[" subject.subjectLevel.id"] = $scope.subject1.levelId;
                        break;
                    case "direId":
                        sub["subject.department.id"] = $scope.subject1.direId;
                        break;
                    case "topicId":
                        sub["subject.topic.id"] = $scope.subject1.topicId;
                        break;
                    case "stem":
                        sub["subject.stem"] = $scope.subject1.stem;
                        break;
                    case "analysis":
                        sub["subject.analysis"] = $scope.subject1.analysis;
                        break;
                }
            }
        }
        $scope.sub=sub;
        xuanSer.saveContinue(sub);
        //需要制空某些选项，及让页面恢复到原始的页面
       var subject={
            typeId:1,
            levelId:1,
            direId:1,
            topicId:1,
            stem:"",
            answer:"",
            analysis:"",
            chiocesCorrect:[],
            chiocesContent:[]
        }
        angular.copy(subject,$scope.subject1)
    }
    //保存并跳回,存数据还有问题
    $scope.saveClose=function(){
        xuanSer.saveClose($scope.sub);
        $location.path("/allSubject/a/0/b/0/c/0/d/0")
    }
})
//定义控制器
app2.factory("xuanSer",function($http){
    return {
        findType:function(fun){
            $http.get("data/title.json").success(function (data) {
                fun(data)
            })
        },
        findHard:function(fun1){
            $http.get("data/titleHard.json").success(function(data){
                fun1(data)
            })
        },
        findDire:function(fun2){
            $http.get("data/direcation.json").success(function(data){
                fun2(data)
            })
        },
        findKnow:function(fun3){
            $http.get("data/knowledge.json").success(function(data){
                fun3(data)
            })
        },
        saveContinue:function(sub){
            $http.get("#",{
                params:sub
            }).success(function() {
                alert("保存成功！")
            })
        },
        saveClose:function(sub){
            $http.get("#",{
                params:sub
            }).success(function () {
                alert("保存成功！")
            })
        }
    }
})
//定义一个过滤器，用来筛选相应的department对应的知识点
app2.filter("findTopic",function(){
    return function(know,direId){
      if(know){
          var arr = know.filter(function(topic){
             /* if(topic.department.id==direId){
                  console.log(topic.title);
                  return topic;
              }*/
             return topic.department.id==direId
         })
      }
      return arr;
    }
})
//定义一个指令，绑定事件，实现选项的选择
app2.directive("selectAnswer",function(){
    return {
        link:function(scope,element){
            if(element.attr("type")=="radio"){
              element.on("change",function(){
                  var val=$(this).attr("value")
                for(var i=0;i<4;i++){
                   if(val==i){
                      scope.subject1.chiocesCorrect[i]=true;
                    }else{
                        scope.subject1.chiocesCorrect[i]=false;
                   }
                }
                scope.$digest()
              })
            }else if(element.attr("type")=="checkbox"){
                scope.subject1.chiocesCorrect=[false,false,false,false]
                element.on("change",function(){
                    var val=$(this).attr("value")
                    if($(this).prop("checked")){
                      for(var i=0;i<4;i++){
                        if(val==i){
                            scope.subject1.chiocesCorrect[i]=true;
                        }
                      }
                    }else{
                        scope.subject1.chiocesCorrect[val]=false;
                    }
                    scope.$digest()
                })
            }
        }
    }
})
//定义一个指令清空上次的选项
app2.directive("removeSelect",function(){
    return {
        link:function(scope,element){
            element.on("change",function(){
                scope.subject1.analysis="";
                scope.subject1.answer="";
                scope.subject1.chiocesContent=[];
                scope.subject1.chiocesCorrect=[false,false,false,false];
                scope.subject1.stem="";
                //强制清空
                scope.$digest();
            })
        }
    }
})
//动态加载相应选项对应的下面的页面
/*  $scope.show=function(){
 switch(this.type.id){
 case "1":
 var inp=angular.element(document).find(".Answeroptions").find("input");
 inp.attr("type","radio");
 angular.element(document).find(".Answeroptions").show();
 break;
 case "2":
 var inp=angular.element(document).find(".Answeroptions").find("input");
 inp.attr("type","checkbox");
 angular.element(document).find(".Answeroptions").show();
 break;
 case "3":
 angular.element(document).find(".Answeroptions").hide();
 angular.element(document).find(".chapterAnswer").show();
 break;
 }
 }*/
