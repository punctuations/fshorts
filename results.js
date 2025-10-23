// Content script for YouTube search results page
// Removes YouTube Shorts from search results

(function() {
  'use strict';

  // Function to hide shorts in search results
  function hideShortsInResults() {
    // Hide shorts shelf in search results
    const shortsShelves = document.querySelectorAll('ytd-reel-shelf-renderer');
    shortsShelves.forEach(shelf => {
      if (shelf && !shelf.hasAttribute('data-fshorts-hidden')) {
        shelf.style.display = 'none';
        shelf.setAttribute('data-fshorts-hidden', 'true');
      }
    });

    // Hide individual short video results
    const videoRenderers = document.querySelectorAll('ytd-video-renderer');
    videoRenderers.forEach(renderer => {
      const badges = renderer.querySelectorAll('ytd-badge-supported-renderer');
      badges.forEach(badge => {
        if (badge.textContent.includes('Short') || badge.textContent.includes('Shorts')) {
          if (!renderer.hasAttribute('data-fshorts-hidden')) {
            renderer.style.display = 'none';
            renderer.setAttribute('data-fshorts-hidden', 'true');
          }
        }
      });
    });
  }

  // Run on page load
  hideShortsInResults();

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    hideShortsInResults();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('fshorts: Results script loaded');
})();
