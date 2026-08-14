const PRESENTATION_SELECTOR = "main > section:not(.marquee)";
const FORWARD_KEYS = new Set(["ArrowDown", "ArrowRight", "PageDown", " "]);
const BACKWARD_KEYS = new Set(["ArrowUp", "ArrowLeft", "PageUp"]);

let locked = false;
let unlockTimer = null;

function getScroller() {
  return document.querySelector("main");
}

function getSlides() {
  return Array.from(document.querySelectorAll(PRESENTATION_SELECTOR)).filter(
    (slide) => getComputedStyle(slide).display !== "none"
  );
}

function getCurrentSlideIndex(slides, scroller) {
  const currentY = scroller.scrollTop;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.offsetTop - currentY);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function lockNavigation(duration = 720) {
  locked = true;
  window.clearTimeout(unlockTimer);
  unlockTimer = window.setTimeout(() => {
    locked = false;
  }, duration);
}

function goToSlide(direction) {
  const scroller = getScroller();
  const slides = getSlides();
  if (!scroller || !slides.length) return;

  const current = getCurrentSlideIndex(slides, scroller);
  const next = Math.max(0, Math.min(slides.length - 1, current + direction));
  if (next === current) return;

  lockNavigation();
  slides[next].scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function handleWheel(event) {
  if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) < 5) return;

  event.preventDefault();
  if (locked) return;

  goToSlide(event.deltaY > 0 ? 1 : -1);
}

function handleKeydown(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (isInteractiveTarget(event.target)) return;

  if (FORWARD_KEYS.has(event.key)) {
    event.preventDefault();
    if (!locked) goToSlide(1);
    return;
  }

  if (BACKWARD_KEYS.has(event.key)) {
    event.preventDefault();
    if (!locked) goToSlide(-1);
    return;
  }

  const scroller = getScroller();
  const slides = getSlides();
  if (!scroller || !slides.length) return;

  if (event.key === "Home") {
    event.preventDefault();
    lockNavigation();
    slides[0].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (event.key === "End") {
    event.preventDefault();
    lockNavigation();
    slides[slides.length - 1].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function initPresentationNavigation() {
  const scroller = getScroller();
  if (!scroller) {
    window.requestAnimationFrame(initPresentationNavigation);
    return;
  }

  scroller.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeydown, { passive: false });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(initPresentationNavigation);
  }, { once: true });
} else {
  window.requestAnimationFrame(initPresentationNavigation);
}
