// Content script for YouTube watch page
// Removes YouTube Shorts suggestions from watch page

(function() {
  'use strict';

  // Debounce function to limit how often hideShortsInWatch runs
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

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

  // Watch for dynamic content changes with debouncing
  const debouncedHideShortsInWatch = debounce(hideShortsInWatch, 250);
  const observer = new MutationObserver(debouncedHideShortsInWatch);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('fshorts: Watch script loaded');
})();
