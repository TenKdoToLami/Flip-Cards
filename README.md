# Flip-Cards 📖

An interactive flip-book / flashcard style viewer built with Jekyll + client-side JavaScript.

**Live demo**: https://TenKdoToLami.github.io/Flip-Cards/

---

## 🚀 Features

- Data-driven flipbooks via `_data/*.yml` files
- Supports cover page + dual-page spreads
- Sidebar menu to select flipbook sets
- Navigation via page click (left/right)
- Bottom media controls (first / prev / next / last)
- Bookmarkable URLs with hash (`#SetName` or `#SetName-2`)
- Page numbers displayed in the flipcards
- Responsive design: cards scale to viewport
- Dark / book-style UI (customizable via CSS)

---

## 📁 Project Structure

```
.
├── _data/
│     └── za.yml               # Defines one flipbook (title, cover, pages, etc.)
│     └── *.yml                # Add more YAML files for new flipbook sets.
│
├── _includes/
│     └── sidebar.html         # Template for sidebar navigation, auto-builds menu
│                              # from `_data` titles.
│
├── _layouts/
│     └── default.html         # Base HTML layout loaded by Jekyll pages.
│
├── assets/
│     ├── css/
│     │   └── style.css        # All styling for layout, sidebar, and flipcards.
│     │
│     ├── js/
│     │   └── flipcards.js     # Handles flipbook logic (navigation, flipping, etc.)
│     │
│     └── images/
│         └── za/              # Folder with images for "za.yml"
│             ├── cover-za.jpg
│             ├── 1.png
│             └── -.png
│         └── */              # Subfolders with images for "*.yml"
│       # Each flipbook set gets its own image subfolder.
│
├── index.md                 # Home page loading the flipcard container.
├── README.md
└── LICENSE (optional)

```

- Each `.yml` in `_data/` defines one flipbook set, with `title`, `cover`, and page entries.
- Images for a set go in `assets/images/<setname>/`.
- `sidebar.html` builds the menu using the titles from `_data/*.yml`.

---

## 🛠 Usage & Setup

### Local Development

```bash
jekyll serve
Visit http://localhost:4000 to try locally.

Make sure your images and YAML files are correctly linked.

Publishing to GitHub Pages
Push to main (or whichever branch you’ve configured).

Your site will be available at https://<username>.github.io/Flip-Cards/.

All internal paths and hash links are relative and should work out-of-the-box.

✍️ YAML Data Format
Example za.yml:

yaml
Copy code
title: Za introduction
cover: cover.png
pages:
  - left:
      image: 1.png
      text: |
        This is text over the image.
    right:
      text: |
        This is just text
  - left:
      image: 1.png
    right:
      text: |
        This is Za.

  # … more pages
Use the | block style to preserve line breaks.

You can omit quotes for simple file names.

You can leave out left.image or right.image if a side has only text. Or you can put both image and text on one page, then it overlaps the taxt over the image.

🎯 Customization Tips
Styling: edit style.css — fonts, colors, spacing.

Navigation behavior: tweak flipcards.js to change how clicks/keys work.

Responsive cards: adjust CSS width, aspect-ratio, etc.

Hash syntax: you could change the hash-format logic if desired (e.g. use ? or query params instead).

