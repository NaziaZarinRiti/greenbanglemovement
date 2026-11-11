/* =========================================================
   SHARED FOOTER — edit contact details & links here once,
   it updates on every page.
   Each page includes:  <script src="js/footer.js"></script>
   just before </body>.
   ========================================================= */

(function () {
  var year = new Date().getFullYear();

  var icon = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zM9 9h2.9v1.7h.1c.4-.8 1.4-1.9 3.2-1.9 3.3 0 3.8 2.2 3.8 5V21h-3v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z"/></svg>',
  };

  var footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="img/gbm-logo.png" alt="" width="52" height="52" loading="lazy" />
            <span>Green Bangle Movement</span>
          </div>
          <p>
            A women-led climate initiative planting mangroves and palmyra palms
            with coastal communities in Bangladesh.
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com/share/1Dcj34zXPW/" target="_blank" rel="noopener" aria-label="Facebook">${icon.facebook}</a>
            <a href="https://www.instagram.com/greenbanglemovement/" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
            <a href="https://www.linkedin.com/company/greenbanglemovement/" target="_blank" rel="noopener" aria-label="LinkedIn">${icon.linkedin}</a>
          </div>
        </div>


        <div>
          <div class="footer-heading">Contact us</div>
          <ul class="footer-list">
            <li><a href="mailto:greenbangleproject@auw.edu.bd">greenbangleproject@auw.edu.bd</a></li>
            <li><a href="tel:+8801735417324">01735-417324</a></li>
            <li>Asian University for Women<br />Chattogram, Bangladesh</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <span>© ${year} Green Bangle Movement. All rights reserved.</span>
      </div>
    </div>
  </footer>`;

  document.currentScript.insertAdjacentHTML("beforebegin", footerHTML);
})();
