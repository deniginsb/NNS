# Images & Screenshots 📸

This folder contains images used in NNS documentation.

## Main Preview Image

### `nns-preview.jpg`

**Description:** Main NNS homepage screenshot showcasing the platform

**Content:**
- NNS logo (top left)
- Connect Wallet button (top right)
- Hero title: "Nexus Name Service"
- Subtitle: "Your identity on the Nexus blockchain"
- Description: "Register your .nexus domain on Nexus Testnet"
- Domain search input with ".nexus" suffix
- Connect button
- Pricing info: "Registration fee: 0.5 NEX • Duration: 1 year"

**Specifications:**
- Format: JPG
- Dimensions: 750x1624 (mobile-optimized)
- Background: Gradient (gray to pink/orange)
- Color scheme: Yellow/orange accents on buttons

**Used in:**
- README.md (main preview)
- Documentation pages
- Social media sharing
- GitHub repository banner

---

## Adding New Images

If you need to add more screenshots:

1. **Naming Convention**
   - Use lowercase with hyphens
   - Descriptive names (e.g., `profile-page.jpg`)
   - Consistent format (JPG for photos, PNG for UI with transparency)

2. **Optimization**
   - Compress images before adding
   - Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Aim for <500KB per image
   - Maintain visual quality

3. **Specifications**
   - Desktop screenshots: 1920x1080
   - Mobile screenshots: 375x812 (iPhone X) or 750x1624
   - UI elements: PNG with transparency
   - Photos/previews: JPG

4. **Organization**
   - Place in `/docs/images/` folder
   - Update this README with description
   - Reference in documentation using relative path

---

## Image Usage in Markdown

### README.md (Root Level)
```markdown
![NNS Preview](docs/images/nns-preview.jpg)
```

### Documentation in docs/ folder
```markdown
![NNS Preview](./images/nns-preview.jpg)
```

### With Alt Text
```markdown
![Nexus Name Service Homepage](./images/nns-preview.jpg)
> *NNS homepage showing domain registration interface*
```

---

## Image Credits

- `nns-preview.jpg` - NNS official homepage screenshot

All images © Nexus Name Service team and contributors.

---

Last updated: 2025-11-29
