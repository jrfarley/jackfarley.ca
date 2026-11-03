/* 
  Gallery & Lightbox Controller
*/ 
var galleryImages = document.getElementsByClassName('gallery-image'); 
var gallery = document.getElementById('gallery');

if (gallery) {
  var galleryItems = Array.from(gallery.children);
  for (var galleryIndex = galleryItems.length - 1; galleryIndex > 0; galleryIndex--) {
    var randomGalleryIndex = Math.floor(Math.random() * (galleryIndex + 1));
    var galleryItem = galleryItems[galleryIndex];
    galleryItems[galleryIndex] = galleryItems[randomGalleryIndex];
    galleryItems[randomGalleryIndex] = galleryItem;
  }
  galleryItems.forEach(function(item) {
    gallery.appendChild(item);
  });
}

var modal = document.getElementById("modal"); 
var modalImg = document.getElementById("modal-content"); 
var captionText = document.getElementById("caption"); 
var span = document.getElementById("close"); 

var openModalNo = -1; 
var openModalName = ""; 

if (span) { 
  span.onclick = function() { 
    closeModal(); 
  }; 
} 

function openModal(img_path) {  
  openModalName = img_path;  

  // 1. Instantly hide image element and wipe old source to prevent flash
  modalImg.style.visibility = "hidden"; 
  modalImg.removeAttribute("src"); 
  modalImg.classList.remove("zoom"); 
  captionText.classList.remove("zoom"); 

  // 2. Open modal container
  modal.style.display = "flex";  

  // 3. Find matching element index and set caption
  var targetImg = document.getElementById(img_path);
  if (targetImg) {
    captionText.innerHTML = targetImg.alt;
  }

  openModalNo = -1;
  for (var i = 0; i < galleryImages.length; i++) {  
    var filename = galleryImages[i].src.split(/(\\|\/)/g).pop();
    if (filename === openModalName) {  
      openModalNo = i;  
      if (!targetImg) {
        captionText.innerHTML = galleryImages[i].alt;
      }
      break;
    }  
  }  

  // 4. Attach onload listener BEFORE setting src to catch fast browser cache
  modalImg.onload = function() { 
    modalImg.style.visibility = "visible"; 
    setTimeout(function() {  
      modalImg.classList.add("zoom");  
      setTimeout(function() {  
        captionText.classList.add("zoom");  
      }, 100);  
    }, 50);  
  }; 

  // 5. Trigger new image load
  modalImg.src = "resources/images/gallery-large/" + img_path;  
} 

function nextModal() { 
  if (openModalNo !== -1 && openModalNo < galleryImages.length - 1) { 
    var nextPath = galleryImages[openModalNo + 1].src.split(/(\\|\/)/g).pop();
    openModal(nextPath); 
  } 
} 

function prevModal() { 
  if (openModalNo > 0) { 
    var prevPath = galleryImages[openModalNo - 1].src.split(/(\\|\/)/g).pop();
    openModal(prevPath); 
  } 
} 

document.onkeydown = function (evt) { 
  evt = evt || window.event; 
  if (openModalNo !== -1) { 
    if (evt.keyCode === 27) { // Escape key
      closeModal(); 
    } else if (evt.keyCode === 39) { // Right arrow
      nextModal(); 
    } else if (evt.keyCode === 37) { // Left arrow
      prevModal(); 
    } 
  } 
}; 

function closeModal() { 
  captionText.classList.remove("zoom"); 
  setTimeout(function() { 
    modalImg.classList.remove("zoom"); 
    setTimeout(function() { 
      modal.style.display = "none"; 
      modalImg.style.visibility = "hidden";
      modalImg.removeAttribute("src"); 
      openModalNo = -1; 
    }, 100); 
  }, 100); 
}