var elementsToHideOnLoad = [];
$(function(){
  findStickyTops();
  $(window).scroll(stickObjsToTop);
  elementsToHideOnLoad.forEach(function(element){
    element.hide();
  });
  getNumberOfSlides();
  if(slideShowContainerIds.length){
    slideShowContainerIds.forEach(function(tileId){
      $('#'+ tileId + ' .slide:gt(0)').hide();
    });
    startSlideshows();
  }
});

var numOfSlides = {};
var slideShowContainerIds = [];
var projIntervals = {}
var startSlideshows = function(){
  slideShowContainerIds.forEach(function(tileId){
    if(numOfSlides[tileId] > 1){
      projIntervals[tileId] = setInterval(function(){
        nextSlide(tileId);
      }, 20000/numOfSlides[tileId]);
    }
  });
};
var nextSlide = function(containerId){
  $('#'+containerId + ' :first-child').fadeOut(400).delay(800)
    .next('.slide').delay(400).fadeIn().end().appendTo('#'+containerId);
};
var getNumberOfSlides = function(slideClass){
  $('.slide-show').each(function(index, elem){
    var thisId = $(this).attr('id');
    numOfSlides[thisId] = $(this).children('.slide').length;
    slideShowContainerIds.push(thisId);
  });
};


var checkOrAddClass = function(elem, className){
  if(!elem.hasClass(className)){
    elem.addClass(className);
  }
};

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
  });
};

