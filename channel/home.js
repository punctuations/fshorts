// Content script for YouTube channel home page
// Removes YouTube Shorts from channel pages

(function() {
  'use strict';

  // Debounce function to limit how often hideShorts runs
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

  // Watch for dynamic content changes with debouncing
  const debouncedHideShorts = debounce(hideShorts, 250);
  const observer = new MutationObserver(debouncedHideShorts);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('fshorts: Channel home script loaded');
})();
