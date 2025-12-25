# Cricket Ball Icon Generation Guide

This project uses a cricket ball as its favicon and app icons.

## Automatic Icon Generation

We've created an HTML-based icon generator that creates all necessary icon sizes.

### How to Generate Icons:

1. **Open the Generator:**
   - Navigate to `public/generate-icons.html` in your browser
   - Or open: `file:///[your-path]/cricketscorer/public/generate-icons.html`

2. **Download All Icons:**
   The page will automatically generate and provide download links for:
   - `favicon-16x16.png` - Small browser tab icon
   - `favicon-32x32.png` - Standard browser tab icon
   - `favicon.ico` - IE/legacy browser icon
   - `apple-touch-icon.png` (180x180) - iOS home screen icon
   - `icon-192x192.png` - Android home screen icon
   - `icon-512x512.png` - High-res PWA icon

3. **Place the Icons:**
   - Download all icons using the provided links
   - Place them in the `public/` directory
   - The SVG favicon is already created at `public/favicon.svg`

## Icon Sizes Reference

| File | Size | Purpose |
|------|------|---------|
| favicon.svg | Vector | Modern browsers (auto-scales) |
| favicon.ico | 32x32 | Legacy browsers (IE, etc.) |
| favicon-16x16.png | 16x16 | Small browser tabs |
| favicon-32x32.png | 32x32 | Standard browser tabs |
| apple-touch-icon.png | 180x180 | iOS home screen |
| icon-192x192.png | 192x192 | Android home screen |
| icon-512x512.png | 512x512 | High-res PWA splash screen |

## PWA Icons

For the PWA (Progressive Web App) functionality, you need to generate the full icon set for the `public/icons/` directory:

### Required PWA Icon Sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

### Quick PWA Icon Generation:

You can use online tools like:
- [PWA Asset Generator](https://www.pwabuilder.com/)
- [Favicon Generator](https://favicon.io/)
- [Real Favicon Generator](https://realfavicongenerator.net/)

Or use the provided `generate-icons.html` and manually resize for other sizes.

## Cricket Ball Design

The cricket ball icon features:
- **Red gradient** - From bright red to deep maroon
- **White seam lines** - Curved stitching pattern
- **Realistic stitching** - Individual stitch marks
- **3D highlight** - Subtle gradient for depth
- **Professional look** - Clean, recognizable design

## Manual Icon Creation (Alternative)

If you prefer to create icons manually:

1. Use the SVG file at `public/favicon.svg` as a base
2. Open in a graphics editor (Inkscape, Illustrator, Figma)
3. Export at each required size
4. Save as PNG with transparent background
5. Use an online ICO converter for the `.ico` file

## Theme Colors

The app uses these brand colors:
- Primary: `#667eea` (Purple-Blue gradient)
- Secondary: `#764ba2` (Purple)
- Ball Red: `#DC143C` (Crimson)
- Dark Red: `#8B0000` (Dark Red)

## Notes

- SVG favicon provides the best quality across all sizes
- Modern browsers prefer SVG over PNG/ICO
- Apple devices need the specific `apple-touch-icon.png`
- PWA requires multiple sizes for different devices
- All icons use the same cricket ball design for consistency
