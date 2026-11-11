# Green Bangle Movement website

Plain HTML, CSS and JavaScript. No build step: open any page in a browser.

## Where to edit things

| What | File |
|---|---|
| Navigation bar (every page) | `js/header.js` |
| Footer, contact details, social links (every page) | `js/footer.js` |
| All colours and styles | `css/style.css` (colours are at the top) |
| Menu, slideshow, photo viewer, form | `js/main.js` |
| Slideshow speed | `SLIDE_SECONDS` in `js/main.js` |
| Banner photo for each page | `.banner-about`, `.banner-why`... in `css/style.css` |
| Caching and security (Cloudflare) | `_headers` (no need to edit) |

## Pages

`index.html` (Home), `about.html`, `why.html`, `goals.html`, `achievements.html`,
`founder.html` (founder profile), `join.html` (Get involved + contact form + FAQ), `404.html` (page not found).

## Adding the founder's achievements

Open `founder.html`. Each achievement, degree, job or publication is one `<li class="cv-item">` block.
Copy a block, paste it at the top of its list, and change the year and text. There is a
ready-made template for the PhD in the Education list.

## Contact form

Open `js/main.js` and paste a free Formspree link into `FORM_ENDPOINT` at the top.
Until then, the form opens the visitor's email app with their message filled in.

## When you have your domain (one step)

The address `www.yourdomain.org` is a placeholder. Replace it everywhere with your real domain:

- In VS Code: press Ctrl+Shift+H (Cmd+Shift+H on Mac), type `www.yourdomain.org` in the first box,
  your domain (e.g. `www.greenbangle.org`) in the second, and click "Replace All".

It appears in the 6 pages, `sitemap.xml` and `robots.txt`. It makes link previews on
Facebook/WhatsApp show a photo, and helps Google find every page.

After that, in Google Search Console (https://search.google.com/search-console) add your
domain and submit `https://your-domain/sitemap.xml`.

## Visitor statistics (free)

In Cloudflare: Workers & Pages → your project → Metrics → turn on **Web Analytics**.
No code needed. It shows visitors and the most-read pages without cookies.

## Images

Each photo has two files: `name.jpg` (large, for computers) and `name-800.webp`
(small, for phones). Browsers pick the right one automatically.
If you add a new photo, make both: resize to 1400px for the .jpg and 800px for the .webp
(https://squoosh.app can do both).

## Deploying (GitHub + Cloudflare)

1. Upload everything in this folder to a GitHub repository (`index.html` at the top level).
2. In Cloudflare, create a Pages project and connect the repository.
3. Build command: leave empty. Output directory: `/`
4. Add your domain in the project's "Custom domains" tab.
