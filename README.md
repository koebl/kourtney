# Kourtney Koebel Academic Website

A modern React-based academic website that replaces the previous Jekyll site. This site is much easier to run locally and maintain.

## Features

- **Modern React Stack**: Built with React 18, Vite, and React Router
- **Consolidated Data**: All publications, media, and course data stored in single YAML files
- **Easy to Update**: Simply edit YAML files to add new content - no need to create new files
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast Development**: Hot module replacement for instant updates during development

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd kourtney
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Development

### Project Structure

```
kourtney/
├── data/                 # YAML data files
│   ├── publications.yaml # All publications
│   ├── media.yaml       # Media appearances
│   ├── courses.yaml     # Teaching information
│   └── profile.yaml     # Profile and site configuration
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── styles/         # SCSS styles
│   └── main.jsx        # Entry point
├── public/
│   └── assets/         # Images and documents
└── index.html          # HTML template
```

### Adding Content

#### Adding a Publication

Edit `data/publications.yaml` and add a new entry:

```yaml
- shortname: "unique_id"
  title: "Paper Title"
  type: "Journal Article"  # or "Working Paper", "Book Chapter", "Other Publication"
  field: "Research Field"
  date: "2024-01-01"
  coauthors:
    - name: "LastName"
  journal: "Journal Name"
  issue: "1(1)"
  pages: "1-10"
  doi: "10.1234/example"
  document: "/assets/documents/paper.pdf"  # optional
  abstract: "Abstract text"  # optional
  links:  # optional
    - title: "Link Text"
      url: "https://example.com"
```

#### Adding Media Coverage

Edit `data/media.yaml`:

```yaml
- title: "Article Title"
  authors: "with Co-author"  # or "by Journalist Name"
  medium: "Media Coverage"  # or "Opinion Editorials and Other Commentary"
  date: "2024-01-01"
  publication: "Publication Name"
  link: "https://example.com"
```

#### Adding a Course

Edit `data/courses.yaml`:

```yaml
- title: "Course Name"
  type: "Teaching Assistant (Graduate)"  # Check existing types in file
  institution: "Department, University"
  date: "2024-01-01"
  year: 2024
  evaluations: "https://link-to-evaluations.com"  # optional
```

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized static files.

### Deployment

#### GitHub Pages

1. Update `vite.config.js` if deploying to a subdirectory:
```js
base: '/repo-name/',  // Change from '/'
```

2. Deploy:
```bash
npm run deploy
```

#### Static Hosting

The `dist` folder can be deployed to any static hosting service (Netlify, Vercel, etc.).

## Customization

### Styling

- Edit `src/styles/main.scss` for global styles
- CSS variables are defined at the top for easy theming

### Profile Information

Edit `data/profile.yaml` to update:
- Contact information
- Social media links
- Navigation menu
- Degree information

### Images

Replace images in `public/assets/img/`:
- `profile.jpg` - Profile photo
- `headpic/home.jpg` - Home page hero image
- `headpic/research.jpg` - Publications page hero
- `headpic/teaching.jpg` - Teaching page hero
- `headpic/media.jpg` - Media page hero

## Migrating from Jekyll

This site replaces the previous Jekyll-based site with several improvements:

1. **No Ruby Required**: Uses Node.js instead of Ruby
2. **Consolidated Data**: All publications in one file instead of separate markdown files
3. **Easier PRs**: Contributors only need to edit YAML files, not create new files
4. **Better Performance**: Modern build tools and optimizations
5. **Simpler Deployment**: Standard static site deployment

## Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite will automatically try the next available port.

### YAML Syntax Errors

Make sure your YAML is valid. Common issues:
- Use proper indentation (2 spaces)
- Quote strings containing special characters
- Escape quotes within strings

### Build Errors

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Make sure you're using Node.js 16+:
```bash
node --version
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Edit the appropriate YAML file in `data/`
4. Test locally with `npm run dev`
5. Submit a pull request

No need to create new files or understand the codebase - just edit the YAML!