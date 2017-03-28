var elementsToHideOnLoad = [];
$(function(){
  hideLoadingBar();

  $('#mobileMenuButton').click(function(){
    $('#mobileDropDown').toggle('show');
  })
  $('.projectTile').hover(function(){
    $(this).find('.photoOverlay').css({
      'background-color': 'rgba(40,40,40,0.4)',
      'color':'rgba(230,230,230, 0.95)'});
    $(this).find('.projectOverlayText').css({
      "margin-top":"0px"
    });
    $(this).find('.photoCaptionContainer').css({
      "height":"60px"
    })
  }, function(){
    $(this).find('.photoOverlay').css({
      'background-color': 'rgba(40,40,40,0.1)',
      'color':'rgba(250,250,250, 0.9)'});
    $(this).find('.projectOverlayText').css({
      "margin-top":'-75px'
    });
    $(this).find('.photoCaptionContainer').css({
      "height":"0px"
    });
  });
  $('.nav-hover-container').hover(function () {
      $(this).children('.nav-hover-right').css({
        "width": "17px",
        "right": "64px",
        "left": "auto",
        "opacity": "0.3"
      });
      $(this).children('.nav-hover-left').css({
        "width": "17px",
        "left": "18px",
        "right": "auto",
        "opacity": "0.3"
      });
    }, function () {
      $(this).children('.nav-hover-right').css({
        "width": "0px",
        "right": "50px",
        "left":"auto",
        "opacity": "0"
      });
      $(this).children('.nav-hover-left').css({
        "width": "0px",
        "left": "10px",
        "right": "auto",
        "opacity": "0"
    });
  });
  findStickyTops();
  findScrollTops();
  $('.scroll-show').hide();
  $(window).scroll(function(){
    checkScrollVisibility();
    stickObjsToTop();
  });
  checkScrollVisibility();

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
var scrollTopsSorted = [];
var findScrollTops = function(){
  var scrollTops = [];
  $('.scroll-show').each(function(index, iterEl){
    var elem = $(this);
    var currentTop = elem.offset().top;
    if(scrollTops.indexOf(currentTop) < 0){
      scrollTops.push(currentTop);
    }
    elem.addClass('scroll-visible-'+currentTop);
    
  });
  scrollTopsSorted = scrollTops.sort(function(a, b){
    if(parseInt(a) < parseInt(b)){
      return -1;
    }
    return 1;
  });
}
var checkScrollVisibility = function(){
  var windowTop = $(window).scrollTop();
    var paddingAmount = 150;
  for(var i = 0; i < scrollTopsSorted.length; i++){
    var thisTop = scrollTopsSorted[i];
    var nextTop = i + 1 == scrollTopsSorted.length ? 100000 : scrollTopsSorted[i + 1];
    var comparisonNum = thisTop - paddingAmount;
    if(i == 0 && windowTop < scrollTopsSorted[0]){
      comparisonNum = -1000;
    }
    var thisElem = $('.scroll-visible-'+thisTop);
    if(comparisonNum < windowTop && (nextTop - paddingAmount) > windowTop){
      $('.scroll-visible-' + thisTop).fadeIn();
    }
    else {//if((comparisonNum > windowTop || (nextTop - paddingAmount) < windowTop) && thisElem.is(':visible')){
      $('.scroll-visible-' + thisTop).fadeOut();
    }
  }
}
var stickObjsToTop = function(){
  var windowTop = $(window).scrollTop();
  stickyTopPixels.forEach(function(topPixel){
    stickElem = $('.stick-to-' + topPixel);
    var originalWidth = stickElem.width();
    if(windowTop > topPixel){
      stickElem.addClass('stick');
      stickElem.width(originalWidth);
    }
    else{
      stickElem.removeClass('stick');
    }
  });
};


function makeHeightOfParent(childSelector, parentSelector){
  $(childSelector).each(function(index, elem){
    var $this = $(elem);
    $this.css('height', '0px');
    $this.css('height', $this.parents(parentSelector).css('height'));
  })
}
function showLoadingBar(message){
  if(!message){
    message = 'Loading...';
  }
  $('#loading-bar').text(message);
  $('#loading-bar').slideDown();
}
function hideLoadingBar(){
  $('#loading-bar').slideUp();
}