async function loadSiteFragment(selector, path) {
  var container = document.querySelector(selector);
  if (!container) {
    return;
  }

  var response = await fetch(path);
  if (!response.ok) {
    throw new Error("Unable to load " + path + ": " + response.status);
  }
  container.innerHTML = await response.text();
}

function loadScript(path) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.src = path;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function markCurrentNavigation() {
  var currentPath = window.location.pathname.replace(/\/index\.html$/i, "/");
  document.querySelectorAll("#header a[href]").forEach(function(link) {
    var linkPath = new URL(link.href, window.location.href).pathname.replace(/\/index\.html$/i, "/");
    if (linkPath === currentPath) {
      var item = link.querySelector("[title]") || link;
      item.classList.add("current");
    }
  });
}

async function initializeSite() {
  try {
    await Promise.all([
      loadSiteFragment("[data-site-header]", "header.html"),
      loadSiteFragment("[data-site-footer]", "footer.html")
    ]);
  } catch (error) {
    console.error(error);
  }

  document.querySelectorAll("[data-current-year]").forEach(function(element) {
    element.textContent = new Date().getFullYear();
  });
  markCurrentNavigation();
  await loadScript("resources/js/index.js");

  if (document.querySelector("#gallery")) {
    await loadScript("resources/js/gallery.js");
  }
  if (document.querySelector("#index-container")) {
    await loadScript("resources/js/blog.js");
  }
  if (document.querySelector(".image-showcase")) {
    await loadScript("resources/js/bio.js");
  }
}

initializeSite();