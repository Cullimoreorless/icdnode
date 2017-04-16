var elementsToHideOnLoad = [];
$(function(){
  $('html, body').fadeIn(300);
  hideLoadingBar();

  $('#mobileMenuButton').click(function(){
    $('#mobileDropDown').toggle('show');
  })
  addProjectTileHover();
  $('.nav-hover-container').hover(function () {
      $(this).children('.nav-hover-right').css({
        "width": "17px",
        "right": "auto",
        "left": "32px",
        "opacity": "0.3"
      });
      $(this).children('.nav-hover-left').css({
        "width": "17px",
        "left": "11px",
        "right": "auto",
        "opacity": "0.3"
      });
    }, function () {
      $(this).children('.nav-hover-right').css({
        "width": "0px",
        "right": "0px",
        "left":"100%",
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
  // findScrollTops();
  // $('.scroll-show').hide();
  $(window).scroll(function(){
    checkScrollVisibility();
    stickObjsToTop();
    checkScrollButtonVisibility();
  });
  makeTilesSquare();
  $(window).resize(function(){
    makeTilesSquare();
  });
  var pagePhotos = $('img.pagePhoto');
  findScrollTops();
  
  
  if(pagePhotos.length){
    var photoInterval = setInterval(function(){
      var cancelInterval = true;
      pagePhotos.each(function(index, elem){
        if(!elem.naturalHeight){
          cancelInterval = false;
          return false;
        }
      });
      if(cancelInterval){
        findScrollTops();
        $('.scroll-show').hide();
        clearInterval(photoInterval);
      }
    }, 1000);
  }


  checkScrollVisibility();
  stickObjsToTop();
  elementsToHideOnLoad.forEach(function(element){
    element.hide();
  });


  var scrollTopBtn = $('#scrollToTop');
  scrollTopBtn.click(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
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
var projIntervals = {};
function startSlideshows(){
  slideShowContainerIds.forEach(function(tileId){
    if(numOfSlides[tileId] > 1){
      projIntervals[tileId] = setInterval(function(){
        nextSlide(tileId);
      }, 20000/numOfSlides[tileId]);
    }
  });
};
function nextSlide(containerId){
  $('#'+containerId + ' :first-child').fadeOut(400).delay(800)
    .next('.slide').delay(400).fadeIn().end().appendTo('#'+containerId);
};
function getNumberOfSlides(slideClass){
  $('.slide-show').each(function(index, elem){
    var thisId = $(this).attr('id');
    numOfSlides[thisId] = $(this).children('.slide').length;
    slideShowContainerIds.push(thisId);
  });
};
function checkScrollButtonVisibility(){
  var scrollBottom = $(window).scrollTop() + $(window).height();
  var bodyBottom = $('body').height();
  var scrollTopBtn = $('#scrollToTop');
  if(bodyBottom - scrollBottom  < 170){
    scrollTopBtn.slideDown();
  }
  else{
    scrollTopBtn.slideUp();        
  }
}

function checkOrAddClass(elem, className){
  if(!elem.hasClass(className)){
    elem.addClass(className);
  }
};

var stickyTopPixels = [];
function findStickyTops(){
  stickyTopPixels = [];
  $('.sticky-anchor').each(function(index, iterEl){
    var elem = $(this);
    var currentTop = Math.floor(elem.offset().top);
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
function findScrollTops(){
  var scrollTops = [];
  $('.scroll-anchor').each(function(index, iterEl){
    var elem = $(this);
    var nextElem = elem.next('.scroll-show');
    nextElem.attr('class', function(i, c){
      return c.replace(/(^|\s)scroll-visible-\S+/g,'');
    })
    var currentTop = Math.floor(elem.offset().top);
    if(scrollTops.indexOf(currentTop) < 0){
      scrollTops.push(currentTop);
    }
    nextElem.addClass('scroll-visible-'+currentTop);

  });
  scrollTopsSorted = scrollTops.sort(function(a, b){
    if(parseInt(a) < parseInt(b)){
      return -1;
    }
    return 1;
  });
}
function checkScrollVisibility(){
  var windowTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var windowMiddle = windowTop + (windowHeight/2);
  var paddingAmount = 100;
  for(var i = 0; i < scrollTopsSorted.length; i++){
    var thisTop = scrollTopsSorted[i];
    var nextTop = i + 1 == scrollTopsSorted.length ? 100000 : scrollTopsSorted[i + 1];
    var comparisonNum = thisTop + paddingAmount;
    if(i == 0 && windowTop < scrollTopsSorted[0]){
      comparisonNum = -1000;
    }
    var thisElem = $('.scroll-visible-'+thisTop);
    if(comparisonNum < windowMiddle && (nextTop - paddingAmount) > windowMiddle){
      $('.scroll-visible-' + thisTop).fadeIn(200);
    }
    else {
      $('.scroll-visible-' + thisTop).fadeOut(200);
    }
  }
}
function stickObjsToTop(){
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

function makeTilesSquare(){
  var currentWidth = $('.projectTile').width();
  $('.projectTileContainer, .bgPhotos, .photoCaptions, .photoOverlay').css({
    'height':currentWidth+'px',
    'max-height':currentWidth+'px'
  });
}

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
function addProjectTileHover(){
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
}

window.onbeforeunload = function(e){
  $('html, body').fadeOut(300);
  //setTimeout(function(){console.log("fading...")}, 300)
}