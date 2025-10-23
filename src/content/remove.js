// Robust Shorts blocker for YouTube SPA
// - Works across Home, Watch, and Results pages
// - Handles SPA navigation and dynamic content via MutationObserver

const HIDE_CLASS = "fshorts-blocked";
let applyScheduled = false;

function hideElement(el) {
  try {
    el.style.display = "none";
  } catch (_) {
    // ignore
  }
}

function applyBlock() {
  applyScheduled = false;

  // 1) Sidebar Shorts entry
  document.querySelectorAll('a[title="Shorts"]').forEach(hideElement);

  // 2) Home feed Shorts shelves and items
  document
    .querySelectorAll(
      [
        "ytd-reel-shelf-renderer",
        "ytd-reel-video-renderer",
        'a[href^="/shorts"]',
      ].join(",")
    )
    .forEach((el) => {
      if (el.tagName === "A") {
        const container =
          el.closest(
            [
              "ytd-rich-item-renderer",
              "ytd-grid-video-renderer",
              "ytd-compact-video-renderer",
              "ytd-video-renderer",
              "ytd-reel-shelf-renderer",
            ].join(",")
          ) || el;
        hideElement(container);
      } else {
        hideElement(el);
      }
    });
}

function scheduleApply() {
  if (applyScheduled) return;
  applyScheduled = true;
  // Debounce bursts of mutations
  setTimeout(applyBlock, 100);
}

function startObserver() {
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length) {
        scheduleApply();
        break;
      }
    }
  });
  obs.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });
}

// Initial run
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    applyBlock();
    startObserver();
  });
} else {
  applyBlock();
  startObserver();
}
