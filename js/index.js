// JavaScript Document
// rem设置
//字体尺寸随屏幕宽度变化而变化
function size() {
  var Wwidth = $(window).width();
  if (Wwidth > 780) {
    Wwidth = 780
  }
  var bs = (Wwidth / 320) * 10;
  var bspx = bs + "px";
  $("html").css("font-size", bs);
}
$(function() {
  size();
  var isClick = false
  var timer = null; //滚动截流定时器
  var curIndex = 1
  var sectionHeight = [ //各个section页面位置
        $('body').offset().top,
        $('.swiper').offset().top,
        $('.details-1').offset().top,
        $('.goods').offset().top,
        $('.details-3').offset().top
    ];
  $(window).scroll(function(e) { //页面滚动事件
    if (!isClick) {
      timer = setTimeout(changeCurrent(), 100);
    }
  });

  function changeCurrent() { //页面位置判断
    var scrollTop = $(window).scrollTop();
    for (var i = 0; i < sectionHeight.length; i++) { //遍历位置判断
      if (sectionHeight[i] <= scrollTop && scrollTop < sectionHeight[i + 1] && curIndex != i) { //设置导航显示切换区间
        navClassChange(i)
      }
      if (scrollTop >= sectionHeight[i] - 20 && curIndex != i) {
        navClassChange(sectionHeight.length - 1)
      }
    }
  }
  //导航栏点击跳转
  $('.header ul li').click(function(e) {
    pageJump($(this).index())
  });
  $('.fix-nav li').click(function(e) {
    console.log($(this).index(), sectionHeight[$(this).index()])
    pageJump($(this).index())
  });
  $('.share .weixin').click(function(e) {
    $('body,html').animate({
      scrollTop: $('.footer').offset().top
    })
  })
  //page跳转
  function pageJump(index) {
    isClick = true
    navClassChange(index)
    $('body,html').animate({
      scrollTop: sectionHeight[index] + 2
    }, function() {
      isClick = false
    });
  }

  function navClassChange(index) {
    $('.header ul li').eq(index).addClass('current').siblings().removeClass('current');
    $('.fix-nav li').eq(index).addClass('fix-nav-current').siblings().removeClass('fix-nav-current');
    curIndex = index
  }
});