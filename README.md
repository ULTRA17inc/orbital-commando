# Orbital Commando website

A static one-page site for the game and the ULTRA17 YouTube channel. Plain HTML, CSS and JS with no build step.

- `index.html`, `style.css`, `main.js`: the page.
- `assets/`: made by `python Tools/Website/build_assets.py`. It builds the game's HUD pixel font as a web font, WebP copies of the screenshots, the hero loop and a 720p trailer. Run it again after changing the picture list in that script.

## Preview

```
python -m http.server 8080 --directory website
```

Then open http://localhost:8080.

## itch.io link

Once the demo page is live, put its URL in `LINKS.itch` at the top of `main.js`. Until then, the download buttons read "Coming soon to itch.io".

## Hosting

Upload the `website/` folder as it is to GitHub Pages, Netlify or Cloudflare Pages. The whole folder is about 12 MB.
