var elementsToHideOnLoad = [];
$(function(){
  findStickyTops();
  $(window).scroll(stickObjsToTop);
  elementsToHideOnLoad.forEach(function(element){
    element.hide();
  })
});
var checkOrAddClass = function(elem, className){
  if(!elem.hasClass(className)){
    elem.addClass(className);
  }
}

var stickyTopPixels = [];
var findStickyTops = function(){
  $('.sticky-anchor').each(function(index, iterEl){
    var elem = $(this);
    var currentTop = elem.offset().top;
    if(stickyTopPixels.indexOf(currentTop) < 0){
      stickyTopPixels.push(currentTop);
    }
    elem.find('.sticky-top').each(function(index, childEl){
      var stickTopElem = $(this);
      stickTopElem.addClass('stick-to-' + currentTop);
    });
  });
};

var stickObjsToTop = function(){
  var windowTop = $(window).scrollTop();
  stickyTopPixels.forEach(function(topPixel){
    if(windowTop > topPixel){
      $('.stick-to-' + topPixel).addClass('stick')
    }
    else{
      $('.stick-to-' + topPixel).removeClass('stick');
    }
  })
};

