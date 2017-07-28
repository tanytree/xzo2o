/**
 * Created by tanytree on 2015/8/1.
 */
var t = n = 0, count;
$(document).ready(function(){
    count=$(".flashBox ul li").length;
    $(".flashBox ul li:not(:first-child)").hide();
    $(".flashBox ol li").click(function() {
        var i = $(this).text() - 1;
        n = i;
        if (i >= count) return;
        $(".flashBox ul li").filter(":visible").fadeOut(600).parent().children().eq(i).fadeIn(1000);
        document.getElementById("flashBox").style.background="";
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
    t = setInterval("show()", 4000);
    $(".flashBox").hover(function(){clearInterval(t);
        }, function(){t = setInterval("show()", 4000);}
    );
});
function show()
{
    n = n >=(count - 1) ? 0 : ++n;
    $(".flashBox ol li").eq(n).trigger('click');
}
function shows()
{
    n = n >=(count + 1) ? 0 : --n;
    $(".flashBox ol li").eq(n).trigger('click');
}



function rowlastLi(a,b){
    $(a).each(function(){
        var li=$(this).find("ul>li");
        var len=$(this).find("ul>li").length;
        var y=len/b;
        for(var i=1;i<=y;i++){
            li.eq(i*b-1).css({'margin-right':'0'}).find(".someDesc").addClass("lastRightBox");
        }
    })
}

$(function(){
   $(".apps li").hover(function(){
       $(this).addClass('on');
   },function(){
       $(this).removeClass('on');
   });
    tab(".itemList");
    customTab('.funRow .subHd ul li','.funRow .subBd .row','on');
    var itemLen=$(".products .items ul li")
    itemLen.hover(function(){
        $(this).find('i').addClass('irotateIn');
    },function(){
        itemLen.find('i').removeClass("irotateIn");
    });
});



















/*弹窗操作*/
function windowClosed(){
    $(".fullBg").fadeOut();
    $(".window").slideUp();
}


function lastLi(a){
    $(a).find("li").last().css('borderBottom','0');
}

function tab(obj){
    var tabObj=$(obj)
    var len=tabObj.find('.hd ul li');
    var row=tabObj.find('.bd>.row');
    len.bind("click",function(){
        var index = 0;
        $(this).addClass('on').siblings().removeClass('on');
        index = len.index(this);
        row.eq(index).show().siblings().hide();
        return false;
    }).eq(0).trigger("click");
}
function customTab(a,b,c){
    var len=$(a);
    len.bind("click",function(){
        var index = 0;
        $(this).addClass(c).siblings().removeClass(c);
        index = len.index(this);
        $(b).eq(index).addClass("animate").show().siblings().removeClass("animate").hide();
        return false;
    }).eq(0).trigger("click");
}

//4.点击弹窗方法
function showWindow(a) {
        centerWindow(a);
        $(".fullBg").show();
        $(a).slideDown(300);
}
//3.点击弹窗方法
function clickaShowWindow(a, b) {
    $(b).click(function() {
        centerWindow(a);
        $(".fullBg").show();
        $(a).slideDown(300);
        return false;
    });
}
//2.将盒子方法放入这个方，方便法统一调用
function centerWindow(a) {
    center(a);
    //自适应窗口
    $(window).bind('scroll resize',
        function() {
            center(a);
        });
}
//1.居中方法，传入需要剧中的标签
function center(a) {
    var wWidth = $(window).width();
    var wHeight = $(window).height();
    var boxWidth = $(a).width();
    var boxHeight = $(a).height();
    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();
    var top = scrollTop + (wHeight - boxHeight) / 2;
    var left = scrollLeft + (wWidth - boxWidth) / 2;
    $(a).css({
        "top": top,
        "left": left
    });
}

//时间轴
$(function(){
    systole();
});

function systole(){
    if(!$(".history").length){
        return;
    }
    var $warpEle = $(".history-date"),
        $targetA = $warpEle.find("h2 a,ul li dl dt a"),
        parentH,
        eleTop = [];

    parentH = $warpEle.parent().height();
    $warpEle.parent().css({"height":59});

    setTimeout(function(){

        $warpEle.find("ul").children(":not('h2:first')").each(function(idx){
            eleTop.push($(this).position().top);
            $(this).css({"margin-top":-eleTop[idx]}).children().hide();
        }).animate({"margin-top":0}, 1600).children().fadeIn();

        $warpEle.parent().animate({"height":parentH}, 2600);

        $warpEle.find("ul").children(":not('h2:first')").addClass("bounceInDown").css({"-webkit-animation-duration":"2s","-webkit-animation-delay":"0","-webkit-animation-timing-function":"ease","-webkit-animation-fill-mode":"both"}).end().children("h2").css({"position":"relative"});

    }, 600);

    $targetA.click(function(){
        $(this).parent().css({"position":"relative"});
        $(this).parent().siblings().slideToggle();
        $warpEle.parent().removeAttr("style");
        return false;
    });
};