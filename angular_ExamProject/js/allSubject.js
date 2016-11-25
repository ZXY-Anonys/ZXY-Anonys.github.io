//angular
var app1=angular.module("app.allSub",[]);
app1.controller("allSubControl",function($scope,allSubSer,$location,subjectSer,$routeParams){
    allSubSer.findType(function(data){
        $scope.title=data
    });
    allSubSer.findHard(function(data){
        $scope.hard=data
    });
    allSubSer.findDire(function(data){
        $scope.dire=data
    });
    allSubSer.findKnow(function(data){
        $scope.know=data
    });
    //点击按钮单个增加题目
   $scope.addSub=function(){
        $location.path("/addSub")
    }
    //获取到浏览器中参数的值
    $scope.params=$routeParams;
    var tiaojian={};
    for(var index in $routeParams){
        switch(index){
            case "a":
                tiaojian["subject.subjectType.id"]=$routeParams.a;
                break;
            case "b":
                tiaojian["subject.subjectLevel.id"]=$routeParams.b;
                break;
            case "c":
                tiaojian["subject.department.id"]=$routeParams.c;
                break;
            case "d":
                tiaojian[" subject.topic.id"]=$routeParams.d;
                break;
        }
    }//将要求后台传什么样的数据的要求应用subjectSer的findAllSub方法传递过去
   //加载题目
    subjectSer.findAllSub(tiaojian,function(subject){
        subject.forEach(function(sub){
           sub.choices.forEach(function(choice,index){
               choice.no=allSubSer.ab(index);
           })
            //正确选项
            var answer=[];
            if(sub.subjectType.id!=3){
                sub.choices.forEach(function(choice){
                    if(choice.correct){
                        answer.push(choice.no);
                    }
                })
                sub.answer=answer.join("*****");
            }
        })
        $scope.subject=subject;
    })
})
//deteleSub的控制器
app1.controller("deleteControl",function($scope,$routeParams,subjectSer,$location){
    //点击按钮删除题目
   /* $scope.deleteSub=function(){
        alert($routeParams.id)
        console.log(subjectSer.deleteSub($routeParams.id))
    }*/
    subjectSer.deleteSub($routeParams.id,function (){} );
    $location.path("/allSubject/a/0/b/0/c/0/d/0");
})
//审核通过或是不通过的controller
app1.controller("passControl",function($routeParams,subjectSer,$location){
   //调用service方法
    subjectSer.passSub($routeParams.id,$routeParams.check,function(data){
        alert(data)
        $location.path("/allSubject/a/0/b/0/c/0/d/0");
    })
})
//servive提供基本的服务(添加表格内容)
app1.factory("allSubSer",function($http){
    return {
        findType:function(fun){
            $http.get("data/title.json").success(function(data){
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
        ab:function(index){
            return index==0?"A":(index==1?"B":(index==2?"C":"D"))
        }
    }
})
//创建加载题目的服务，
app1.service("subjectSer",function($http){
    this.findAllSub=function(tiaojian,fun4){
            $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                params:tiaojian
            }).success(function(data) {
                 fun4(data)
        })
    }
    this.deleteSub=function(id){
        $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
            params:{"subject.id":id}
        }).success(function(data){
            alert(data)
        })
    }
    this.passSub=function(id,pass,fun){
        $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
            params:{
                "subject.id":id,
                "subject.checkState":pass
            }
        }).success(function(data){
            fun(data)
        })

    }
})
//创建添加题目的config
app1.config(function($routeProvider){
    $routeProvider.when("/addSub",{
        templateUrl:"tpl/addSub.html",
        controller:"addSubControl",
    }).when("/deleteSub/id/:id",{
        templateUrl:"tpl/allSubject.html",
        controller:"deleteControl"
    }).when("/subjectPass/id/:id/check/:check",{
        templateUrl:"tpl/allSubject.html",
        controller:"passControl"
    })
})
