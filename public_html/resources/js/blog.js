var blogIndex = 0;
var blogs;

function toggleCaret (caretNo){
  var list = document.getElementById("index-container").getElementsByClassName("collapsed-list");
  var caret = document.getElementsByClassName("caret")[caretNo];
  if (caret.textContent === "\u25bc") {
    caret.textContent = "\u25ba";
    list[caretNo].style.display="none";
  } else {
    caret.textContent = "\u25bc";
    list[caretNo].style.display="block";
  }
}

blogs = document.getElementsByClassName("blog");
showBlogFromHash();

function nextBlog() {
  if (!blogs || blogIndex >= blogs.length - 1) {
    return;
  }
  blogs[blogIndex].style.display = "none";
  blogIndex++;
  blogs[blogIndex].style.display = "block";
}

function switchBlog() {
  window.setTimeout(showBlogFromHash, 0);
}

function showBlogFromHash() {
  blogs = document.getElementsByClassName("blog");
  if (!blogs.length) {
    return;
  }

  var requestedIndex = Number.parseInt(window.location.hash.slice(1), 10);
  blogIndex = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < blogs.length
    ? requestedIndex
    : 0;

  for (var index = 0; index < blogs.length; index++) {
    blogs[index].style.display = index === blogIndex ? "block" : "none";
  }
}
