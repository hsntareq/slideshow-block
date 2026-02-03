# Slideshow Block

A powerful WordPress Gutenberg block for displaying remote website posts in an interactive Swiper slider. Fetch posts from any website with REST API access and display them with full customization options for layout, navigation, and animation.

## Features

### Remote Content Integration

- **Fetch Posts from Any Website**: Display posts from external WordPress sites via REST API
- **Remote Display Support**: Works with any site that allows REST API access (requires proper CORS configuration)
- **Automatic Media Processing**: Fetches and displays featured images and author information

### Slider Controls

- **Configurable Slide Items**: Control how many items display per slide (responsive)
- **Slide Speed**: Customize transition speed and smoothness (in milliseconds)
- **Autoplay**: Enable/disable automatic slide rotation with adjustable delay
- **Mouse Wheel Support**: Enable/disable mouse wheel navigation
- **Responsive Design**: Automatically adapts to different screen sizes

### Navigation & Display Options

- **Navigation Controls**: Toggle previous/next arrow buttons
- **Pagination Dots**: Show or hide slide indicators
- **Auto-loop**: Enable continuous looping between slides
- **Touch & Keyboard Support**: Full accessibility and touch device support

### Content Display Customization

- **Show/Hide Thumbnails**: Toggle featured image display
- **Show/Hide Post Titles**: Control title visibility
- **Show/Hide Post Meta**: Display or hide author and date information
- **Show/Hide Post Content**: Toggle post excerpt/content display

### Performance & Compatibility

- **Swiper Integration**: Built on Swiper library for smooth, performant slider functionality
- **Modern Block Architecture**: Fully compatible with WordPress 6.1+ and modern PHP 7.0+
- **Block Editor Native**: Seamless integration with WordPress Gutenberg editor

## Installation

1. Download and upload the plugin to your WordPress plugins directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The "Slideshow Block" block will appear in your Gutenberg block library

## Usage

1. **Add the Block**: In any post or page, click the plus button and search for "Slideshow Block"
2. **Enter API URL**: In the block settings panel, enter the WordPress REST API endpoint of the remote website (e.g., `https://example.com/`)
3. **Click Fetch**: Click the "Fetch" button to load posts from the remote site
4. **Customize Settings**: Use the Inspector Controls to customize:
   - Number of slides to display
   - Autoplay settings and speed
   - Navigation and pagination options
   - Content visibility preferences
5. **Publish**: Publish your post/page to display the slider on the frontend

## Requirements

- WordPress 6.1 or higher
- PHP 7.0 or higher
- Remote website must have REST API enabled
- CORS must be configured to allow requests (or use same-origin sites)

## Troubleshooting

### CORS Errors

If you encounter CORS (Cross-Origin Resource Sharing) errors, the remote site may have restricted API access. Contact the site administrator to enable cross-origin requests.

### API Not Accessible

Ensure the remote website:

- Has REST API enabled
- Allows unauthenticated access to posts (or you have authentication)
- Is properly configured to accept requests from your domain

## License

This plugin is released under the GPL-2.0-or-later License. See the LICENSE file for details.

## Support

For issues or questions, please contact the plugin developers.
