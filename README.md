# Patrick Young's Blog

A minimalist, cyberpunk-themed blog system built with PHP and Markdown. Features a unified aqua-cosmic theme with smooth animations and excellent performance.

## Features

- **Simple Markdown Blogging**: Just drop `.md` files in the `posts/` directory
- **YAML Front Matter**: Support for metadata in your posts
- **Unified Theme System**: Combines aqua/water, cosmic/space, and cyberpunk aesthetics
- **Performance Optimized**: Built-in caching, lazy loading, and minimal dependencies
- **Mobile Responsive**: Looks great on all devices
- **SEO Friendly**: Clean URLs, meta tags, and semantic HTML

## Quick Start

### Creating a New Post

1. Create a new `.md` file in the `posts/` directory
2. Add YAML front matter at the top:

```yaml
---
title: Your Post Title
date: 2024-01-20
description: A brief description of your post
tags: [technology, future, ai]
---

Your markdown content goes here...
```

3. The post will automatically appear on the homepage at `/posts/your-filename`

### Front Matter Options

- `title` (required): The title of your post
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (optional): Brief description for SEO and post previews
- `tags` (optional): Array of tags for categorization
- `theme` (optional): Custom theme name (defaults to unified theme)

## File Structure

```
├── posts/              # Your markdown blog posts
├── templates/          # PHP template files
│   ├── home.php       # Homepage template
│   ├── post.php       # Individual post template
│   └── 404.php        # 404 error page
├── cache/             # Cached post data
├── vendor/            # Composer dependencies
├── index.php          # Main router
├── theme.css          # Unified theme styles
├── theme.js           # Interactive effects
└── composer.json      # PHP dependencies
```

## Customization

### Theme Colors

Edit CSS variables in `theme.css`:

```css
:root {
  --accent-aqua: #00ffff;
  --accent-pink: #ff00ff;
  --accent-purple: #8000ff;
  --accent-cosmic: #4080ff;
}
```

### Animation Settings

Adjust particle count and animation speed in `theme.js`:

```javascript
this.maxParticles = 50;  // Number of floating particles
this.fps = 60;           // Animation frame rate
```

## Dependencies

- PHP 7.4+
- Composer
- Apache with mod_rewrite (for clean URLs)

## Installation

1. Clone the repository
2. Run `composer install`
3. Ensure Apache mod_rewrite is enabled
4. Point your web server to the project directory
5. Start creating posts!

## Performance Tips

- Posts are cached for 1 hour automatically
- CSS is minified in production
- Images should be optimized before uploading
- Use lazy loading for images in posts

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - Feel free to use and modify as needed.