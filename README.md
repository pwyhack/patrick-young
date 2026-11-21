# pwy.ai

Patrick Young's site. Static HTML + one stylesheet, served by a Cloudflare Worker.

- `pwy.ai` is canonical. `patrickyoung.ai`, `www.pwy.ai`, `www.patrickyoung.ai` 301 to the same path on `pwy.ai` (`worker.js`).
- `pwy.ai/wiki*` is a separate private Worker (`private-wiki/`, git-ignored, Cloudflare Access). Its more specific routes win over `pwy.ai/*`.
- Add a page: write `name.html` using an existing note as the template, link it from `index.html`, add it to `sitemap.xml`.

```
python3 dev.py        # local preview at http://127.0.0.1:8800
npx wrangler deploy   # ship
```
