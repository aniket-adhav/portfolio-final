---
name: Portfolio SVG watermark positioning
description: The project-summary SVG text (CIVIC ASSIST etc) was offset right:-36% causing text to be clipped. Fix is left:0;right:0.
---

The `.svg[data-device='laptop']` in `project-summary.module.css` must use `left: 0; right: 0` (not `right: -36%`).
The -36% offset caused the text to appear cropped at the right edge of the viewport.

**Why:** The SVG is `width: 100%` of its positioned parent — setting both left and right to 0 ensures it spans the full width of the preview column and centers under the laptop model.

**How to apply:** If the SVG text watermark below the laptop looks clipped or shifted right, check for a `right: -XX%` value in `.svg[data-device='laptop']` and replace with `left: 0; right: 0`.
