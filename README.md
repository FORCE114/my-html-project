# Waldorf Astoria Madinah — 3D report (GitHub Pages build)

Static site generated from `WALDROF TO GITHUP.html` (310 MB single file).
No build step, no backend. All paths are relative, so it works under
`https://<user>.github.io/my-html-project/` or any other base path.

## Layout

```
index.html                 outer page (pager + two iframes) — unchanged UI
section1.html              page 1 scene (القطاع والموقع والرافعات)
section2.html              page 2 scene (حتى الدور الخامس)
assets/css/section.css     shared scene stylesheet (identical in both pages → one file)
assets/js/sectionN.app.js  Three.js bundle + scene app (patched to fetch data instead of inline base64)
assets/js/sectionN.loader.js  asset manifest + chunk loader
assets/models/sectionN/    gzip model blobs (scene / part / fire / ph), split into ≤19 MiB parts
assets/models/sectionN/manifest.json  sizes + SHA-256 of each reassembled blob
.nojekyll                  tells GitHub Pages to publish files as-is
```

## How the data is loaded

Each `*.gz.NNN` part is fetched in order, concatenated in memory, checked
against the manifest size, then decompressed with `DecompressionStream("gzip")`
exactly as the original inline code did. Rendering starts only after the
blob is complete, so execution order is identical to the original file.

## Upload to GitHub

1. Unzip `github-ready.zip` — the contents start directly with `index.html` and `assets/`.
2. In the repository `FORCE114/my-html-project`, upload everything (drag the
   folder contents into "Add file → Upload files", or `git add . && git push`).
   Every file is under 20 MB, so browser upload works.
3. Settings → Pages → Deploy from branch → `main` / `(root)`.
4. Open `https://force114.github.io/my-html-project/`.
