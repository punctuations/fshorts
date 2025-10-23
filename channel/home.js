// Content script for YouTube channel home page
// Removes YouTube Shorts from channel pages

(function() {
  'use strict';

  // Function to hide shorts sections
  function hideShorts() {
    // Hide shorts shelf on channel page
    const shortsShelves = document.querySelectorAll('ytd-reel-shelf-renderer');
    shortsShelves.forEach(shelf => {
      if (shelf && !shelf.hasAttribute('data-fshorts-hidden')) {
        shelf.style.display = 'none';
        shelf.setAttribute('data-fshorts-hidden', 'true');
      }
    });

    // Hide shorts tab
    const tabs = document.querySelectorAll('yt-tab-shape[tab-title="Shorts"]');
    tabs.forEach(tab => {
      if (tab && !tab.hasAttribute('data-fshorts-hidden')) {
        tab.style.display = 'none';
        tab.setAttribute('data-fshorts-hidden', 'true');
      }
    });
  }

  // Run on page load
  hideShorts();

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    hideShorts();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('fshorts: Channel home script loaded');
})();
