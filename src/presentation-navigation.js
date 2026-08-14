const PRESENTATION_SELECTOR = "main > section:not(.marquee)";
const FORWARD_KEYS = new Set(["ArrowDown", "ArrowRight", "PageDown", " "]);
const BACKWARD_KEYS = new Set(["ArrowUp", "ArrowLeft", "PageUp"]);

let locked = false;
let unlockTimer = null;
let keyboardTargetIndex = null;
let keyboardTargetTimer = null;

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

function holdKeyboardTarget(index) {
  keyboardTargetIndex = index;
  window.clearTimeout(keyboardTargetTimer);
  keyboardTargetTimer = window.setTimeout(() => {
    keyboardTargetIndex = null;
  }, 900);
}

function scrollToSlide(slides, scroller, index) {
  scroller.scrollTo({
    top: slides[index].offsetTop,
    behavior: "smooth",
  });
}

function goToSlide(direction, { keyboard = false } = {}) {
  const scroller = getScroller();
  const slides = getSlides();
  if (!scroller || !slides.length) return;

  const current = keyboard && keyboardTargetIndex !== null
    ? keyboardTargetIndex
    : getCurrentSlideIndex(slides, scroller);
  const next = Math.max(0, Math.min(slides.length - 1, current + direction));
  if (next === current) return;

  if (keyboard) holdKeyboardTarget(next);
  else lockNavigation();

  scrollToSlide(slides, scroller, next);
}

function handleWheel(event) {
  if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) < 5) return;

  event.preventDefault();
  if (locked) return;

  keyboardTargetIndex = null;
  window.clearTimeout(keyboardTargetTimer);
  goToSlide(event.deltaY > 0 ? 1 : -1);
}

function handleKeydown(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (isInteractiveTarget(event.target)) return;

  if (FORWARD_KEYS.has(event.key)) {
    event.preventDefault();
    goToSlide(1, { keyboard: true });
    return;
  }

  if (BACKWARD_KEYS.has(event.key)) {
    event.preventDefault();
    goToSlide(-1, { keyboard: true });
    return;
  }

  const scroller = getScroller();
  const slides = getSlides();
  if (!scroller || !slides.length) return;

  if (event.key === "Home") {
    event.preventDefault();
    holdKeyboardTarget(0);
    scrollToSlide(slides, scroller, 0);
  }

  if (event.key === "End") {
    event.preventDefault();
    holdKeyboardTarget(slides.length - 1);
    scrollToSlide(slides, scroller, slides.length - 1);
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