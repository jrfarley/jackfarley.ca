var header = document.getElementById("header"); //Page header item
var dropdownIcon = 0;   //0 if dropdown menu is hidden, 1 if shown
var menu = document.getElementById("menu"); //Page menu item
var windowSmall = false;    //True if the browser window is narrow, false otherwise
var menuItems = document.getElementsByClassName("menu-item"); //Array of all the page menu-items

//Alert message for if the browser is unsupported
const browserAlert = "Your current web browser is not fully compatible with our website, please switch to a recent version of Chrome, Edge, Safari, Firefox, etc. for a better website experience."

const testElem = document.createElement('div'); //Test element to check browser compatibility
if (testElem.style.flex !== undefined && testElem.style.grid !== undefined) {
  console.log("All tests pass");
} else {
  alert(browserAlert);
}

shrinkHeader();


window.onscroll = function(e) {shrinkHeader();} //Shrinks page header when user scrolls down


//window.onclick = function() {alert(screen.width);}

function shrinkHeader() {   //Shrinks page header
  if (!header) {
    return;
  }
  if (window.pageYOffset > 50 && dropdownIcon == 0) {
    header.classList.add("small-header");
  } else {
    header.classList.remove("small-header");
  }
}

function randomizeWallpaper() {
  var wallpaper = document.getElementById("wallpaper-container");
  if (!wallpaper) {
    return;
  }

  var images = Array.from(wallpaper.children);
  for (var index = images.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var currentImage = images[index];
    images[index] = images[randomIndex];
    images[randomIndex] = currentImage;
  }

  images.forEach(function(container, index) {
    var image = container.querySelector("img");
    if (image) {
      image.id = "wallpaper-image-" + (index + 1);
      image.alt = "";
    }
    wallpaper.appendChild(container);
  });
}

function showDropdown() {   //Displays dropdown menu
  if(dropdownIcon==0){
    dropdownIcon = 1;
    document.getElementById("menu-dropdown").style.display="block";
    header.classList.remove("small-header");
    setTimeout(function() {
      document.querySelector('#menu-dropdown').classList.remove('closed');
      document.querySelector('#menu-dropdown').classList.add('opened');
		},50);
  }else {
    document.querySelector('#menu-dropdown').classList.remove('opened');
    document.querySelector('#menu-dropdown').classList.add('closed');
    setTimeout(function() {
      document.querySelector('#menu-dropdown').classList.remove('closed');
      document.querySelector('#menu-dropdown').style.display = "none";
    },200);
    dropdownIcon = 0;
  }
}


function switchMenu(){    //Switches menu when the window is too narrow to display all menu items
  if (window.innerWidth < 500){
    if (windowSmall == false){
      document.getElementById("dropdown-icon-container").style.display = "block";
    }
    windowSmall = true;
  }else{
    if (dropdownIcon==1){
      navToggle(document.getElementById("nav-icon"));
        document.querySelector('#menu-dropdown').classList.remove('opened');
          document.querySelector('#menu-dropdown').classList.add('closed');
        setTimeout(function() {
       document.querySelector('#menu-dropdown').classList.remove('closed');
       document.querySelector('#menu-dropdown').style.display = "none";
     },200);
    }
    menu.style.display = "flex";
    document.getElementById("dropdown-icon-container").style.display = "none";
    windowSmall = false;
    dropdownIcon = 0;
  }
}

function navToggle(x) {   //Toggles dropdown menu icon
  x.classList.toggle("change");
}

function initMediumArticleDisplays(){
  var mediumTexts = document.getElementsByClassName('medium-article-text-container');
  for (i=0; i< mediumTexts.length; i++){
    initMediumArticleDisplay(mediumTexts[i]);
  }
}

function initMediumArticleDisplay(x){
    x.style.marginBottom = (-x.offsetHeight/2).toString()+"px";
}

function mobileMediumArticleHover(x){
  var preview = x.getElementsByClassName("medium-article-text-container")[0].getElementsByClassName("medium-article-preview")[0];
  var text = x.getElementsByClassName("medium-article-text-container")[0].getElementsByClassName("medium-article-text")[0];
  preview.classList.toggle("hide-preview");
  text.classList.toggle("show-text");
}

function mobileFeaturedStoryHover(x){
  var story = x.getElementsByClassName("story")[0]
  story.classList.toggle("show-story");
}

function initResearchMenu() {
  var researchMenu = document.getElementById('research-menu-item');
  if (!researchMenu) {
    return;
  }
  var submenuItems = researchMenu.getElementsByClassName('sub-menu-item');

  for(i=0; i < submenuItems.length; i++){
    if (submenuItems[i].innerHTML === 'VANCOUVER EPIPHYTES' || submenuItems[i].innerHTML === 'SUSTAINABLE ROOTS DRAGONFLIES'){
      submenuItems[i].parentElement.target = "_blank";
    }
  }
}

randomizeWallpaper();
initResearchMenu();
