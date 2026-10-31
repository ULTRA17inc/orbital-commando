# Orbital Commando website

A static one-page site for the game and the ULTRA17 YouTube channel. Plain HTML, CSS and JS with no build step.

- `index.html`, `style.css`, `main.js`: the page.
- `assets/`: made by `python Tools/Website/build_assets.py`. It builds the game's HUD pixel font as a web font, WebP copies of the screenshots, the hero loop and a 720p trailer. Run it again after changing the picture list in that script.

## Preview

```
python -m http.server 8080 --directory website
```

Then open http://localhost:8080.

## Download links

The demo's Download button points straight at the zip on the site repo's GitHub release (`demo-v0.3`). For a new demo build, upload the zip to a new release (`gh release create demo-v0.4 <zip> -R ULTRA17inc/orbital-commando`) and change the link in the `#demo` section of `index.html`. The itch.io links go to https://kruza117.itch.io/orbital-commando-demo.

## Hosting

The folder can also go as it is onto Netlify or Cloudflare Pages. It is about 12 MB.

## Live site

The site is live at https://ultra17inc.github.io/orbital-commando/, served by GitHub Pages from the main branch of the public repo `ULTRA17inc/orbital-commando`. That repo holds only this folder; the game repo stays private. To publish changes after committing them here, run these from the repo root:

```
git subtree split --prefix=website -b site-publish
git push https://github.com/ULTRA17inc/orbital-commando.git site-publish:main
git branch -D site-publish
```

GitHub rebuilds the site within a minute or two.
