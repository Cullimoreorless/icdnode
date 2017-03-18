var elementsToHideOnLoad = [];
$(function(){
  $('.projectTile').hover(function(){
    $(this).find('.photoOverlay').css({
      'background-color': 'rgba(40,40,40,0.3)',
      'color':'rgba(230,230,230, 0.95)'});
  }, function(){
    $(this).find('.photoOverlay').css({
      'background-color': 'rgba(40,40,40,0.7)',
      'color':'rgba(250,250,250, 0.9)'});
  });
  $('.nav-hover-container').hover(function () {
      $(this).children('.nav-hover-right').animate({
        "width": "20px",
        "right": "88px",
        "left": "auto",
        "opacity": "0.3"
      }, 200);
      $(this).children('.nav-hover-left').animate({
        "width": "20px",
        "left": "18px",
        "right": "auto",
        "opacity": "0.3"
      }, 200);
    }, function () {
      $(this).children('.nav-hover-right').animate({
        "width": "0px",
        "right": "80px",
        "left": "auto",
        "opacity": "0"
      }, 200);
      $(this).children('.nav-hover-left').animate({
        "width": "0px",
        "left": "10px",
        "right": "auto",
        "opacity": "0"
    }, 200);
  });
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

