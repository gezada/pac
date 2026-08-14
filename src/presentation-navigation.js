const PRESENTATION_SELECTOR = "main > section:not(.marquee)";
const FORWARD_KEYS = new Set(["ArrowDown", "ArrowRight", "PageDown", " "]);
const BACKWARD_KEYS = new Set(["ArrowUp", "ArrowLeft", "PageUp"]);
const KEYBOARD_TRANSITION_MS = 170;

let locked = false;
let unlockTimer = null;
let keyboardTargetIndex = null;
let keyboardAnimationFrame = null;

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

function restoreScrollStyles(scroller) {
  scroller.style.removeProperty("scroll-behavior");
  scroller.style.removeProperty("scroll-snap-type");
}

function cancelKeyboardAnimation(scroller) {
  if (keyboardAnimationFrame !== null) {
    window.cancelAnimationFrame(keyboardAnimationFrame);
    keyboardAnimationFrame = null;
  }

  if (scroller) restoreScrollStyles(scroller);
}

function animateKeyboardToSlide(slides, scroller, index) {
  cancelKeyboardAnimation(null);

  const startY = scroller.scrollTop;
  const destinationY = slides[index].offsetTop;
  const startedAt = performance.now();

  scroller.style.setProperty("scroll-behavior", "auto");
  scroller.style.setProperty("scroll-snap-type", "none");

  const tick = (now) => {
    const progress = Math.min(1, (now - startedAt) / KEYBOARD_TRANSITION_MS);
    const eased = 1 - Math.pow(1 - progress, 3);
    scroller.scrollTop = startY + (destinationY - startY) * eased;

    if (progress < 1) {
      keyboardAnimationFrame = window.requestAnimationFrame(tick);
      return;
    }

    scroller.scrollTop = destinationY;
    keyboardAnimationFrame = null;
    keyboardTargetIndex = null;
    restoreScrollStyles(scroller);
  };

  keyboardAnimationFrame = window.requestAnimationFrame(tick);
}

function scrollToSlideSmooth(slides, scroller, index) {
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

  if (keyboard) {
    keyboardTargetIndex = next;
    animateKeyboardToSlide(slides, scroller, next);
    return;
  }

  keyboardTargetIndex = null;
  cancelKeyboardAnimation(scroller);
  lockNavigation();
  scrollToSlideSmooth(slides, scroller, next);
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
    keyboardTargetIndex = 0;
    animateKeyboardToSlide(slides, scroller, 0);
  }

  if (event.key === "End") {
    event.preventDefault();
    keyboardTargetIndex = slides.length - 1;
    animateKeyboardToSlide(slides, scroller, slides.length - 1);
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