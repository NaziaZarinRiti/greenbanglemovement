/* =========================================================
   Green Bangle Movement — site behaviour
   (menu, dropdowns, photo viewer, form)
   ========================================================= */

/* ---------- FORM SETTINGS ----------
   To receive form messages in your inbox:
   1. Create a free form at https://formspree.io
   2. Paste your form link below, e.g. "https://formspree.io/f/abcdwxyz"
   Until then, the form opens the visitor's email app instead. */
var FORM_ENDPOINT = "";
var CONTACT_EMAIL = "greenbangleproject@auw.edu.bd";


document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var dropdowns = document.querySelectorAll(".nav-dropdown");
  var desktop = window.matchMedia("(min-width: 1081px)");
  var reduceMotionAll = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow when scrolling ---------- */
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Phone menu ---------- */
  var navLinks = document.querySelector(".nav-links");

  function setMenu(open) {
    // start the menu right under the header, wherever it is on screen
    if (open) navLinks.style.top = header.getBoundingClientRect().bottom + "px";
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!body.classList.contains("nav-open"));
  });

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("resize", function () {
    if (desktop.matches) setMenu(false);
  });

  /* ---------- Dropdown menus ---------- */
  function setDropdown(dropdown, open) {
    dropdown.classList.toggle("open", open);
    dropdown.querySelector("button").setAttribute("aria-expanded", String(open));
  }

  dropdowns.forEach(function (dropdown) {
    var timer;

    dropdown.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !dropdown.classList.contains("open");
      dropdowns.forEach(function (d) { setDropdown(d, false); });
      setDropdown(dropdown, open);
    });

    // On desktop, also open on hover
    dropdown.addEventListener("mouseenter", function () {
      if (!desktop.matches) return;
      clearTimeout(timer);
      setDropdown(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", function () {
      if (!desktop.matches) return;
      timer = setTimeout(function () { setDropdown(dropdown, false); }, 150);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-dropdown")) {
      dropdowns.forEach(function (d) { setDropdown(d, false); });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dropdowns.forEach(function (d) { setDropdown(d, false); });
      setMenu(false);
    }
  });

  /* ---------- Hero video: respect "reduce motion" ---------- */
  var video = document.querySelector(".hero-video");
  if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
  }

  /* ---------- Photo slideshow (changes every 4 seconds) ---------- */
  var SLIDE_SECONDS = 4;

  document.querySelectorAll(".slideshow").forEach(function (show) {
    var slides = show.querySelectorAll(".slide");
    var dotsBox = show.querySelector(".slide-dots");
    var current = 0;
    var timer;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slide-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show photo " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsBox.appendChild(dot);
    });
    var dots = dotsBox.querySelectorAll(".slide-dot");

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
      // load the photo after this one in advance
      var next = slides[(current + 1) % slides.length].querySelector("img");
      next.loading = "eager";
    }

    function start() {
      if (reduceMotion) return;
      timer = setInterval(function () { goTo(current + 1); }, SLIDE_SECONDS * 1000);
    }

    function stop() {
      clearInterval(timer);
    }

    function restart() {
      stop();
      start();
    }

    show.querySelector(".prev").addEventListener("click", function () { goTo(current - 1); restart(); });
    show.querySelector(".next").addEventListener("click", function () { goTo(current + 1); restart(); });

    // pause while the mouse is over the photos
    show.addEventListener("mouseenter", stop);
    show.addEventListener("mouseleave", restart);

    // swipe on phones
    var touchX = null;
    show.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    show.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var diff = e.changedTouches[0].clientX - touchX;
      if (Math.abs(diff) > 40) {
        goTo(current + (diff < 0 ? 1 : -1));
        restart();
      }
      touchX = null;
    });

    start();
  });

  /* ---------- Photo viewer (gallery and journey photos) ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item, .zoomable"));

  if (galleryItems.length) {
    var arrowLeft = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
    var arrowRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
    var closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Photo viewer");
    lightbox.innerHTML =
      '<button class="slide-arrow lightbox-close" type="button" aria-label="Close photo viewer">' + closeIcon + "</button>" +
      '<button class="slide-arrow prev" type="button" aria-label="Previous photo">' + arrowLeft + "</button>" +
      '<button class="slide-arrow next" type="button" aria-label="Next photo">' + arrowRight + "</button>" +
      '<img alt="" /><p class="lightbox-caption" aria-live="polite"></p>';
    body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lbIndex = 0;
    var lbOpener = null;

    function showPhoto(i) {
      lbIndex = (i + galleryItems.length) % galleryItems.length;
      var img = galleryItems[lbIndex].querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = img.alt + "  (" + (lbIndex + 1) + " of " + galleryItems.length + ")";
    }

    function closeViewer() {
      lightbox.classList.remove("open");
      body.style.overflow = "";
      if (lbOpener) lbOpener.focus();
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function () {
        lbOpener = item;
        showPhoto(i);
        lightbox.classList.add("open");
        body.style.overflow = "hidden";
        lightbox.querySelector(".lightbox-close").focus();
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeViewer);
    lightbox.querySelector(".prev").addEventListener("click", function () { showPhoto(lbIndex - 1); });
    lightbox.querySelector(".next").addEventListener("click", function () { showPhoto(lbIndex + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeViewer();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
      if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
    });
  }

  /* ---------- Journey: highlight the step you are reading ---------- */
  var journeyNav = document.querySelector(".journey-nav");
  if (journeyNav && "IntersectionObserver" in window) {
    var stepLinks = journeyNav.querySelectorAll("a");
    var navList = journeyNav.querySelector("ol");

    function markStep(id) {
      stepLinks.forEach(function (link) {
        var current = link.getAttribute("href") === "#" + id;
        if (current) {
          link.setAttribute("aria-current", "step");
          // keep the highlighted step visible in the bar (sideways only)
          var left = link.offsetLeft - navList.clientWidth / 2 + link.offsetWidth / 2;
          navList.scrollTo({ left: left, behavior: reduceMotionAll ? "auto" : "smooth" });
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var stepObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markStep(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll(".journey-row").forEach(function (row) {
      stepObserver.observe(row);
    });
  }

  /* ---------- Gentle fade-in for journey rows ---------- */
  var revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length && !reduceMotionAll && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* ---------- Tabs (What we plant) ---------- */
  document.querySelectorAll("[role=tablist]").forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[role=tab]"));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });
  });

  /* ---------- "Volunteer / Partner / Donate" buttons pick the form option ---------- */
  document.querySelectorAll("[data-choose]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("f-help");
      if (select) select.value = link.dataset.choose;
      setTimeout(function () {
        var name = document.getElementById("f-name");
        if (name) name.focus({ preventScroll: true });
      }, 500);
    });
  });

  /* ---------- Join form (with clear error messages) ---------- */
  document.querySelectorAll("form[data-gbm-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    var buttonText = button.textContent;

    function showStatus(type, message) {
      status.className = "form-status " + type;
      status.textContent = message;
    }

    function checkField(field) {
      var group = field.closest(".form-group");
      var error = group.querySelector(".form-error");
      var message = "";

      if (field.required && !field.value.trim()) {
        message = "Please enter your " + field.dataset.name + ".";
      } else if (field.type === "email" && field.value && !field.validity.valid) {
        message = "Please enter an email address like name@example.com.";
      }

      group.classList.toggle("has-error", !!message);
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message;
      return !message;
    }

    var fields = form.querySelectorAll("input[required], input[type=email]");

    // Check a field when the visitor leaves it, and again as they fix it
    fields.forEach(function (field) {
      field.addEventListener("blur", function () { checkField(field); });
      field.addEventListener("input", function () {
        if (field.closest(".form-group").classList.contains("has-error")) checkField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!checkField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        showStatus("error", "Please fix the highlighted fields and send again.");
        return;
      }

      var data = new FormData(form);

      if (!FORM_ENDPOINT) {
        var lines = [];
        data.forEach(function (value, key) { lines.push(key + ": " + value); });
        window.location.href =
          "mailto:" + CONTACT_EMAIL +
          "?subject=" + encodeURIComponent("Message from the GBM website") +
          "&body=" + encodeURIComponent(lines.join("\n"));
        showStatus("success", "Your email app is opening with your message filled in. Press send there to reach us.");
        return;
      }

      button.disabled = true;
      button.textContent = "Sending…";

      fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error();
          form.reset();
          showStatus("success", "Message sent. We’ll reply to you by email.");
        })
        .catch(function () {
          showStatus("error", "Your message didn’t send. Check your connection and try again, or email " + CONTACT_EMAIL + ".");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = buttonText;
        });
    });
  });
});
