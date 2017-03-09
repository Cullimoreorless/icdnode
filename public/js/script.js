var elementsToHideOnLoad = [];
$(function(){
  findStickyTops();
  $(window).scroll(stickObjsToTop);
  elementsToHideOnLoad.forEach(function(element){
    element.hide();
  });
  getNumberOfPhotosPerProject();
  if(projTileIds.length){
    projTileIds.forEach(function(tileId){
      $('#'+ tileId + ' img:gt(0)').hide();
    });
    startSlideshows();
  }
});

var numPhotoPerProject = {};
var projTileIds = [];
var projIntervals = {}
var startSlideshows = function(){
  projTileIds.forEach(function(tileId){
    if(numPhotoPerProject[tileId] > 1){
      projIntervals[tileId] = setInterval(function(){
        nextSlideShowPhoto(tileId);
      }, 20000/numPhotoPerProject[tileId]);
    }
  });
};
var nextSlideShowPhoto = function(projPhotosId){
  $('#'+projPhotosId + ' :first-child').fadeOut()
    .next('img').fadeIn().end().appendTo('#'+projPhotosId);
};
var getNumberOfPhotosPerProject = function(){
  $('.bgPhotos').each(function(index, elem){
    var thisId = $(this).attr('id');
    numPhotoPerProject[thisId] = $(this).children('img.projectTilePhoto').length;
    projTileIds.push(thisId);
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

