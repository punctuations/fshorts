# fshorts
F*ck shorts.

A Chrome extension that removes YouTube Shorts from your YouTube experience.

## Features

- Removes Shorts from YouTube channel pages
- Hides Shorts from search results
- Removes Shorts suggestions from watch pages
- Works with Chrome Manifest V3

## Installation

### From Source

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `fshorts` directory

## Files

- `manifest.json` - Chrome extension manifest (Manifest V3)
- `channel/home.js` - Content script for channel pages
- `results.js` - Content script for search results
- `watch.js` - Content script for watch pages
- `icons/` - Extension icons

## How it works

The extension uses content scripts that run on YouTube pages to detect and hide Shorts:
- On channel pages, it hides the Shorts shelf and Shorts tab
- On search results, it removes Shorts from the results
- On watch pages, it filters out Shorts from recommendations

## License

MIT
