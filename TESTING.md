# Testing the Extension

## How to Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by clicking the toggle in the top-right corner
3. Click "Load unpacked"
4. Navigate to and select the `fshorts` directory
5. The extension should now be loaded and active

## Testing Instructions

### Test 1: Channel Pages
1. Navigate to any YouTube channel (e.g., https://www.youtube.com/@YouTube)
2. Verify that:
   - The "Shorts" tab is hidden
   - Any Shorts shelf/section is hidden
   - The console shows: "fshorts: Channel home script loaded"

### Test 2: Search Results
1. Search for something on YouTube (e.g., https://www.youtube.com/results?search_query=test)
2. Verify that:
   - Shorts shelves in search results are hidden
   - Individual Shorts marked with "Short" badge are hidden
   - The console shows: "fshorts: Results script loaded"

### Test 3: Watch Pages
1. Watch any video (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
2. Verify that:
   - Shorts in the sidebar recommendations are hidden
   - Shorts shelves are hidden
   - The console shows: "fshorts: Watch script loaded"

## Checking the Console

To see the console logs:
1. Right-click on the page and select "Inspect"
2. Click on the "Console" tab
3. You should see log messages from the fshorts extension

## Debugging

If the extension doesn't work:
1. Check that the extension is enabled in `chrome://extensions/`
2. Verify the content scripts are running by checking the console
3. Try refreshing the YouTube page
4. Check for any errors in the extension's console

## Expected Behavior

The extension should:
- Run automatically on YouTube pages
- Hide Shorts without manual intervention
- Continue to work as you navigate between pages (YouTube is a single-page app)
- Not interfere with normal video playback or browsing
