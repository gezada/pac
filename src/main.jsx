import React from "react"
import { createRoot } from "react-dom/client"
import { motion } from "motion/react"
import { PresentationIcon } from "./presentation-icons.jsx"
import "./styles.css"
import "./deck.css"

const ease = [0.22, 1, 0.36, 1]
const behaviorLoop = ["ASSISTE", "ENTRA", "GANHA", "ACUMULA", "EVOLUI", "TROCA", "PARTICIPA", "VOLTA"]
const flywheelArcs = [
  "M 380 54 A 300 206 0 0 1 680 260",
  "M 680 260 A 300 206 0 0 1 380 466",
  "M 380 466 A 300 206 0 0 1 80 260",
  "M 80 260 A 300 206 0 0 1 380 54",
]
const benchmarkLoop = ["STREAM", "CONTA", "PROGRESSÃO", "REWARDS", "STORE", "CASS PLAY", "RETORNO"]


function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-7%" }}
      transition={{ duration: 0.64, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Kicker({ children }) {
  return <div className="deck-kicker"><i />{children}</div>
}

function SlideHead({ kicker, children, support, className = "" }) {
  return (
    <header className={`slide-head ${className}`.trim()}>
      {kicker && <Reveal><Kicker>{kicker}</Kicker></Reveal>}
      <Reveal delay={0.04}><h2>{children}</h2></Reveal>
      {support && <Reveal className="slide-support" delay={0.08}>{support}</Reveal>}
    </header>
  )
}

function Tag({ children, accent = false }) {
  return <span className={`deck-tag${accent ? " deck-tag--accent" : ""}`}>{children}</span>
}

function ProductTransition({ kicker, title, support, future = false }) {
  const [first, second] = title
  return (
    <section className={`deck-slide product-transition${future ? " product-transition--future" : ""}`} aria-label={`${first} ${second}`}>
      <div className="product-transition__glow" aria-hidden="true" />
      <div className="deck-slide__inner product-transition__inner">
        <Reveal><Kicker>{kicker}</Kicker></Reveal>
        <Reveal delay={0.05}><h2>{first}<br /><span>{second}</span></h2></Reveal>
        <Reveal className="product-transition__support" delay={0.1}>{support}</Reveal>
      </div>
    </section>
  )
}

function CallInterface() {
  return (
    <div className="call-ui">
      <div className="call-ui__bar"><span className="status-live"><i /> CALL AO VIVO</span><span>EXEMPLO DE INTERFACE</span></div>
      <div className="call-ui__hero"><div><small>CALL COM APORTE</small><strong>CALL PREMIADA</strong></div><span>X PARTICIPANTES</span></div>
      <div className="call-ui__progress"><div className="call-ui__progress-head"><small>FORMAÇÃO DA BANCA</small><span>EM ANDAMENTO</span></div><div className="call-ui__progress-track"><i /></div><div className="call-ui__progress-legend"><span>COMUNIDADE</span><span>+ APORTE DO CASS</span></div></div>
      <div className="call-ui__metrics"><div><small>COMUNIDADE</small><strong>R$ XX.XXX</strong></div><div><small>APORTE DO CASS</small><strong>XX%</strong></div><div><small>REGRA</small><strong>CONGELADA</strong></div></div>
      <div className="call-ui__actions"><button type="button">ENTRAR COM R$</button><button type="button">ENTRAR COM CASSCOIN</button></div>
    </div>
  )
}

function DashboardInterface() {
  const fields = [["MODELO", "MATCH CALL"], ["ENTRADA", "R$ XX"], ["META", "R$ XX.XXX"], ["APORTE CASS", "XX%"], ["PROTEÇÃO", "ATIVA"], ["DISTRIBUIÇÃO", "PROPORCIONAL"], ["ELEGIBILIDADE", "LEVEL X+"], ["DURAÇÃO", "XX MIN"], ["PARCEIRO", "SELECIONAR"], ["RECOMPENSA", "SELECIONAR"], ["AGENDAMENTO", "DEFINIR"]]
  return (
    <div className="creator-ui">
      <aside className="creator-ui__rail"><div className="mini-mark">C</div>{[0, 1, 2, 3].map((item) => <span className={item === 0 ? "active" : ""} key={item} />)}</aside>
      <div className="creator-ui__main">
        <div className="creator-ui__header"><div><strong>NOVA EXPERIÊNCIA</strong></div><span>PRÉVIA AO VIVO</span></div>
        <div className="creator-ui__body">
          <div className="creator-ui__fields">{fields.map(([label, value], index) => <div className={index === 0 ? "wide" : ""} key={label}><small>{label}</small><span>{value}</span></div>)}</div>
          <div className="creator-ui__preview"><small>PRÉVIA</small><div className="preview-orbit"><span>EXPERIÊNCIA</span><strong>PRONTA</strong></div><div className="creator-ui__start-note">REGRA CONGELADA AO INICIAR</div><button type="button">INICIAR</button></div>
        </div>
      </div>
    </div>
  )
}

function PlayInterface() {
  const trendingGames = [
    ["game", "FORTUNA CC", "SLOTS"],
    ["activity", "GIRO DA LIVE", "ARCADE"],
    ["rewards", "DROP DIÁRIO", "DROPS"],
    ["progress", "RANK RUSH", "RANKING"],
  ]
  const newGames = [
    ["missions", "MISSÃO CASS", "MISSÕES"],
    ["play", "DESAFIO 24/7", "EVENTO"],
    ["community", "ARCADE DA COMUNIDADE", "MULTIPLAYER"],
  ]
  const renderGame = ([icon, title, type], index) => (
    <div className={`casino-game casino-game--${index + 1}`} key={title}>
      <div className="casino-game__cover"><PresentationIcon name={icon} /><i /><i /><span>{index === 0 ? "HOT" : "NOVO"}</span></div>
      <strong>{title}</strong><small>{type}</small>
    </div>
  )
  return (
    <div className="play-ui">
      <div className="play-ui__top"><div><small>CASS PLAY</small><strong>CASSINO DO CASS</strong></div><div className="play-balance"><small>SALDO CASSCOIN</small><strong>XX.XXX CC</strong></div></div>
      <nav className="casino-nav" aria-label="Categorias do Cass Play"><span className="active">INÍCIO</span><span>JOGOS</span><span>SLOTS</span><span>EVENTOS</span><span>MISSÕES</span><span>RANKING</span><i>⌕</i></nav>
      <div className="casino-lobby">
        <div className="casino-main">
          <div className="casino-hero">
            <div><small>JOGO EM DESTAQUE</small><strong>GIRO DA<br />FORTUNA</strong><span>PRÊMIOS EM CASSCOIN</span><button type="button">JOGAR AGORA</button></div>
            <div className="casino-hero__reels" aria-hidden="true"><i>7</i><i>C</i><i>★</i></div>
          </div>
          <section className="casino-shelf"><header><strong>JOGOS EM ALTA</strong><span>VER TODOS →</span></header><div className="casino-shelf__grid">{trendingGames.map(renderGame)}</div></section>
          <section className="casino-shelf casino-shelf--new"><header><strong>NOVIDADES</strong><span>DESCOBRIR →</span></header><div className="casino-shelf__grid casino-shelf__grid--three">{newGames.map(renderGame)}</div></section>
        </div>
        <aside className="casino-ranking"><small>RANKING AO VIVO</small><strong>TOP JOGADORES</strong>{["01 · JOGADOR", "02 · JOGADOR", "03 · JOGADOR", "04 · JOGADOR"].map((item) => <span key={item}>{item}<i>XX XP</i></span>)}<div><small>SEU LEVEL</small><b>XX</b></div></aside>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="site">
      <div className="noise" aria-hidden="true" />
      <div className="ambient ambient--a" aria-hidden="true" />
      <div className="ambient ambient--b" aria-hidden="true" />
      <main>
        <section className="deck-slide reality-slide" data-deck-start aria-label="A realidade atual">
          <div className="deck-slide__inner">
            <SlideHead kicker="HOJE">O FACEBOOK E O WHATSAPP<br />SÃO PALCO E DISTRIBUIÇÃO<br /><span>MAS NENHUM DOS DOIS É A CASA</span></SlideHead>
            <div className="reality-map">
              <Reveal className="platform-window platform-window--facebook" delay={0.1}><div className="platform-window__top"><i /><span>FACEBOOK LIVE</span><PresentationIcon name="facebook" className="platform-window__brand" /></div><div className="live-frame"><span className="live-chip">AO VIVO</span><div className="live-person" /><div className="live-chat"><i /><i /><i /></div></div></Reveal>
              <div className="reality-links" aria-hidden="true"><i /><i /></div>
              <Reveal className="audience-core" delay={0.18}><small>COMUNIDADE</small><strong>AUDIÊNCIA</strong><span>RELAÇÃO ALUGADA</span></Reveal>
              <Reveal className="platform-window platform-window--whatsapp" delay={0.14}><div className="platform-window__top"><i /><span>WHATSAPP</span><PresentationIcon name="whatsapp" className="platform-window__brand" /></div><div className="chat-stack"><i /><i /><i /><i /></div></Reveal>
            </div>
          </div>
        </section>

        <section className="deck-slide vision-slide" aria-label="Visão completa do ecossistema">
          <div className="deck-slide__inner">
            <SlideHead>NÃO TROCAMOS O QUE JÁ FUNCIONA<br /><span>ADICIONAMOS O QUE AINDA NÃO EXISTE</span></SlideHead>
            <div className="vision-architecture">
              <div className="vision-channels">
                <Reveal className="vision-node vision-node--channel" delay={0.08}><PresentationIcon name="facebook" /><div><strong>PALCO</strong><span>ALCANCE + LIVE</span></div></Reveal>
                <Reveal className="vision-node vision-node--channel" delay={0.11}><PresentationIcon name="whatsapp" /><div><strong>DISTRIBUIÇÃO</strong><span>COMUNIDADE + RETORNO</span></div></Reveal>
              </div>
              <div className="vision-connector" aria-hidden="true"><i /></div>
              <div className="vision-products">
                {[["platform", "01", "VALOR PERCEBIDO + DADOS", "CASS.COM", "ENGAJAMENTO"], ["pac", "02", "EVENTOS + ECONOMIA PROPRIETÁRIA", "PASSA A CALL", "LUCRO / TICKET MÉDIO"], ["play", "03", "RECORRÊNCIA + ENTRETENIMENTO 24/7", "CASS PLAY", "VALOR / EQUITY"]].map(([icon, number, overline, title, value], index) => <React.Fragment key={title}><Reveal className={`vision-node vision-node--product vision-node--${number}`} delay={0.14 + index * 0.045}><PresentationIcon name={icon} /><span>{number}</span><div><small>{overline}</small><strong>{title}</strong><b><i>+</i>{value}</b></div></Reveal>{index < 2 && <div className="vision-arrow">→</div>}</React.Fragment>)}
              </div>
            </div>
          </div>
        </section>

        <section className="deck-slide benchmark-slide" aria-label="Benchmark Roshtein">
          <div className="deck-slide__inner">
            <SlideHead kicker="BENCHMARK">ROSHSTEIN PROVOU O MODELO<br /><span>NÓS AJUSTAMOS AO BRASIL</span></SlideHead>
            <div className="benchmark-layout">
              <div className="benchmark-lessons">{[["01", "MODELAR A LÓGICA", "Progressão · Missions · Rewards · Store · Play · ..."], ["02", "ADAPTAR O CONTEXTO", "FACEBOOK + WHATSAPP · PIX · PÚBLICO BRASILEIRO"], ["03", "CRIAR O ECOSSISTEMA", "SITE + PAC + CASS PLAY"]].map(([number, title, copy], index) => <Reveal className={index === 2 ? "benchmark-lesson benchmark-lesson--accent" : "benchmark-lesson"} delay={0.08 + index * 0.05} key={title}><span>{number}</span><div><small>{title}</small><strong>{copy}</strong></div></Reveal>)}</div>
              <Reveal className="benchmark-system" delay={0.14}><div className="benchmark-system__top"><span>ROSHSTEIN.COM</span><small>ECOSSISTEMA VALIDADO</small></div><div className="benchmark-cycle"><div className="benchmark-cycle__top">{benchmarkLoop.slice(0, 4).map((item, index) => <React.Fragment key={item}><div className="benchmark-flow__node"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>{index < 3 && <i className="benchmark-cycle__arrow" aria-hidden="true" />}</React.Fragment>)}</div><div className="benchmark-cycle__turn" aria-hidden="true"><i /><i /><i /></div><div className="benchmark-cycle__bottom">{benchmarkLoop.slice(4).map((item, index) => <React.Fragment key={item}><div className={item === "CASS PLAY" ? "benchmark-flow__node benchmark-flow__node--accent" : "benchmark-flow__node"}><span>{String(index + 5).padStart(2, "0")}</span><strong>{item}</strong></div>{index < 2 && <i className="benchmark-cycle__arrow" aria-hidden="true" />}</React.Fragment>)}</div><div className="benchmark-cycle__return-track" aria-hidden="true" /><i className="benchmark-cycle__return-up" aria-hidden="true" /><i className="benchmark-cycle__return-arrow" aria-hidden="true" /><div className="benchmark-cycle__return"><span>RETORNO RECORRENTE</span></div></div></Reveal>
            </div>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 01" title={["CASS", "PLATFORM"]} support={<><strong>A CASA DA AUDIÊNCIA</strong><small>HÁBITO · RECOMPENSAS · DADOS PRÓPRIETÁRIOS</small></>} />

        <section className="deck-slide account-slide" aria-label="Valor da conta">
          <div className="deck-slide__inner">
            <SlideHead>CADASTRAR PRECISA<br /><span>VALER A PENA</span></SlideHead>
            <div className="account-orbit">
              <svg className="account-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="50" x2="17" y2="35" /><line x1="50" y1="50" x2="83" y2="35" /><line x1="50" y1="50" x2="17" y2="65" /><line x1="50" y1="50" x2="83" y2="65" /></svg>
              <Reveal className="viewer-profile" delay={0.1}><div className="viewer-profile__avatar">C</div><small>PERFIL DO VIEWER</small><strong>LEVEL XX</strong><div className="viewer-profile__bar"><i /></div><div className="viewer-profile__wallet"><span>XP</span><span>CASSCOIN</span></div></Reveal>
              {[["rewards", "GANHA", "RECOMPENSAS DESDE A ENTRADA"], ["progress", "EVOLUI", "XP · LEVELS · STREAKS"], ["store", "TROCA", "STORE · RIFAS · DROPS"], ["activity", "PARTICIPA", "MISSIONS · PREDICTIONS · CAMPANHAS"]].map(([icon, title, copy], index) => <Reveal className={`orbit-action orbit-action--${index + 1}`} delay={0.14 + index * 0.04} key={title}><PresentationIcon name={icon} /><div><strong>{title}</strong><span>{copy}</span></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="deck-slide loop-slide" aria-label="Loop de hábito">
          <div className="deck-slide__inner">
            <div className="loop-copy"><SlideHead>DE VIEWER<br /><span>PARA ATIVO</span></SlideHead><Reveal className="loop-support" delay={0.05}>A CADA CICLO GERAMOS MAIS DADOS, DESEJO E VALOR</Reveal></div>
            <div className="behavior-loop">
              <svg className="behavior-loop__track" viewBox="0 0 760 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <linearGradient id="behavior-loop-gradient" x1="80" y1="54" x2="680" y2="466" gradientUnits="userSpaceOnUse"><stop stopColor="#64ff93" /><stop offset=".48" stopColor="#20d9ff" /><stop offset="1" stopColor="#b42bff" /></linearGradient>
                  <marker id="behavior-loop-arrow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 14 7 0 14Z" fill="#78e8ef" /></marker>
                </defs>
                <ellipse className="behavior-loop__track-glow" cx="380" cy="260" rx="300" ry="206" />
                {flywheelArcs.map((path, index) => <path className="behavior-loop__track-arc" d={path} markerEnd="url(#behavior-loop-arrow)" key={index} />)}
              </svg>
              {behaviorLoop.map((item, index) => <Reveal className={"behavior-loop__item behavior-loop__item--" + (index + 1)} delay={0.07 + index * 0.035} key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></Reveal>)}
              <div className="behavior-loop__center"><small>CICLO</small><strong>DE HÁBITO</strong></div>
            </div>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 02" title={["PASSA", "A CALL"]} support={<strong>ASSISTIR VIRA PARTICIPAR</strong>} />

        <section className="deck-slide pac-screen-slide" aria-label="PAC em uma tela">
          <div className="deck-slide__inner pac-screen-layout">
            <SlideHead>PLATAFORMA VERSÁTIL,<br />INTUITIVA E<br /><span>AUTOMATIZADA</span></SlideHead>
            <Reveal className="call-ui-wrap" delay={0.08}><CallInterface /></Reveal>
          </div>
        </section>

        <section className="deck-slide creator-slide" aria-label="Painel do Cass">
          <div className="deck-slide__inner"><SlideHead kicker="DASHBOARD INTERNO INTELIGENTE">CONFIGURAÇÃO RÁPIDA DE<br /><span>EVENTOS, REGRAS E DISTRIBUIÇÃO</span></SlideHead><Reveal className="creator-ui-wrap" delay={0.08}><DashboardInterface /></Reveal></div>
        </section>

        <section className="deck-slide pac-impact-slide" aria-label="PAC como produto e negócio">
          <div className="deck-slide__inner pac-impact-layout">
            <SlideHead>A LIVE DEIXA DE SER SÓ CONTEÚDO<br /><span>E VIRA PRODUTO</span></SlideHead>
            <div className="pac-impact-pillars">
              {[
                ["community", "PARTICIPAÇÃO", "O viewer deixa de só assistir"],
                ["recurrence", "RECORRÊNCIA", "Cada experiência cria motivo para voltar"],
                ["revenue", "NOVA RECEITA", "Novas formas de ativar comunidade e parceiros"],
              ].map(([icon, title, copy], index) => (
                <Reveal className="pac-impact-pillar" delay={0.08 + index * 0.06} key={title}>
                  <PresentationIcon name={icon} />
                  <div><strong>{title}</strong><span>{copy}</span></div>
                </Reveal>
              ))}
            </div>
            <Reveal className="pac-impact-callout" delay={0.3}>E O MOTOR CONTINUA GANHANDO <strong>NOVAS MECÂNICAS E EVENTOS</strong></Reveal>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 03" title={["CASS", "PLAY"]} future support={<strong>QUANDO A LIVE DESLIGA<br />O ENTRETENIMENTO CONTINUA</strong>} />

        <section className="deck-slide play-slide" aria-label="Cass Play em uma tela">
          <div className="deck-slide__inner play-layout">
            <div className="play-copy"><SlideHead>CASSCOIN VIRA<br /><span>ENTRETENIMENTO<br />24/7</span></SlideHead><div className="play-loop">{["GANHA CASSCOIN", "JOGA", "GANHA + EVOLUI", "VOLTA"].map((item, index) => <React.Fragment key={item}><Reveal delay={0.07 + index * 0.03}>{item}</Reveal>{index < 3 && <span aria-hidden="true" />}</React.Fragment>)}</div><Reveal className="play-callout" delay={0.19}>SEM DEPENDER DO CASS<br />ESTAR AO VIVO</Reveal></div>
            <Reveal className="play-ui-wrap" delay={0.1}><PlayInterface /></Reveal>
          </div>
        </section>

        <section className="deck-slide roadmap-slide" aria-label="Roadmap do ecossistema">
          <div className="deck-slide__inner">
            <SlideHead><span>TIMELINE</span></SlideHead>
            <div className="ecosystem-roadmap"><div className="ecosystem-roadmap__track" />{[["01", "CASA", "CASS PLATFORM", "CONTA · PERFIL · REWARDS · DADOS", "~45 DIAS"], ["02", "PARTICIPAÇÃO", "PASSA A CALL", "CALLS · EVENT ENGINE · WALLET · SETTLEMENT", "~90 DIAS"], ["03", "24/7", "CASS PLAY", "JOGOS · CASSCOIN · RANKINGS · EVENTOS", "~150 DIAS"], ["04", "ESCALA", "ECOSSISTEMA", "MOBILE · CRM · PARCEIROS · AUTOMAÇÃO", ""], ["05", "EXPANSÃO", "NOVOS NEGÓCIOS", "EXCLUSIVO · MULTI-CREATOR · WHITE-LABEL · BET PARTNERSHIP", ""]].map(([number, phase, title, copy, timing], index) => <Reveal className={`roadmap-stage roadmap-stage--${index + 1}`} delay={0.07 + index * 0.045} key={phase}><span>{number}</span><small>{phase}</small><strong>{title}</strong><p>{copy}</p><b className={`roadmap-stage__timing${timing ? "" : " roadmap-stage__timing--empty"}`}>{timing || "FUTURO"}</b></Reveal>)}</div>
          </div>
        </section>

        <section className="deck-slide wrap-slide" aria-label="Resumo do ecossistema">
          <div className="deck-slide__inner"><SlideHead>TRÊS PRODUTOS<br /><span>UM ÚNICO ECOSSISTEMA</span></SlideHead><div className="wrap-equation">{[["platform", "CASS PLATFORM", "IDENTIDADE + HÁBITO"], ["pac", "PASSA A CALL", "PARTICIPAÇÃO AO VIVO"], ["play", "CASS PLAY", "ENTRETENIMENTO 24/7"]].map(([icon, title, copy], index) => <React.Fragment key={title}><Reveal className="wrap-product" delay={0.08 + index * 0.045}><PresentationIcon name={icon} /><small>{title}</small><strong>{copy}</strong></Reveal>{index < 2 && <span>+</span>}</React.Fragment>)}</div></div>
        </section>

        <section className="deck-slide investment-slide" aria-label="Investimento">
          <div className="deck-slide__inner">
            <SlideHead kicker="INVESTIMENTO">DOIS CAMINHOS<br /><span>PARA COMEÇAR</span></SlideHead>
            <div className="investment-layout">
              <div className="offer-grid">
                <Reveal className="offer-card offer-card--platform" delay={0.07}><small>CASS PLATFORM</small><strong>R$ 60.000</strong><span>CASA PRÓPRIA DA AUDIÊNCIA</span></Reveal>
                <Reveal className="offer-card offer-card--pac" delay={0.1}><small>PASSA A CALL</small><strong>R$ 90.000</strong><span>PARTICIPAÇÃO AO VIVO + ECONOMIA</span></Reveal>
                <Reveal className="offer-card offer-card--traditional" delay={0.13}><small>CASS PLATFORM + PAC</small><strong>R$ 120.000</strong><span>MODELO TRADICIONAL</span></Reveal>
                <Reveal className="offer-card offer-card--strategic" delay={0.16}><div>RECOMENDADO</div><small>MODELO ESTRATÉGICO</small><strong><span>R$ 90.000</span><em>+ PARTICIPAÇÃO MINORITÁRIA</em></strong><b>CASS PLATFORM + PAC</b><span>TECH FOUNDING PARTNER</span></Reveal>
                <Reveal className="offer-card offer-card--payment" delay={0.19}><small>FORMA DE PAGAMENTO</small><div><span><b>50%</b> KICKOFF</span><i>→</i><span><b>25%</b> BETA</span><i>→</i><span><b>25%</b> LAUNCH</span></div></Reveal>
                <Reveal className="offer-card offer-card--future" delay={0.22}><small>FASE FUTURA</small><strong>CASS PLAY</strong><span>ESCOPO + INVESTIMENTO<br />APÓS VALIDAÇÃO</span></Reveal>
                <Reveal className="offer-card offer-card--external" delay={0.25}><small>CUSTOS EXTERNOS</small><strong>INFRA · PSP/BAAS · TAXAS · TERCEIROS</strong><span>PAGOS À PARTE</span></Reveal>
              </div>
            </div>
          </div>
        </section>



        <section className="deck-slide closing-slide" aria-label="Encerramento"><div className="closing-slide__glow" aria-hidden="true" /><div className="deck-slide__inner closing-slide__inner"><Reveal><h2>A AUDIÊNCIA JÁ EXISTE<br /><span>AGORA VAMOS CONSTRUIR O ATIVO</span></h2></Reveal><Reveal delay={0.08}><p>CASS ECOSYSTEM</p></Reveal></div></section>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>)