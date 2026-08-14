import React from "react";
import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import "./styles.css";

const ease = [0.22, 1, 0.36, 1];

const cassFeatures = [
  ["01", "CONTA + PERFIL", "Identidade própria, histórico, opt-ins e uma base que pertence ao ecossistema — não à plataforma de terceiros."],
  ["02", "XP + LEVELS", "Progressão, status, ranking, benefícios e motivos concretos para voltar mais vezes."],
  ["03", "CASSCOIN", "Recompensa econômica com valor dentro do ecossistema, preparada para Store, rewards e PAC."],
  ["04", "STORE", "Banca, produtos, tickets, drops, experiências e qualquer reward que faça sentido para a comunidade."],
  ["05", "MISSIONS", "Daily, streaks, códigos durante a live, drops, tarefas e campanhas que transformam audiência em hábito."],
  ["06", "RAFFLES + PREDICTIONS", "Sorteios e interações leves que já criam participação antes mesmo do PAC entrar no ar."],
  ["07", "PARTNER HUB", "Casas parceiras, campanhas, links, tracking e relatórios — com integrações graduais, sem travar o produto."]
];

const cassJourney = [
  ["01", "VÊ CASS", "Facebook continua sendo o palco e o gatilho de atenção."],
  ["02", "ENTRA", "CTA leva para uma conta própria e uma promessa clara de recompensa."],
  ["03", "GANHA", "O primeiro reward prova valor imediatamente após o cadastro."],
  ["04", "ACUMULA", "XP, level e CassCoin transformam sessões soltas em progressão."],
  ["05", "TROCA", "Store, raffles, benefícios e campanhas dão utilidade ao que foi acumulado."],
  ["06", "VOLTA", "Mais frequência, mais pontos de contato e mais oportunidades de receita."]
];

const cassRoadmap = [
  ["01", "FOUNDATION", "Login, perfil, XP, levels e CassCoin."],
  ["02", "REWARDS", "Store, raffles, drops, tickets e catálogo agnóstico."],
  ["03", "LIVE LAYER", "Códigos, missions, predictions e widgets conectados à live."],
  ["04", "PARTNERS", "Hub de bets, tracking, relatórios e integrações graduais."],
  ["05", "PAC READY", "Saldo, ledger lógico, infraestrutura e pontos de integração."],
  ["06", "MOBILE", "App/PWA, push e uma relação ainda mais direta com a comunidade."]
];

const callTypes = [
  { number: "01", title: "COMMUNITY CALL", copy: "A comunidade entra com a banca econômica. Cass executa/fronta e o resultado segue a estratégia escolhida.", meta: ["banca coletiva", "regra configurável"] },
  { number: "02", title: "MATCH CALL", copy: "Cass adiciona X% ou R$X à banca. Pode participar ou não do lucro — e cria skin in the game instantaneamente.", meta: ["match flexível", "participa ou bonifica"] },
  { number: "03", title: "PROTECTED / BOOSTED", copy: "Cass ou parceiro protege principal, adiciona prêmio ou melhora retorno. Um formato natural para campanhas patrocinadas.", meta: ["proteção", "patrocínio nativo"] },
  { number: "04", title: "WINNER MODE", copy: "Um vencedor, vários vencedores, prêmio concentrado ou principal devolvido aos demais. A distribuição vira estratégia, não gambiarra.", meta: ["1 → N vencedores", "rules engine"] }
];

const callFlow = [
  ["01", "CONFIGURA", "Template, banca, taxa, distribuição, duração e regra."],
  ["02", "PARTICIPA", "Viewer entra com R$ ou CassCoin."],
  ["03", "RESERVA", "Saldo fica reservado na infraestrutura financeira."],
  ["04", "EXECUTA", "Cass conduz a aposta ao vivo."],
  ["05", "RESULTADO", "Manual no começo ou via integração quando disponível."],
  ["06", "SETTLEMENT", "O sistema calcula fee e distribuição."],
  ["07", "SALDO", "Usuário reutiliza, troca ou saca."]
];

const distribution = ["PROPORCIONAL", "IGUALITÁRIA", "1 VENCEDOR LEVA TUDO", "1 VENCEDOR + PRINCIPAL VOLTA", "X VENCEDORES", "RANKING", "PATROCINADA"];

const pacRoadmap = [
  ["01", "DISCOVERY", "Jurídico, PSP/BaaS, fluxo financeiro final e arquitetura."],
  ["02", "WALLET", "Saldo, ledger, reserva, Pix in/out e histórico."],
  ["03", "CALL MVP", "Dashboard, templates, realtime e settlement."],
  ["04", "AUTOMATION", "APIs, CSV, webhooks e reconciliação gradual."],
  ["05", "EXPANSION", "Novas Calls, overlays, analytics e campanhas especiais."],
  ["06", "OPTIONALITY", "Exclusivo do Cass, multi-creator ou tecnologia para Bet."]
];

const assumptions = [
  "Fornecedor financeiro / PSP / BaaS será selecionado durante o desenvolvimento.",
  "Custos externos, taxas, jurídico, compliance, cloud e budget de rewards não estão inclusos no fee.",
  "Integrações com casas começam flexíveis: manual, CSV, API ou webhook conforme disponibilidade.",
  "CassCoin entra como mecânica planejada; fontes sensíveis de emissão serão validadas juridicamente.",
  "PAC pode seguir exclusivo do Cass caso gere vantagem competitiva relevante.",
  "Se fizer sentido escalar, a arquitetura preserva caminho para multi-creator, B2B ou aquisição por uma Bet."
];

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
    <motion.div className={className} initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.72, delay, ease }}>
      {children}
    </motion.div>
  );
}

function Pill({ children }) { return <span className="pill">{children}</span>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Dot() { return <i className="dot" aria-hidden="true" />; }

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
        <div className="call-card__headline"><p>COMMUNITY MATCH</p><h3>DOUBLE TROUBLE</h3><span>A comunidade entra. Cass acompanha.</span></div>
        <div className="signal-chart" aria-hidden="true"><svg viewBox="0 0 520 120" preserveAspectRatio="none"><defs><linearGradient id="line" x1="0" x2="1"><stop offset="0" stopColor="#5CFF8D" /><stop offset=".55" stopColor="#1CD8FF" /><stop offset="1" stopColor="#B52CFF" /></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1CD8FF" stopOpacity=".24" /><stop offset="1" stopColor="#1CD8FF" stopOpacity="0" /></linearGradient></defs><path d="M0 98 C42 90 58 54 95 68 S152 106 186 80 S235 34 274 48 S324 103 360 72 S414 22 451 40 S488 64 520 26 L520 120 L0 120 Z" fill="url(#area)" /><path d="M0 98 C42 90 58 54 95 68 S152 106 186 80 S235 34 274 48 S324 103 360 72 S414 22 451 40 S488 64 520 26" fill="none" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" /></svg></div>
        <div className="call-stats"><div><small>COMUNIDADE</small><strong>R$ 42.780</strong></div><div><small>CASS MATCH</small><strong>+ R$ 20.000</strong></div><div><small>PARTICIPANTES</small><strong>1.284</strong></div></div>
        <div className="call-entry"><button type="button"><span>ENTRAR COM</span><strong>R$ 10</strong></button><button type="button" className="ghost-entry"><span>OU</span><strong>10.000 CC</strong></button></div>
      </div>
      <motion.div className="floating-chip floating-chip--one" animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}><span>SETTLEMENT</span><strong>READY</strong></motion.div>
      <motion.div className="floating-chip floating-chip--two" animate={{ y: [0, 8, 0], rotate: [2, -1, 2] }} transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut" }}><span>REWARD ENGINE</span><strong>ON</strong></motion.div>
    </motion.div>
  );
}

function DashboardMock() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-sidebar"><Logo compact /><div className="sidebar-dot active" /><div className="sidebar-dot" /><div className="sidebar-dot" /><div className="sidebar-dot" /></div>
      <div className="dashboard-main">
        <div className="dashboard-header"><div><span>CRIAR EVENTO</span><strong>NOVA CALL</strong></div><button type="button">SALVAR DRAFT</button></div>
        <div className="dashboard-grid">
          <div className="dashboard-form">
            <label>TIPO DE CALL</label><div className="select-box">Match Call <span>⌄</span></div>
            <div className="form-row"><div><label>META DA COMUNIDADE</label><div className="input-box">R$ 50.000</div></div><div><label>APORTE CASS</label><div className="input-box">40%</div></div></div>
            <label>DISTRIBUIÇÃO</label><div className="option-list"><div className="option active"><i /> Proporcional ao aporte</div><div className="option"><i /> 1 vencedor — prêmio total</div><div className="option"><i /> X vencedores</div></div>
          </div>
          <div className="dashboard-preview"><span>PREVIEW</span><div className="preview-card"><div className="preview-ring"><b>68%</b><small>FUNDING</small></div><strong>R$ 34.290</strong><small>DE R$ 50.000</small></div><button type="button">INICIAR CALL</button></div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ index, kicker, title, accent, description }) {
  return (
    <div className="section-title">
      <Reveal className="section-kicker">{index} / {kicker}</Reveal>
      <Reveal delay={0.05}><h2>{title}<br /><span>{accent}</span></h2></Reveal>
      {description && <Reveal className="section-description" delay={0.1}><p>{description}</p></Reveal>}
    </div>
  );
}

function Roadmap({ items }) {
  return <div className="roadmap-grid">{items.map(([n,t,c], idx) => <Reveal className="roadmap-card" delay={idx * .04} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>;
}

function App() {
  return (
    <div className="site">
      <div className="noise" aria-hidden="true" /><div className="ambient ambient--a" aria-hidden="true" /><div className="ambient ambient--b" aria-hidden="true" />
      <nav className="nav wrap">
        <div className="nav-brand"><Logo /><span className="nav-project">CASS + PAC / PROPOSTA COMERCIAL</span></div>
        <div className="nav-links"><a href="#tese">TESE</a><a href="#cass">CASS PLATFORM</a><a href="#pac">PAC</a><a href="#investimento">INVESTIMENTO</a></div>
        <a className="nav-cta" href="#proximos">NEXT <ArrowIcon /></a>
      </nav>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}><i /> CASS + PAC · PRODUCT / COMMUNITY / REVENUE</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12, ease }}>A AUDIÊNCIA<br />JÁ EXISTE.<br /><span>AGORA ELA VIRA ATIVO.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease }}>A casa digital do Cass + o motor de participação ao vivo. Uma infraestrutura proprietária para transformar atenção em cadastro, hábito, recompensa, first-party data e ticket médio maior.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32, ease }}><a className="primary-btn" href="#tese">VER A TESE <ArrowIcon /></a><span className="microcopy">PROPOSTA COMERCIAL · 2026</span></motion.div>
          </div>
          <HeroCard />
        </section>

        <section className="marquee" aria-label="Objetivos"><div className="marquee-track">{["FIRST-PARTY DATA", "REWARDS", "RETENÇÃO", "TICKET MÉDIO", "PARTICIPAÇÃO", "PARCEIROS", "FIRST-PARTY DATA", "REWARDS", "RETENÇÃO", "TICKET MÉDIO", "PARTICIPAÇÃO", "PARCEIROS"].map((item, idx) => <span key={`${item}-${idx}`}>{item}<i>✦</i></span>)}</div></section>

        <section id="tese" className="section wrap opportunity-section">
          <SectionTitle index="01" kicker="OPORTUNIDADE" title="O PROBLEMA NÃO É FALTA DE PÚBLICO." accent="É VALOR DEIXADO NA MESA." description="Cass já tem atenção, frequência e confiança. O próximo passo é capturar melhor o valor da audiência que já existe." />
          <div className="triple-grid">
            <Reveal className="big-card"><small>BASE ATUAL</small><h3>O SHOW ACONTECE FORA DE CASA.</h3><p>Facebook concentra a live. WhatsApp concentra parte da comunidade. O relacionamento ainda depende de plataformas que o Cass não controla.</p></Reveal>
            <Reveal className="big-card" delay={.06}><small>OBJETIVO</small><h3>FAZER CADA VIEWER VALER MAIS.</h3><p>Aumentar ticket médio, recorrência e volume nas casas parceiras — sem depender de crescimento de audiência para crescer receita.</p></Reveal>
            <Reveal className="big-card big-card--accent" delay={.12}><small>MOVIMENTO</small><h3>CRIAR UMA CASA PRÓPRIA.</h3><p>Conta, rewards, CassCoin, CRM, dados, parceiros e, depois, PAC. Um ativo proprietário construído em cima da comunidade existente.</p></Reveal>
          </div>
        </section>

        <section className="statement-section vision-statement"><div className="wrap statement-inner"><Reveal className="statement-label">THE SHIFT</Reveal><Reveal delay={0.08}><p className="statement">FACEBOOK CONTINUA SENDO <em>O PALCO.</em><br />O ATIVO PASSA A SER <em>A CASA PRÓPRIA.</em></p></Reveal></div></section>

        <section className="section wrap vision-section">
          <SectionTitle index="02" kicker="VISÃO" title="UM ECOSSISTEMA." accent="QUATRO CAMADAS." />
          <div className="ecosystem-flow">
            {[["FACEBOOK LIVE", "Show, alcance, urgência e aquisição."],["CASS PLATFORM", "Conta, rewards, hábito e first-party data."],["PARCEIROS", "Campanhas, tracking e receita."],["PAC", "Participação econômica ao vivo."]].map(([t,c], idx) => <React.Fragment key={t}><Reveal className="ecosystem-card" delay={idx*.05}><span>{String(idx+1).padStart(2,"0")}</span><h3>{t}</h3><p>{c}</p></Reveal>{idx<3 && <div className="flow-arrow" aria-hidden="true">→</div>}</React.Fragment>)}
          </div>
          <Reveal className="vision-note" delay={.2}><strong>WhatsApp continua.</strong><p>Ele segue como funil e comunidade. A diferença é que deixa de ser o único ativo: cada pessoa pode virar conta, histórico, saldo e relacionamento próprio.</p></Reveal>
        </section>

        <section className="section wrap benchmark-section">
          <SectionTitle index="03" kicker="BENCHMARK" title="ROSHSTEIN NÃO É REFERÊNCIA DE LAYOUT." accent="É PROVA DE CATEGORIA." />
          <div className="triple-grid benchmark-grid">
            <Reveal className="big-card"><small>COPIAR A LÓGICA</small><h3>PROGRESSÃO QUE FAZ VOLTAR.</h3><p>Rewards, missions, store, loops de retorno, progressão e uma comunidade permanentemente conectada à live.</p></Reveal>
            <Reveal className="big-card" delay={.06}><small>ADAPTAR AO BRASIL</small><h3>PIX. WHATSAPP. FACEBOOK. CASAS LOCAIS.</h3><p>Uma linguagem nativa para o público do Cass e uma economia própria que faça sentido para esse contexto.</p></Reveal>
            <Reveal className="big-card big-card--accent" delay={.12}><small>INVENTAR O DIFERENCIAL</small><h3>O PAC.</h3><p>Viewers participando economicamente das Calls do Cass, com regras, dashboard, saldo e settlement próprios.</p></Reveal>
          </div>
        </section>

        <section id="cass" className="product-divider product-divider--cass"><div className="wrap product-divider-inner"><Reveal className="product-number">PRODUTO 01</Reveal><Reveal delay={.06}><h2>CASS<br /><span>PLATFORM</span></h2></Reveal><Reveal className="product-divider-copy" delay={.12}><p>Não é “um site do streamer”.</p><strong>É o lugar onde o público cria conta porque existe vantagem real.</strong></Reveal></div></section>

        <section className="section wrap foundation-section">
          <SectionTitle index="04" kicker="FOUNDATION" title="CADASTRAR PRECISA" accent="VALER A PENA." description="O primeiro release já precisa provar utilidade: ganhar, evoluir, trocar, participar e voltar." />
          <div className="feature-grid">{cassFeatures.map(([n,t,c], idx) => <Reveal className={`feature-card ${idx===2 ? "feature-card--featured" : ""}`} delay={idx*.035} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
        </section>

        <section className="section wrap journey-section">
          <SectionTitle index="05" kicker="JORNADA" title="DA LIVE PARA A CONTA." accent="DA CONTA PARA O HÁBITO." description="Antes de pedir mais valor econômico, o produto cria motivo para cadastro, retorno e permanência." />
          <div className="journey-line">{cassJourney.map(([n,t,c],idx) => <Reveal className="journey-step" delay={idx*.04} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
          <Reveal className="journey-punch" delay={.2}><p>COM CONTA + SALDO + HISTÓRICO + RECOMPENSA,</p><strong>O PAC ENTRA COMO EVOLUÇÃO NATURAL — NÃO COMO UMA APOSTA SOLTA.</strong></Reveal>
        </section>

        <section className="section wrap economy-section">
          <SectionTitle index="06" kicker="ECONOMIA" title="RECOMPENSA PRECISA" accent="TER VALOR PERCEBIDO." />
          <div className="economy-grid">
            <Reveal className="economy-card"><small>XP</small><h3>STATUS, NÃO DINHEIRO.</h3><p>Level, ranking, progressão e desbloqueios. XP mantém a gamificação limpa e cria status dentro da comunidade.</p><div className="economy-meter"><span style={{width:"72%"}} /></div></Reveal>
            <Reveal className="economy-card economy-card--coin" delay={.06}><small>CASSCOIN</small><h3>RECOMPENSA ECONÔMICA.</h3><p>Referência inicial: <strong>1.000 CC = R$1.</strong> Pode ser usada em Store, rewards e, depois, nas próprias Calls.</p><div className="coin-convert"><span>10.000 CC</span><i>→</i><strong>R$ 10</strong></div></Reveal>
            <Reveal className="economy-card" delay={.12}><small>REWARDS</small><h3>CATÁLOGO AGNÓSTICO.</h3><p>Banca, free spins, produto físico, ticket, experiência, drop ou qualquer benefício financiado pelo ecossistema e parceiros.</p><div className="reward-tags"><Pill>BANCA</Pill><Pill>FREE SPINS</Pill><Pill>MERCH</Pill><Pill>EXPERIÊNCIAS</Pill></div></Reveal>
          </div>
          <Reveal className="legal-note" delay={.18}><Dot /><p>Fontes sensíveis de CassCoin são validadas durante o desenvolvimento. Se uma mecânica não passar no jurídico, pivotamos a emissão sem quebrar o produto.</p></Reveal>
        </section>

        <section className="section wrap roadmap-section">
          <SectionTitle index="07" kicker="ROADMAP CASS" title="ENTREGAS PROGRESSIVAS." accent="ARQUITETURA COMPLETA DESDE O DIA 1." />
          <Roadmap items={cassRoadmap} />
        </section>

        <section id="pac" className="product-divider"><div className="wrap product-divider-inner"><Reveal className="product-number">PRODUTO 02 · BIG UPDATE</Reveal><Reveal delay={.06}><h2>PASSA<br /><span>A CALL</span></h2></Reveal><Reveal className="product-divider-copy" delay={.12}><p>O momento em que o viewer deixa de torcer de fora.</p><strong>E ENTRA NO JOGO JUNTO COM O CASS.</strong></Reveal></div></section>

        <section className="section wrap pac-intro-section">
          <div className="pac-intro-copy">
            <Reveal className="section-kicker">08 / PAC</Reveal><Reveal delay={.05}><h2>PARTICIPAÇÃO<br /><span>AO VIVO.</span></h2></Reveal>
            <Reveal delay={.1}><p>Cass cria uma Call no dashboard. O público entra com R$ ou CassCoin. O saldo é reservado, Cass executa a aposta e o PAC organiza regra, resultado, fee e distribuição.</p></Reveal>
            <Reveal className="control-points" delay={.16}><span><Dot /> Entrada em R$ ou CC</span><span><Dot /> Regras congeladas no start</span><span><Dot /> Resultado manual ou integrado</span><span><Dot /> Saldo reutilizável ou sacável</span></Reveal>
          </div>
          <HeroCard />
        </section>

        <section className="section wrap mechanic-section">
          <SectionTitle index="09" kicker="MECÂNICA" title="SIMPLES PARA O PÚBLICO." accent="CONTROLADA PARA A OPERAÇÃO." />
          <div className="mechanic-grid">{callFlow.map(([n,t,c],idx)=><Reveal className="mechanic-card" delay={idx*.035} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
          <Reveal className="freeze-banner" delay={.2}><strong>START = REGRA CONGELADA.</strong><p>Depois que a Call começa, parâmetros críticos não mudam. Mais previsibilidade para usuário, streamer e operação.</p></Reveal>
        </section>

        <section className="section wrap engine-section">
          <SectionTitle index="10" kicker="CALL ENGINE" title="UM MOTOR." accent="MUITAS CALLS." description="Não é liberdade caótica. É liberdade dentro de modelos testáveis, operáveis e vendáveis." />
          <div className="call-type-grid">{callTypes.map((call, idx) => <Reveal className="call-type" delay={idx * 0.05} key={call.title}><div className="call-type__num">{call.number}</div><div className="call-type__body"><h3>{call.title}</h3><p>{call.copy}</p><div className="call-type__meta">{call.meta.map((m) => <Pill key={m}>{m}</Pill>)}</div></div><div className="call-type__arrow"><ArrowIcon /></div></Reveal>)}</div>
        </section>

        <section className="section wrap distribution-section">
          <SectionTitle index="11" kicker="DISTRIBUTION ENGINE" title="CADA CAMPANHA PODE TER" accent="UMA MECÂNICA PRÓPRIA." />
          <div className="distribution-cloud">{distribution.map((item,idx)=><Reveal className="distribution-pill" delay={idx*.04} key={item}>{item}</Reveal>)}</div>
          <Reveal className="distribution-copy" delay={.16}><p>Uma nova regra de distribuição entra como estratégia adicionável.</p><strong>O PRODUTO CRESCE SEM VIRAR GAMBARRA NO CÓDIGO.</strong></Reveal>
        </section>

        <section className="section wrap control-section">
          <div className="control-copy"><Reveal className="section-kicker">12 / CREATOR CONTROL</Reveal><Reveal delay={0.06}><h2>SEM DEV.<br /><span>SEM ATRITO.</span></h2></Reveal><Reveal delay={0.12}><p>Cass cria, agenda e controla a experiência sozinho: entrada, meta, aporte, winners, proteção, duração, distribuição e regras.</p></Reveal><Reveal className="control-points" delay={0.18}><span><Dot /> Ao vivo ou agendado</span><span><Dot /> Regras congeladas no start</span><span><Dot /> Resultado manual ou integrado</span><span><Dot /> Parceiros e rewards plugáveis</span></Reveal></div>
          <Reveal className="dashboard-wrap" delay={0.08}><DashboardMock /></Reveal>
        </section>

        <section className="section wrap finance-section">
          <SectionTitle index="13" kicker="FINANCEIRO" title="DINHEIRO COM PARCEIRO." accent="PRODUTO COM A GENTE." />
          <div className="finance-flow">
            {[["USUÁRIO", "Pix · saldo · saque"],["PSP / BAAS", "KYC · custódia · webhooks"],["PAC", "UX · ledger · reserva · settlement"],["CASS / BET", "execução da Call"]].map(([t,c],idx)=><React.Fragment key={t}><Reveal className={`finance-node ${idx===2?"finance-node--accent":""}`} delay={idx*.05}><span>{String(idx+1).padStart(2,"0")}</span><h3>{t}</h3><p>{c}</p></Reveal>{idx<3&&<div className="flow-arrow">→</div>}</React.Fragment>)}
          </div>
          <Reveal className="finance-note" delay={.2}><p><strong>Premissa comercial:</strong> escolha do fornecedor financeiro, validações jurídicas e adequações fazem parte da implementação.</p><p>Custos de terceiros e taxas transacionais ficam fora do fee de desenvolvimento.</p></Reveal>
        </section>

        <section className="section wrap roadmap-section">
          <SectionTitle index="14" kicker="ROADMAP PAC" title="DO MVP AO" accent="MOAT COMPETITIVO." />
          <Roadmap items={pacRoadmap} />
          <Reveal className="optionality-banner" delay={.2}><span>EXCLUSIVO DO CASS</span><i>OU</i><span>MULTI-CREATOR</span><i>OU</i><span>BET / B2B</span></Reveal>
        </section>

        <section className="statement-section package-statement"><div className="wrap statement-inner"><Reveal className="statement-label">THE COMMERCIAL THESIS</Reveal><Reveal delay={.08}><p className="statement">SEPARADOS CONSTROEM <em>FEATURES.</em><br />JUNTOS CONSTROEM <em>UM ATIVO.</em></p></Reveal></div></section>

        <section className="section wrap package-section">
          <SectionTitle index="15" kicker="PACOTE" title="A PLATAFORMA PREPARA." accent="O PAC CONVERTE." />
          <div className="triple-grid package-grid">
            <Reveal className="big-card"><small>CASS PLATFORM</small><h3>IDENTIDADE + HÁBITO.</h3><p>Conta, progressão, recompensa, first-party data e uma base própria que aprende a voltar.</p></Reveal>
            <Reveal className="big-card" delay={.06}><small>PAC</small><h3>PARTICIPAÇÃO + TICKET.</h3><p>Transforma o hábito acumulado em uma experiência econômica ao vivo, configurável e repetível.</p></Reveal>
            <Reveal className="big-card big-card--accent" delay={.12}><small>JUNTOS</small><h3>INFRAESTRUTURA PROPRIETÁRIA.</h3><p>Não estamos propondo “um site”. Estamos construindo a camada digital para capturar mais valor da audiência do Cass.</p></Reveal>
          </div>
        </section>

        <section id="investimento" className="section wrap investment-section">
          <SectionTitle index="16" kicker="INVESTIMENTO" title="DOIS PRODUTOS." accent="UM PACOTE RECOMENDADO." />
          <div className="pricing-grid">
            <Reveal className="price-card"><small>CASS PLATFORM</small><h3>R$ 85.000</h3><span>10–12 semanas</span><p>Conta, gamificação, rewards, admin e partner hub.</p></Reveal>
            <Reveal className="price-card" delay={.06}><small>PAC</small><h3>R$ 165.000</h3><span>12–16 semanas</span><p>Wallet, Call Engine, dashboard, settlement e integração PSP/BaaS.</p></Reveal>
            <Reveal className="price-card price-card--featured" delay={.12}><div className="recommended">RECOMENDADO</div><small>ECOSSISTEMA COMPLETO</small><h3>R$ 220.000</h3><span>22–28 semanas</span><p>Arquitetura compartilhada + desconto de pacote. CASS Platform primeiro; PAC como grande atualização.</p></Reveal>
          </div>
          <Reveal className="post-launch" delay={.16}><div><small>OPCIONAL PÓS-LANÇAMENTO</small><strong>SUPORTE / PRODUTO · R$ 12K/MÊS</strong></div><div><small>OPCIONAL PÓS-LANÇAMENTO</small><strong>GROWTH / CRM · R$ 8K/MÊS</strong></div></Reveal>
        </section>

        <section className="section wrap milestones-section">
          <SectionTitle index="17" kicker="PAGAMENTO" title="MILESTONES CLAROS." accent="RISCO DISTRIBUÍDO." />
          <div className="milestone-track">{[["25%","KICKOFF","assinatura e início"],["25%","CASS FOUNDATION","primeiro build funcional"],["20%","CASS LAUNCH","plataforma pública"],["20%","PAC FOUNDATION","wallet + engine"],["10%","PAC LAUNCH","MVP no ar"]].map(([p,t,c],idx)=><Reveal className="milestone" delay={idx*.04} key={t}><strong>{p}</strong><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
          <Reveal className="milestone-note" delay={.18}>Pagamentos por entrega protegem caixa, reduzem risco e mantêm avanço objetivo.</Reveal>
        </section>

        <section id="proximos" className="section wrap next-section">
          <SectionTitle index="18" kicker="PRÓXIMOS PASSOS" title="APROVAR AGORA." accent="RESOLVER NO PROCESSO." />
          <div className="next-grid">{[["01","APROVAÇÃO","Confirmar pacote, escopo macro, valores e modelo de pagamento."],["02","KICKOFF","Alinhar responsáveis, prioridades, roadmap e primeiras decisões de produto."],["03","DISCOVERY TÉCNICO","PSP/BaaS, jurídico, arquitetura, UX e backlog fechado da primeira release."],["04","BUILD","CASS Platform primeiro. PAC entra como a atualização que muda o jogo."]].map(([n,t,c],idx)=><Reveal className="next-card" delay={idx*.05} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div>
          <Reveal className="closing-thesis" delay={.2}><p>FECHAR O PROJETO AGORA NÃO COMPRA UMA SOLUÇÃO PRONTA.</p><strong>COMPRA O TEMPO TÉCNICO PARA TRANSFORMAR A TESE EM PRODUTO.</strong></Reveal>
        </section>

        <section className="section wrap assumptions-section">
          <Reveal className="section-kicker">19 / PREMISSAS IMPORTANTES</Reveal>
          <div className="assumption-list">{assumptions.map((item,idx)=><Reveal className="assumption" delay={idx*.035} key={item}><span>{String(idx+1).padStart(2,"0")}</span><p>{item}</p></Reveal>)}</div>
          <Reveal className="assumption-bottom" delay={.2}>A proposta assume execução progressiva: <strong>construir, validar, adequar e lançar</strong> sem travar a venda por incógnitas naturais de um produto novo.</Reveal>
        </section>

        <section className="final-section"><div className="final-orbit final-orbit--one" aria-hidden="true" /><div className="final-orbit final-orbit--two" aria-hidden="true" /><div className="wrap final-inner"><Reveal><Logo /></Reveal><Reveal delay={0.06}><p className="final-kicker">CASS + PAC</p></Reveal><Reveal delay={0.1}><h2>A PRÓXIMA FASE<br /><span>COMEÇA AQUI.</span></h2></Reveal><Reveal className="final-copy" delay={0.16}><p>Primeiro construímos a casa.<br />Depois plugamos o motor que muda o jogo.</p></Reveal><Reveal delay={0.22}><a className="primary-btn primary-btn--large" href="#tese">REVER A PROPOSTA <ArrowIcon /></a></Reveal></div><div className="wrap footer-line"><span>PAC.BET / 2026</span><span>PRODUCT · COMMUNITY · TECHNOLOGY</span><span>COMMERCIAL PROPOSAL</span></div></section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
