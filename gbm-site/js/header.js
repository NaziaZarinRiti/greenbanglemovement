/* =========================================================
   SHARED HEADER — edit the menu here once,
   it updates on every page.
   Each page includes:  <script src="js/header.js"></script>
   right after <body>.
   ========================================================= */

(function () {
  var icon = {
    caret: '<svg class="nav-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>',
  };

  var headerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="navbar">
      <a href="index.html" class="nav-brand">
        <img src="img/gbm-logo.png" alt="" class="nav-logo" width="54" height="54" />
        <span>
          <span class="nav-name">Green Bangle Movement</span>
          <span class="nav-tagline">Women for Green World</span>
        </span>
      </a>

      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>

      <nav class="nav-links" id="nav-links" aria-label="Main">
        <a href="index.html" class="nav-link">Home</a>

        <div class="nav-dropdown">
          <button class="nav-link" type="button" aria-expanded="false">About us ${icon.caret}</button>
          <div class="nav-dropdown-menu">
            <a href="about.html" class="nav-dropdown-item">Who we are</a>
            <a href="founder.html" class="nav-dropdown-item">Our founder</a>
            <a href="about.html#journey" class="nav-dropdown-item">Our journey</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link" type="button" aria-expanded="false">Our work ${icon.caret}</button>
          <div class="nav-dropdown-menu">
            <a href="why.html" class="nav-dropdown-item">Why it matters</a>
            <a href="goals.html" class="nav-dropdown-item">Our goals</a>
            <a href="achievements.html" class="nav-dropdown-item">Achievements</a>
          </div>
        </div>

        <a href="join.html#contact" class="nav-link">Contact</a>
        <a href="join.html" class="btn">Get involved</a>
      </nav>
    </div>
  </header>`;

  var me = document.currentScript;
  me.insertAdjacentHTML("beforebegin", headerHTML);

  // Mark the menu item for the current page
  var page = location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href.indexOf("#") !== -1 || href.replace(".html", "") !== page) return;
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
    var dropdown = link.closest(".nav-dropdown");
    if (dropdown) dropdown.querySelector(".nav-link").classList.add("active");
  });
})();
