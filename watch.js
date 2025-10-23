// Content script for YouTube watch page
// Removes YouTube Shorts suggestions from watch page

(function() {
  'use strict';

  // Function to hide shorts in watch page
  function hideShortsInWatch() {
    // Hide shorts shelf in the sidebar/recommendations
    const shortsShelves = document.querySelectorAll('ytd-reel-shelf-renderer');
    shortsShelves.forEach(shelf => {
      if (shelf && !shelf.hasAttribute('data-fshorts-hidden')) {
        shelf.style.display = 'none';
        shelf.setAttribute('data-fshorts-hidden', 'true');
      }
    });

    // Hide individual shorts in recommendations
    const compactVideoRenderers = document.querySelectorAll('ytd-compact-video-renderer');
    compactVideoRenderers.forEach(renderer => {
      const thumbnailOverlays = renderer.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer');
      thumbnailOverlays.forEach(overlay => {
        if (overlay.textContent.includes('SHORTS') || overlay.classList.contains('shorts')) {
          if (!renderer.hasAttribute('data-fshorts-hidden')) {
            renderer.style.display = 'none';
            renderer.setAttribute('data-fshorts-hidden', 'true');
          }
        }
      });
    });
  }

  // Run on page load
  hideShortsInWatch();

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    hideShortsInWatch();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('fshorts: Watch script loaded');
})();
