---
name: Portfolio resume button location
description: Resume button is in navbar.jsx (not home.jsx), uses resumeOpen state, opens PDF in an iframe modal overlay.
---

The floating bottom-right Resume button belongs in `app/layouts/navbar/navbar.jsx`, NOT in `home.jsx`.

Pattern:
- `resumeOpen` state in Navbar component
- `<Button className={styles.resumeButton} onClick={() => setResumeOpen(true)} icon="resume" secondary>Resume</Button>` rendered outside `<header>`
- Modal overlay with iframe `src="/aniket-adhav-resume.pdf"` + download link + close button
- CSS class `.resumeButton { position: fixed; bottom: 32px; right: 32px; }` in `navbar.module.css`

**Why:** Matches the repo's architecture. Putting it in home.jsx means it disappears on other pages; navbar ensures it's always visible.
