# Assets folder

Place your images here. Options to use them in the app:

- Public path: move files to `public/` if you want to reference them as `/image.png` without bundling.
- Imported assets: keep files in `assets/` and import in components so Vite fingerprints them:
  ```tsx
  import heroImg from './assets/placeholder.svg';
  <img src={heroImg} alt="Hero" />
  ```

A starter placeholder is available at `assets/placeholder.svg`.
