function removeTerminalPeriods(root = document.querySelector("main")) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const value = node.nodeValue;
    if (!value || !value.includes(".")) return;

    node.nodeValue = value.replace(/\.(?=\s|$)/g, (match, offset, source) => {
      const previous = source[offset - 1] || "";
      return /\d/.test(previous) ? match : "";
    });
  });
}

function addSlideMetadata(main) {
  const slides = Array.from(main.querySelectorAll(":scope > section:not(.marquee)"));
  const total = slides.length;

  slides.forEach((slide, index) => {
    if (index === 0) return;

    const isLast = index === total - 1;
    const meta = document.createElement("div");
    meta.className = "presentation-slide__meta" + (isLast ? " presentation-slide__meta--footer-only" : "");

    const footer = document.createElement("span");
    footer.className = "presentation-slide__footer";
    footer.textContent = isLast
      ? "PRODUCT PROPOSAL · 2026"
      : "CASS PLATFORMA + PASSA A CALL";

    if (!isLast) {
      const year = document.createElement("span");
      year.className = "presentation-slide__year";
      year.textContent = "2026";
      meta.appendChild(year);
    }

    meta.appendChild(footer);

    if (!isLast) {
      const counter = document.createElement("span");
      counter.className = "presentation-slide__counter";
      counter.setAttribute("aria-label", "Lâmina " + (index + 1) + " de " + total);
      counter.innerHTML = "<strong>" + (index + 1) + "</strong><i>/</i><span>" + total + "</span>";
      meta.appendChild(counter);
    }

    slide.appendChild(meta);
  });
}
function buildOpeningSlides() {
  const main = document.querySelector("main");
  const hero = main?.querySelector(":scope > .hero");

  if (!main || !hero || main.querySelector(".opening-slide")) return false;

  const cover = document.createElement("section");
  cover.className = "opening-slide presentation-slide";
  cover.setAttribute("aria-label", "Capa da proposta comercial");
  cover.innerHTML = `
    <div class="opening-slide__center">cass platform + passa a call</div>
    <div class="opening-slide__footer">PRODUCT PROPOSAL · 2026</div>
  `;

  const impact = document.createElement("section");
  impact.className = "impact-slide presentation-slide";
  impact.setAttribute("aria-label", "A audiência já existe, bora transformar ela em ativo?");
  impact.innerHTML = `
    <div class="impact-slide__inner">
      <h1>
        <span>A AUDIÊNCIA JÁ EXISTE,</span>
        <strong>BORA TRANSFORMAR ELA EM ATIVO?</strong>
      </h1>

      <div class="impact-slide__objectives" aria-label="Principais objetivos">
        <div class="impact-slide__label">PRINCIPAIS OBJETIVOS</div>
        <div class="impact-slide__cards">
          <article class="impact-objective-card">
            <strong>AUMENTAR O<br />TICKET MÉDIO</strong>
          </article>
          <article class="impact-objective-card">
            <strong>SER PROPRIETÁRIO<br />DOS LEADS</strong>
          </article>
        </div>
      </div>
    </div>
  `;

  main.insertBefore(cover, hero);
  main.insertBefore(impact, hero);

  /* The original hero becomes the supporting third slide. Its former headline
     now lives on slide 02, so remove only that duplicate headline while
     preserving every other piece of the commercial narrative below it */
  hero.classList.add("hero-support-slide");
  hero.querySelector(".hero-copy h1")?.remove();

  addSlideMetadata(main);
  removeTerminalPeriods(main);
  return true;
}

if (!buildOpeningSlides()) {
  const observer = new MutationObserver(() => {
    if (buildOpeningSlides()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}
