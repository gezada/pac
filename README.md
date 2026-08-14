# PAC — Passa a Call

Landing page institucional do PAC (`pac.bet`).

## Stack

- React
- Vite
- Motion for React
- CSS próprio com design tokens e composição inspirada em padrões shadcn/ui

A escolha foi intencionalmente leve: Motion cobre microinterações, reveal e tilt sem a sobrecarga de WebGL/Three.js ou de uma timeline GSAP para uma landing desta complexidade.

## Desenvolvimento

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

O `vite.config.js` usa `base: "./"`, portanto o build está preparado tanto para domínio próprio quanto para GitHub Pages.

## Design

- Base escura e limpa.
- Gradiente verde → ciano → violeta como referência cromática inicial.
- Logo atual é um placeholder tipográfico/componente; deve ser substituído quando a identidade final for entregue.
- Mockups de produto são construídos em HTML/CSS, sem imagens externas, para manter a página rápida e autossuficiente.

## Próximos passos

1. Substituir placeholder de marca pelo logo final.
2. Ajustar copy final, se necessário.
3. Inserir contato oficial.
4. Publicar em GitHub Pages ou apontar `pac.bet` para hospedagem estática.
