const PRESENTATION_SELECTOR = "main > section:not(.marquee)";
const NAV_KEYS = new Set(["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"]);

function getSlides() {
  return Array.from(document.querySelectorAll(PRESENTATION_SELECTOR));
}

function getCurrentSlideIndex(slides) {
  const probe = window.scrollY + Math.min(window.innerHeight * 0.22, 180);
  let current = 0;

  for (let index = 0; index < slides.length; index += 1) {
    if (slides[index].offsetTop <= probe) current = index;
    else break;
  }

  return current;
}

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function goToSlide(direction) {
  const slides = getSlides();
  if (!slides.length) return;

  const current = getCurrentSlideIndex(slides);
  const next = Math.max(0, Math.min(slides.length - 1, current + direction));

  if (next === current) return;

  slides[next].scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

window.addEventListener("keydown", (event) => {
  if (!NAV_KEYS.has(event.key) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (isInteractiveTarget(event.target)) return;

  event.preventDefault();
  const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
  goToSlide(direction);
}, { passive: false });
