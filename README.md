# Patrick Young's Blog

A minimalist ocean-themed blog system built with PHP and Markdown. Features a mystical water aesthetic with mathematical ASCII wave visualizations.

## Features

- **Simple Markdown Blogging**: Just drop `.md` files in the `posts/` directory
- **YAML Front Matter**: Support for metadata in your posts
- **Ocean Theme**: Serene water-inspired design with golden ratio proportions
- **ASCII Wave Visualization**: Mathematically generated 3D ocean waves on homepage
- **Performance Optimized**: Lightweight with minimal dependencies
- **Mobile Responsive**: Elegant on all devices
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
tags: [technology, consciousness, ocean]
---

Your markdown content goes here...
```

3. The post will automatically appear on the homepage at `/posts/your-filename`

### Front Matter Options

- `title` (required): The title of your post
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (optional): Brief description for SEO and post previews
- `tags` (optional): Array of tags for categorization
- `theme` (optional): Custom theme name (defaults to ocean theme)

## Theme Design

The ocean theme uses a carefully selected color palette:
- **Soft Custard** (#FCF9F1): Primary background
- **Icy Sky** (#E3F1FF): Accent highlights
- **Sunlit Ripples** (#EFF6FB): Secondary backgrounds
- **Abyssal Drift** (#23587F): Primary text and borders

Typography follows golden ratio proportions for harmonious spacing.

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
├── theme.css          # Ocean theme styles
├── theme.js           # Wave animations
└── composer.json      # PHP dependencies
```

## ASCII Ocean Visualization

The homepage features a mathematically generated 3D ASCII ocean using:
- Multiple sine waves with golden ratio frequencies
- Fibonacci-inspired wave interference patterns
- Perspective projection for depth
- Sacred geometry symbols at cardinal points

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

## Performance

- Posts are cached for 1 hour automatically
- Minimal external dependencies
- System fonts for faster loading
- Optimized ASCII animation at 15fps

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

*Drifting through digital tides*