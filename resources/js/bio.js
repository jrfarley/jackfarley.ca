var showcaseIndex = 1;
var showcaseImages = document.getElementsByClassName("showcase-image-container");
var showcaseIndexArray = new Array(1,1);
var showcases = document.getElementsByClassName("image-showcase");

function displayArrows(){
  if (showcaseIndex == 1){
    document.getElementsByClassName("slide-arrow")[0].style.opacity = "0.6";
  }else {
    document.getElementsByClassName("slide-arrow")[0].style.opacity = "1";
  }
  if (showcaseIndex == showcaseImages.length){
    document.getElementsByClassName("slide-arrow")[1].style.opacity = "0.6";
  }else{
    document.getElementsByClassName("slide-arrow")[1].style.opacity = "1";
  }
}


if(showcases.length > 1){
  for (i=0; i<=showcases.length; i+=2){
    document.getElementsByClassName('slide-arrow')[i].style.opacity = "0.6";
  }
}

function changeSlide(n) {
  var i;

  if (n=='f'){
    if(showcaseIndex != showcaseImages.length){
      showcaseIndex +=1;
    }else{
      return -1;
    }
  }else if (n=='b'){
    if(showcaseIndex != 1){
      showcaseIndex -= 1;
    }else{
      return -1;
    }
  }else{
    showcaseIndex = n;
  }
  for (i = 0; i< showcaseImages.length; i++){
    showcaseImages[i].style.display = "none";
  }
  if (showcaseIndex > showcaseImages.length) {showcaseIndex = 1}
  showcaseImages[showcaseIndex-1].style.display="block";
  paused=true;
  displayArrows();
  setTimeout(function(){paused=false;},500);
}


function changeSlideMultiple(showcaseNo, n) {
  var showcaseImages = document.getElementsByClassName('image-showcase')[showcaseNo].getElementsByClassName('showcase-image-container');
  var i;

  if (n=='f'){
    if(showcaseIndexArray[showcaseNo] != showcaseImages.length){
      showcaseIndexArray[showcaseNo] +=1;
    }else{
      return -1;
    }
  }else if (n=='b'){
    if(showcaseIndexArray[showcaseNo] != 1){
      showcaseIndexArray[showcaseNo] -= 1;
    }else{
      return -1;
    }
  }else{
    showcaseIndexArray[showcaseNo] = n;
  }
  for (i = 0; i< showcaseImages.length; i++){
    showcaseImages[i].style.display = "none";
  }

  if (showcaseIndexArray[showcaseNo] > showcaseImages.length) {showcaseIndexArray[showcaseNo] = 1}
  showcaseImages[showcaseIndexArray[showcaseNo]-1].style.display="block";
  paused=true;

    if (showcaseIndexArray[showcaseNo] == 1){
      document.getElementsByClassName("slide-arrow")[0 + 2*showcaseNo].style.opacity = "0.6";
    }else {
      document.getElementsByClassName("slide-arrow")[0 + 2*showcaseNo].style.opacity = "1";
    }
    if (showcaseIndexArray[showcaseNo] == showcaseImages.length){
      document.getElementsByClassName("slide-arrow")[1 + 2*showcaseNo].style.opacity = "0.6";
    }else{
      document.getElementsByClassName("slide-arrow")[1 + 2*showcaseNo].style.opacity = "1";
    }

  setTimeout(function(){paused=false;},500);
}

displayArrows();
