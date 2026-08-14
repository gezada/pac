import React from "react";
import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import "./styles.css";

const ease = [0.22, 1, 0.36, 1];

function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? "logo--compact" : ""}`} aria-label="PAC — Passa a Call">
      <div className="logo-mark" aria-hidden="true"><span /><span /><span /></div>
      <div className="logo-copy"><strong>PAC</strong>{!compact && <small>PASSA A CALL</small>}</div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.75, delay, ease }}>
      {children}
    </motion.div>
  );
}

function Pill({ children }) { return <span className="pill">{children}</span>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function HeroCard() {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  function handleMove(event) { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left) / rect.width - 0.5); y.set((event.clientY - rect.top) / rect.height - 0.5); }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.div className="hero-stage" onMouseMove={handleMove} onMouseLeave={reset} style={{ rotateX, rotateY, transformPerspective: 1100 }} initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.35, ease }}>
      <div className="stage-glow" aria-hidden="true" />
      <div className="call-card">
        <div className="call-card__topline"><div className="live-badge"><i /> AO VIVO</div><span>CALL #084</span></div>
        <div className="call-card__headline"><p>COMMUNITY MATCH</p><h3>DOUBLE TROUBLE</h3><span>A comunidade entra. O streamer acompanha.</span></div>
        <div className="signal-chart" aria-hidden="true">
          <svg viewBox="0 0 520 120" preserveAspectRatio="none">
            <defs><linearGradient id="line" x1="0" x2="1"><stop offset="0" stopColor="#5CFF8D" /><stop offset=".55" stopColor="#1CD8FF" /><stop offset="1" stopColor="#B52CFF" /></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1CD8FF" stopOpacity=".24" /><stop offset="1" stopColor="#1CD8FF" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 98 C42 90 58 54 95 68 S152 106 186 80 S235 34 274 48 S324 103 360 72 S414 22 451 40 S488 64 520 26 L520 120 L0 120 Z" fill="url(#area)" />
            <path d="M0 98 C42 90 58 54 95 68 S152 106 186 80 S235 34 274 48 S324 103 360 72 S414 22 451 40 S488 64 520 26" fill="none" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="call-stats"><div><small>COMUNIDADE</small><strong>R$ 42.780</strong></div><div><small>CREATOR MATCH</small><strong>+ R$ 20.000</strong></div><div><small>PARTICIPANTES</small><strong>1.284</strong></div></div>
        <div className="call-entry"><button type="button"><span>ENTRAR COM</span><strong>R$ 10</strong></button><button type="button" className="ghost-entry"><span>OU</span><strong>10.000 COINS</strong></button></div>
      </div>
      <motion.div className="floating-chip floating-chip--one" animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}><span>SETTLEMENT</span><strong>REAL-TIME</strong></motion.div>
      <motion.div className="floating-chip floating-chip--two" animate={{ y: [0, 8, 0], rotate: [2, -1, 2] }} transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut" }}><span>REWARD ENGINE</span><strong>ON</strong></motion.div>
    </motion.div>
  );
}

const callTypes = [
  { number: "01", title: "COMMUNITY CALL", copy: "A comunidade monta a banca. O streamer conduz a sessão ao vivo.", meta: ["Banca coletiva", "Distribuição configurável"] },
  { number: "02", title: "MATCH CALL", copy: "O streamer acompanha a comunidade com um valor fixo ou percentual.", meta: ["Match flexível", "Participa ou bonifica"] },
  { number: "03", title: "BOOSTED CALL", copy: "Streamer ou parceiro adiciona proteção, prêmio ou upside extra à call.", meta: ["Risco configurável", "Patrocínio nativo"] },
  { number: "04", title: "WINNER MODE", copy: "Um vencedor, vários vencedores ou prêmio concentrado com principal de volta.", meta: ["1 → N vencedores", "Rules engine"] }
];

function DashboardMock() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-sidebar"><Logo compact /><div className="sidebar-dot active" /><div className="sidebar-dot" /><div className="sidebar-dot" /><div className="sidebar-dot" /></div>
      <div className="dashboard-main">
        <div className="dashboard-header"><div><span>CRIAR EVENTO</span><strong>NOVA CALL</strong></div><button type="button">SALVAR DRAFT</button></div>
        <div className="dashboard-grid">
          <div className="dashboard-form">
            <label>TIPO DE CALL</label><div className="select-box">Match Call <span>⌄</span></div>
            <div className="form-row"><div><label>META DA COMUNIDADE</label><div className="input-box">R$ 50.000</div></div><div><label>APORTE CREATOR</label><div className="input-box">40%</div></div></div>
            <label>DISTRIBUIÇÃO</label><div className="option-list"><div className="option active"><i /> Proporcional ao aporte</div><div className="option"><i /> 1 vencedor — prêmio total</div><div className="option"><i /> X vencedores</div></div>
          </div>
          <div className="dashboard-preview"><span>PREVIEW</span><div className="preview-card"><div className="preview-ring"><b>68%</b><small>FUNDING</small></div><strong>R$ 34.290</strong><small>DE R$ 50.000</small></div><button type="button">INICIAR CALL</button></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="site">
      <div className="noise" aria-hidden="true" /><div className="ambient ambient--a" aria-hidden="true" /><div className="ambient ambient--b" aria-hidden="true" />
      <nav className="nav wrap"><Logo /><div className="nav-links"><a href="#produto">PRODUTO</a><a href="#engine">CALL ENGINE</a><a href="#controle">CONTROLE</a></div><a className="nav-cta" href="#final">PRÓXIMA CALL <ArrowIcon /></a></nav>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}><i /> INFRAESTRUTURA PARA LIVE COMUNITÁRIA</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12, ease }}>A LIVE NÃO PRECISA<br /><span>TERMINAR NA TELA.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease }}>PAC transforma audiência em participação. O streamer cria a call, a comunidade entra, o jogo acontece ao vivo e o sistema organiza regras, saldo, distribuição e recompensa.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32, ease }}><a className="primary-btn" href="#produto">VER COMO FUNCIONA <ArrowIcon /></a><span className="microcopy">PASSA A CALL · BUILT FOR LIVE</span></motion.div>
          </div>
          <HeroCard />
        </section>

        <section className="marquee" aria-label="Conceitos do PAC"><div className="marquee-track">{["PARTICIPATION", "REAL-TIME", "REWARDS", "COMMUNITY", "CREATOR CONTROL", "PARTICIPATION", "REAL-TIME", "REWARDS", "COMMUNITY", "CREATOR CONTROL"].map((item, idx) => <span key={`${item}-${idx}`}>{item}<i>✦</i></span>)}</div></section>

        <section id="produto" className="section wrap manifesto">
          <Reveal className="section-kicker">01 / THE SHIFT</Reveal><Reveal delay={0.08}><h2>DE VIEWER<br /><span>PARA PLAYER.</span></h2></Reveal>
          <Reveal className="manifesto-copy" delay={0.14}><p>Não é sobre colocar mais uma feature na live.</p><p>É criar uma camada onde <strong>assistir, participar, ganhar, voltar e gastar dentro do ecossistema</strong> fazem parte da mesma experiência.</p></Reveal>
          <div className="flow-grid">{[["01", "ENTRAR", "PIX, saldo ou moeda do ecossistema. A regra é clara antes da call começar."],["02", "JOGAR JUNTO", "O streamer conduz a sessão ao vivo enquanto a comunidade acompanha com skin in the game."],["03", "LIQUIDAR", "A regra congela no start. O sistema calcula resultado, fee e distribuição."],["04", "VOLTAR", "Saldo, rewards e progressão alimentam a próxima sessão — sem recomeçar do zero."]].map(([n,t,c], idx) => <Reveal className="flow-card" delay={idx * 0.05} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
        </section>

        <section className="statement-section"><div className="wrap statement-inner"><Reveal className="statement-label">THE BUSINESS LAYER</Reveal><Reveal delay={0.1}><p className="statement">NÃO É SÓ SOBRE TRAZER MAIS GENTE.<br />É SOBRE FAZER <em>CADA VIEWER VALER MAIS</em><br />DENTRO DO ECOSSISTEMA.</p></Reveal><Reveal className="statement-foot" delay={0.18}><span>RETENÇÃO</span><i /><span>FREQUÊNCIA</span><i /><span>TICKET MÉDIO</span><i /><span>FIRST-PARTY DATA</span></Reveal></div></section>

        <section id="engine" className="section wrap engine-section">
          <Reveal className="section-kicker">02 / CALL ENGINE</Reveal>
          <div className="section-headline-row"><Reveal><h2>UM MOTOR.<br /><span>MUITAS CALLS.</span></h2></Reveal><Reveal className="section-aside" delay={0.08}>Templates controlam a complexidade. O streamer ganha liberdade sem transformar cada live em uma planilha impossível de operar.</Reveal></div>
          <div className="call-type-grid">{callTypes.map((call, idx) => <Reveal className="call-type" delay={idx * 0.06} key={call.title}><div className="call-type__num">{call.number}</div><div className="call-type__body"><h3>{call.title}</h3><p>{call.copy}</p><div className="call-type__meta">{call.meta.map((m) => <Pill key={m}>{m}</Pill>)}</div></div><div className="call-type__arrow"><ArrowIcon /></div></Reveal>)}</div>
        </section>

        <section id="controle" className="section wrap control-section">
          <div className="control-copy"><Reveal className="section-kicker">03 / CREATOR CONTROL</Reveal><Reveal delay={0.06}><h2>SEM DEV.<br /><span>SEM ATRITO.</span></h2></Reveal><Reveal delay={0.12}><p>O streamer cria, agenda e controla a experiência sozinho: entrada, meta, aporte, winners, proteção, duração, distribuição e regras.</p></Reveal><Reveal className="control-points" delay={0.18}><span><i /> Ao vivo ou agendado</span><span><i /> Regras congeladas no start</span><span><i /> Resultado manual ou integrado</span><span><i /> Parceiros e rewards plugáveis</span></Reveal></div>
          <Reveal className="dashboard-wrap" delay={0.08}><DashboardMock /></Reveal>
        </section>

        <section className="section wrap architecture-section">
          <Reveal className="section-kicker">04 / BUILT TO EVOLVE</Reveal><Reveal delay={0.06}><h2>COMEÇA SIMPLES.<br /><span>NASCE GRANDE.</span></h2></Reveal>
          <div className="architecture-grid"><Reveal className="architecture-card architecture-card--wide"><small>CORE</small><h3>ARQUITETURA MODULAR</h3><p>O produto não depende de uma casa, uma API ou uma única mecânica para funcionar. Integrações entram por camada, sem travar o core.</p><div className="module-map"><span>EVENT ENGINE</span><span>WALLET</span><span>REWARDS</span><span>PARTNERS</span><span>ANALYTICS</span><span>MOBILE</span></div></Reveal><Reveal className="architecture-card" delay={0.08}><small>PARTNERS</small><h3>AGNÓSTICO POR DESIGN</h3><p>API, webhook, CSV, link rastreável ou fluxo manual. O PAC continua operando.</p></Reveal><Reveal className="architecture-card" delay={0.12}><small>ROADMAP</small><h3>REAL-TIME → AUTOMATION</h3><p>Começamos com controle humano onde faz sentido e automatizamos conforme integrações e volume justificarem.</p></Reveal></div>
        </section>

        <section id="final" className="final-section"><div className="final-orbit final-orbit--one" aria-hidden="true" /><div className="final-orbit final-orbit--two" aria-hidden="true" /><div className="wrap final-inner"><Reveal><Logo /></Reveal><Reveal delay={0.06}><p className="final-kicker">PASSA A CALL</p></Reveal><Reveal delay={0.1}><h2>A PRÓXIMA CALL<br /><span>COMEÇA AQUI.</span></h2></Reveal><Reveal className="final-copy" delay={0.16}><p>A live deixa de ser só conteúdo.<br />A comunidade deixa de ser só audiência.</p></Reveal><Reveal delay={0.22}><a className="primary-btn primary-btn--large" href="#produto">EXPLORAR O PAC <ArrowIcon /></a></Reveal></div><div className="wrap footer-line"><span>PAC.BET / 2026</span><span>PRODUCT · COMMUNITY · TECHNOLOGY</span><span>ALL SYSTEMS NOMINAL</span></div></section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
