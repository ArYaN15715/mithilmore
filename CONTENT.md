# How to put YOUR content into this site

Everything editable lives in two data files — you never need to touch the
page components to change content.

## 1. Your photos

- **Portrait**: replace `src/assets/portrait.jpg` (vertical, ~1200×1600px).
- **Hero image**: replace `src/assets/hero.jpg` with your single best interior
  photo (landscape, ~2400px wide, JPG quality 80).

## 2. Your projects (the important one)

Open `src/data/projects.ts`. Each project is one object in the `projects`
array. For every real project:

1. Put its photos in `src/assets/projects/<slug>/`
   (e.g. `src/assets/projects/akota-residence/01.jpg`).
   Export at 2000px on the long edge, JPG quality 80. Name them in the order
   you want them to appear: `01.jpg`, `02.jpg`, …
2. Import them at the top of `projects.ts`:
   ```ts
   import akota01 from "../assets/projects/akota-residence/01.jpg";
   ```
3. Fill in the object:
   - `slug` — kebab-case, becomes the URL (`/projects/akota-residence`)
   - `title` — name it after the place ("Akota Residence"), the convention
     every serious interior portfolio uses
   - `typology` — Private Residence / Commercial / Apartment / Academic…
   - `location`, `year`
   - `role` — what YOU did (e.g. "Space planning · Site coordination")
   - `tools` — software used on this project
   - `intro` — 2–4 sentences: the brief, the constraint, the result.
     Keep it short; the photos do the talking.
   - `photos` — one entry per image with a `layout`:
     - `"full"` — full-width hero shots (your best wide images)
     - `"half"` — pairs of vertical shots side by side
     - `"detail"` — a smaller offset close-up (materials, joinery)
4. **Delete the sample projects** once your real ones are in.

The homepage grid, the detail pages, and the "next project" loop all update
automatically from this file.

## 3. Contact & socials

Open `src/data/site.ts`:
- `instagram` — paste your full profile URL to make the Instagram link
  appear in the footer (it is hidden while empty).
- Email, phone and WhatsApp are already set to your real details.

## 4. The "Details" strip and materials

The horizontal "Details" gallery and the Material Library on the homepage
currently use sample images (`src/assets/mat-*.jpg`, project placeholders).
Replace those files with your own close-ups when ready — same filenames, no
code changes needed.

## 5. Publish

```
npm run build   # confirm it compiles
git add -A && git commit -m "content: real projects"
git push        # Lovable / your host picks it up
```
