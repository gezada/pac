import React from "react"
import { createRoot } from "react-dom/client"
import { motion } from "motion/react"
import { PresentationIcon } from "./presentation-icons.jsx"
import "./styles.css"
import "./deck.css"

const ease = [0.22, 1, 0.36, 1]
const behaviorLoop = ["ASSISTE", "ENTRA", "GANHA", "ACUMULA", "EVOLUI", "TROCA", "PARTICIPA", "VOLTA"]
const benchmarkLoop = ["STREAM", "CONTA", "PROGRESSÃO", "REWARDS", "STORE", "PLAY", "RETORNO"]
const milestones = [["25%", "KICKOFF"], ["25%", "CASS FOUNDATION"], ["20%", "CASS LAUNCH"], ["20%", "PAC FOUNDATION"], ["10%", "PAC LAUNCH"]]

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
      <div className="call-ui__hero"><div><small>COMMUNITY MATCH</small><strong>PASSA A CALL</strong></div><span>X PARTICIPANTES</span></div>
      <div className="call-ui__chart" aria-hidden="true">
        <svg viewBox="0 0 600 120" preserveAspectRatio="none"><defs><linearGradient id="callLine" x1="0" x2="1"><stop offset="0" stopColor="#64ff93" /><stop offset=".52" stopColor="#20d9ff" /><stop offset="1" stopColor="#b42bff" /></linearGradient></defs><path d="M0 96 C55 92 76 54 120 70 S188 105 232 70 S304 28 350 49 S417 98 462 58 S535 30 600 18" fill="none" stroke="url(#callLine)" strokeWidth="3" strokeLinecap="round" /></svg>
      </div>
      <div className="call-ui__metrics"><div><small>COMUNIDADE</small><strong>R$ XX.XXX</strong></div><div><small>CASS MATCH</small><strong>XX%</strong></div><div><small>STATUS</small><strong>REGRA CONGELADA</strong></div></div>
      <div className="call-ui__actions"><button type="button">ENTRAR COM R$</button><button type="button">ENTRAR COM CASSCOIN</button></div>
    </div>
  )
}

function DashboardInterface() {
  const fields = [["TEMPLATE", "MATCH CALL"], ["ENTRADA", "R$ XX"], ["META", "R$ XX.XXX"], ["APORTE CASS", "XX%"], ["PROTEÇÃO", "ATIVA"], ["DISTRIBUIÇÃO", "PROPORCIONAL"], ["ELEGIBILIDADE", "LEVEL X+"], ["DURAÇÃO", "XX MIN"], ["PARCEIRO", "SELECIONAR"], ["REWARD", "SELECIONAR"], ["AGENDAMENTO", "DEFINIR"]]
  return (
    <div className="creator-ui">
      <aside className="creator-ui__rail"><div className="mini-mark">C</div>{[0, 1, 2, 3].map((item) => <span className={item === 0 ? "active" : ""} key={item} />)}</aside>
      <div className="creator-ui__main">
        <div className="creator-ui__header"><div><small>CREATOR CONTROL</small><strong>NOVA EXPERIÊNCIA</strong></div><span>PREVIEW AO VIVO</span></div>
        <div className="creator-ui__body">
          <div className="creator-ui__fields">{fields.map(([label, value], index) => <div className={index === 0 ? "wide" : ""} key={label}><small>{label}</small><span>{value}</span></div>)}</div>
          <div className="creator-ui__preview"><small>PREVIEW</small><div className="preview-orbit"><span>EVENT</span><strong>READY</strong></div><div className="creator-ui__start-note">START = REGRA CONGELADA</div><button type="button">INICIAR</button></div>
        </div>
      </div>
    </div>
  )
}

function PlayInterface() {
  return (
    <div className="play-ui">
      <div className="play-ui__top"><div><small>CASS PLAY</small><strong>PLAYGROUND</strong></div><div className="play-balance"><small>SALDO CASSCOIN</small><strong>XX.XXX CC</strong></div></div>
      <div className="play-ui__content">
        <div className="play-feature"><span>EVENTO ATIVO</span><PresentationIcon name="play" /><strong>COMMUNITY<br />ARCADE</strong><small>MISSIONS + REWARDS</small><button type="button">JOGAR</button></div>
        <div className="play-games">{["DAILY DROP", "CASS QUEST", "RANK RUSH"].map((item, index) => <div key={item}><span>0{index + 1}</span><PresentationIcon name={index === 1 ? "missions" : "game"} /><strong>{item}</strong><small>LEVEL XX</small></div>)}</div>
        <div className="play-ranking"><small>RANKING</small>{["01 · PLAYER", "02 · PLAYER", "03 · PLAYER"].map((item) => <span key={item}>{item}<i>XX XP</i></span>)}</div>
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
            <SlideHead kicker="HOJE">O FACEBOOK É O PALCO<br />O WHATSAPP É A DISTRIBUIÇÃO<br /><span>MAS NENHUM DOS DOIS É A CASA</span></SlideHead>
            <div className="reality-map">
              <Reveal className="platform-window platform-window--facebook" delay={0.1}><div className="platform-window__top"><i /><span>FACEBOOK LIVE</span></div><div className="live-frame"><span className="live-chip">AO VIVO</span><div className="live-person" /><div className="live-chat"><i /><i /><i /></div></div></Reveal>
              <div className="reality-links" aria-hidden="true"><i /><i /></div>
              <Reveal className="audience-core" delay={0.18}><small>COMUNIDADE</small><strong>AUDIÊNCIA<br />DO CASS</strong><span>RELAÇÃO ALUGADA</span></Reveal>
              <Reveal className="platform-window platform-window--whatsapp" delay={0.14}><div className="platform-window__top"><i /><span>WHATSAPP</span></div><div className="chat-stack"><i /><i /><i /><i /></div></Reveal>
            </div>
          </div>
        </section>

        <section className="deck-slide vision-slide" aria-label="Visão completa do ecossistema">
          <div className="deck-slide__inner">
            <SlideHead>NÃO TROCAMOS O QUE JÁ FUNCIONA<br /><span>ADICIONAMOS O QUE AINDA NÃO EXISTE</span></SlideHead>
            <div className="vision-architecture">
              <div className="vision-channels">
                <Reveal className="vision-node vision-node--channel" delay={0.08}><PresentationIcon name="facebook" /><div><small>FACEBOOK</small><strong>PALCO</strong><span>ALCANCE + LIVE</span></div></Reveal>
                <Reveal className="vision-node vision-node--channel" delay={0.11}><PresentationIcon name="whatsapp" /><div><small>WHATSAPP</small><strong>DISTRIBUIÇÃO</strong><span>COMUNIDADE + RETORNO</span></div></Reveal>
              </div>
              <div className="vision-connector"><span>CANAIS EXISTENTES</span><i /></div>
              <div className="vision-products">
                {[["platform", "01", "CASS PLATFORM", "CASA", "IDENTIDADE + DADOS"], ["pac", "02", "PAC", "PARTICIPAÇÃO AO VIVO", "EVENTOS + ECONOMIA"], ["play", "03", "CASS PLAY", "ENTRETENIMENTO 24/7", "FASE FUTURA"]].map(([icon, number, product, role, copy], index) => <React.Fragment key={product}><Reveal className={`vision-node vision-node--product vision-node--${number}`} delay={0.14 + index * 0.045}><PresentationIcon name={icon} /><span>{number}</span><div><small>{product}</small><strong>{role}</strong><em>{copy}</em></div></Reveal>{index < 2 && <div className="vision-arrow">→</div>}</React.Fragment>)}
              </div>
            </div>
          </div>
        </section>

        <section className="deck-slide benchmark-slide" aria-label="Benchmark Roshtein">
          <div className="deck-slide__inner">
            <SlideHead kicker="BENCHMARK">ROSHSTEIN PROVOU O MODELO<br /><span>O CASS ADAPTA PARA O BRASIL</span></SlideHead>
            <div className="benchmark-layout">
              <Reveal className="benchmark-system" delay={0.08}><div className="benchmark-system__top"><span>ROSHSTEIN.COM</span><small>ECOSSISTEMA VALIDADO</small></div><div className="benchmark-flow">{benchmarkLoop.map((item, index) => <React.Fragment key={item}><div className={item === "PLAY" ? "benchmark-flow__node benchmark-flow__node--accent" : "benchmark-flow__node"}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>{index < benchmarkLoop.length - 1 && <i>→</i>}</React.Fragment>)}</div><div className="benchmark-return"><span>RETORNO RECORRENTE</span><i /></div></Reveal>
              <div className="benchmark-lessons">{[["01", "MODELAR A LÓGICA", "Progressão · Missions · Rewards · Store · Play · ..."], ["02", "ADAPTAR O CONTEXTO", "Facebook · WhatsApp · Pix · Brasil"], ["03", "CRIAR O DIFERENCIAL", "PAC + mecânicas próprias"]].map(([number, title, copy], index) => <Reveal className={index === 2 ? "benchmark-lesson benchmark-lesson--accent" : "benchmark-lesson"} delay={0.12 + index * 0.05} key={title}><span>{number}</span><div><small>{title}</small><strong>{copy}</strong></div></Reveal>)}</div>
            </div>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 01" title={["CASS", "PLATFORM"]} support={<><strong>A casa própria do Cass</strong><small>Conta · hábito · rewards · dados próprios</small></>} />

        <section className="deck-slide account-slide" aria-label="Valor da conta">
          <div className="deck-slide__inner">
            <SlideHead>CADASTRAR PRECISA<br /><span>VALER A PENA</span></SlideHead>
            <div className="account-orbit">
              <svg className="account-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="50" x2="17" y2="35" /><line x1="50" y1="50" x2="83" y2="35" /><line x1="50" y1="50" x2="17" y2="65" /><line x1="50" y1="50" x2="83" y2="65" /></svg>
              <Reveal className="viewer-profile" delay={0.1}><div className="viewer-profile__avatar">C</div><small>PERFIL DO VIEWER</small><strong>LEVEL XX</strong><div className="viewer-profile__bar"><i /></div><div className="viewer-profile__wallet"><span>XP</span><span>CASSCOIN</span></div></Reveal>
              {[["rewards", "GANHA", "Rewards desde a entrada"], ["progress", "EVOLUI", "XP · levels · streaks"], ["store", "TROCA", "Store · raffles · drops"], ["activity", "PARTICIPA", "Missions · predictions · campanhas"]].map(([icon, title, copy], index) => <Reveal className={`orbit-action orbit-action--${index + 1}`} delay={0.14 + index * 0.04} key={title}><PresentationIcon name={icon} /><div><strong>{title}</strong><span>{copy}</span></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="deck-slide loop-slide" aria-label="Loop de hábito">
          <div className="deck-slide__inner">
            <div className="loop-copy"><SlideHead>DE AUDIÊNCIA<br /><span>PARA HÁBITO</span></SlideHead><Reveal className="loop-support" delay={0.05}>CADA VOLTA GERA MAIS DADOS, RELAÇÃO E VALOR</Reveal></div>
            <div className="behavior-loop"><div className="behavior-loop__ring" aria-hidden="true"><span>→</span><span>↓</span><span>←</span><span>↑</span></div>{behaviorLoop.map((item, index) => <Reveal className={`behavior-loop__item behavior-loop__item--${index + 1}`} delay={0.07 + index * 0.035} key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></Reveal>)}<div className="behavior-loop__center"><small>LOOP</small><strong>MAIS<br />VALOR</strong></div><div className="behavior-loop__return">VOLTA <span>→</span> ASSISTE</div></div>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 02" title={["PASSA", "A CALL"]} support={<strong>ASSISTIR VIRA PARTICIPAR</strong>} />

        <section className="deck-slide pac-screen-slide" aria-label="PAC em uma tela">
          <div className="deck-slide__inner pac-screen-layout">
            <SlideHead>COMUNIDADE ENTRA<br />CASS EXECUTA<br /><span>PAC ORGANIZA</span></SlideHead>
            <Reveal className="call-ui-wrap" delay={0.08}><CallInterface /><div className="pac-screen-tags"><Tag accent>R$ OU CASSCOIN</Tag><Tag>REGRA CONGELADA</Tag><Tag>SETTLEMENT</Tag></div></Reveal>
          </div>
        </section>

        <section className="deck-slide engine-slide" aria-label="Motor de experiências">
          <div className="deck-slide__inner">
            <SlideHead>UM MOTOR<br /><span>MUITAS EXPERIÊNCIAS</span></SlideHead>
            <div className="engine-matrix">
              <Reveal className="engine-panel" delay={0.08}><small>TIPO DE EVENTO</small>{["COMMUNITY CALL", "MATCH CALL", "PROTECTED / BOOSTED"].map((item) => <strong key={item}>{item}</strong>)}</Reveal>
              <div className="engine-times">×</div>
              <Reveal className="engine-panel engine-panel--accent" delay={0.12}><small>REGRA DE DISTRIBUIÇÃO</small><div>{["PROPORCIONAL", "IGUALITÁRIA", "1 VENCEDOR", "X VENCEDORES", "RANKING", "PATROCINADA", "OUTRAS"].map((item) => <span key={item}>{item}</span>)}</div></Reveal>
            </div>
            <Reveal className="engine-evolution" delay={0.18}><span>CALLS HOJE</span><i>→</i>{["PREDICTIONS", "BONUS HUNTS", "RAFFLES", "COMMUNITY CHALLENGES", "SPONSORED EVENTS", "..."].map((item) => <Tag key={item}>{item}</Tag>)}</Reveal>
          </div>
        </section>

        <section className="deck-slide creator-slide" aria-label="Creator Control">
          <div className="deck-slide__inner"><SlideHead kicker="CREATOR CONTROL">SEM DEV<br /><span>CASS MONTA A EXPERIÊNCIA</span></SlideHead><Reveal className="creator-ui-wrap" delay={0.08}><DashboardInterface /></Reveal></div>
        </section>

        <section className="deck-slide finance-slide" aria-label="Financeiro e discovery">
          <div className="deck-slide__inner">
            <SlideHead>PRODUTO COM A GENTE<br /><span>DINHEIRO COM PARCEIROS REGULADOS</span></SlideHead>
            <div className="money-flow">{["USUÁRIO", "PSP / BAAS", "PAC", "CASS / BET"].map((item, index) => <React.Fragment key={item}><Reveal className={index === 1 || index === 2 ? "money-node money-node--accent" : "money-node"} delay={0.07 + index * 0.04}>{item}</Reveal>{index < 3 && <span>↔</span>}</React.Fragment>)}</div>
            <div className="finance-roles">{[["PSP / BAAS", "KYC · PIX · CUSTÓDIA · SALDO · SAQUE"], ["PAC", "UX · REGRAS · LEDGER · RESERVA · SETTLEMENT"], ["CASS / BET", "EXECUÇÃO DA EXPERIÊNCIA"]].map(([title, copy], index) => <Reveal delay={0.13 + index * 0.04} key={title}><small>{title}</small><strong>{copy}</strong></Reveal>)}</div>
            <div className="discovery-line"><span>DISCOVERY</span>{["JURÍDICO", "PSP / BAAS", "INTEGRAÇÕES"].map((item) => <Tag key={item}>{item}</Tag>)}<strong>PAC NÃO PRECISA CUSTODIAR DINHEIRO EM CONTA PRÓPRIA</strong></div>
          </div>
        </section>

        <ProductTransition kicker="PRODUTO 03 · FASE FUTURA" title={["CASS", "PLAY"]} future support={<strong>QUANDO A LIVE ACABA<br />O ECOSSISTEMA CONTINUA</strong>} />

        <section className="deck-slide play-slide" aria-label="Cass Play em uma tela">
          <div className="deck-slide__inner play-layout">
            <div className="play-copy"><SlideHead>CASSCOIN VIRA<br /><span>ENTRETENIMENTO 24/7</span></SlideHead><div className="play-loop">{["GANHA CASSCOIN", "JOGA", "RANKINGS · MISSIONS · EVENTS", "GANHA REWARDS", "VOLTA"].map((item, index) => <React.Fragment key={item}><Reveal delay={0.07 + index * 0.025}>{item}</Reveal>{index < 4 && <span>↓</span>}</React.Fragment>)}</div><Reveal className="play-callout" delay={0.19}>SEM DEPENDER DO CASS ESTAR AO VIVO</Reveal></div>
            <Reveal className="play-ui-wrap" delay={0.1}><PlayInterface /></Reveal>
          </div>
        </section>

        <section className="deck-slide roadmap-slide" aria-label="Roadmap do ecossistema">
          <div className="deck-slide__inner">
            <SlideHead>PRIMEIRO A CASA<br />DEPOIS PARTICIPAÇÃO<br /><span>DEPOIS 24/7</span></SlideHead>
            <div className="ecosystem-roadmap"><div className="ecosystem-roadmap__track" />{[["01", "CASA", "CASS PLATFORM", "Conta · perfil · rewards · dados"], ["02", "LIVE", "PAC", "Calls · Event Engine · wallet · settlement"], ["03", "24/7", "CASS PLAY", "Games · CassCoin · rankings · events"], ["04", "SCALE", "ECOSYSTEM", "Mobile · CRM · partners · automation"], ["05", "OPTIONALITY", "", "EXCLUSIVO · MULTI-CREATOR · WHITE-LABEL · BET PARTNERSHIP"]].map(([number, phase, title, copy], index) => <Reveal className={`roadmap-stage roadmap-stage--${index + 1}`} delay={0.07 + index * 0.045} key={phase}><span>{number}</span><small>{phase}</small>{title && <strong>{title}</strong>}<p>{copy}</p></Reveal>)}</div>
          </div>
        </section>

        <section className="deck-slide wrap-slide" aria-label="Resumo do ecossistema">
          <div className="deck-slide__inner"><SlideHead>TRÊS PRODUTOS<br /><span>UM ÚNICO ATIVO</span></SlideHead><div className="wrap-equation">{[["platform", "CASS PLATFORM", "IDENTIDADE + HÁBITO"], ["pac", "PAC", "PARTICIPAÇÃO"], ["play", "CASS PLAY", "24/7"]].map(([icon, title, copy], index) => <React.Fragment key={title}><Reveal className="wrap-product" delay={0.08 + index * 0.045}><PresentationIcon name={icon} /><small>{title}</small><strong>{copy}</strong></Reveal>{index < 2 && <span>+</span>}</React.Fragment>)}<span>=</span><Reveal className="wrap-result" delay={0.22}><small>RESULTADO</small><strong>ECOSSISTEMA<br />PROPRIETÁRIO</strong></Reveal></div></div>
        </section>

        <section className="deck-slide investment-slide" aria-label="Investimento">
          <div className="deck-slide__inner"><SlideHead kicker="INVESTIMENTO">COMEÇAMOS POR<br /><span>PLATFORM + PAC</span></SlideHead><div className="investment-layout"><div className="offer-grid"><Reveal className="offer-card" delay={0.07}><small>CASS PLATFORM</small><strong>R$ 85.000</strong><span>PRODUTO 01</span></Reveal><Reveal className="offer-card" delay={0.11}><small>PAC</small><strong>R$ 165.000</strong><span>PRODUTO 02</span></Reveal><Reveal className="offer-card offer-card--featured" delay={0.15}><div>RECOMENDADO</div><small>CASS PLATFORM + PAC</small><strong>R$ 220.000</strong><span>FASES 01 + 02</span></Reveal></div><Reveal className="future-offer" delay={0.18}><span>FASE FUTURA</span><strong>CASS PLAY</strong><small>ESCOPO + ORÇAMENTO APÓS VALIDAÇÃO DAS FASES 01 + 02</small></Reveal><Reveal className="post-launch" delay={0.21}><small>OPCIONAL PÓS-LANÇAMENTO</small><div><span>SUPORTE / PRODUTO</span><strong>R$ 12.000 / MÊS</strong></div><div><span>GROWTH / CRM</span><strong>R$ 8.000 / MÊS</strong></div></Reveal></div></div>
        </section>

        <section className="deck-slide execution-slide" aria-label="Pagamento e execução">
          <div className="deck-slide__inner"><SlideHead>DA APROVAÇÃO<br /><span>PARA O BUILD</span></SlideHead><div className="execution-layout"><div className="milestone-panel"><small>PAGAMENTO ACOMPANHA A ENTREGA</small><div className="milestone-track">{milestones.map(([percent, title], index) => <Reveal className="milestone-point" delay={0.07 + index * 0.035} key={title}><span>{percent}</span><i /><strong>{title}</strong></Reveal>)}</div></div><div className="build-panel"><small>EXECUÇÃO</small><div>{["APROVA", "KICKOFF", "DISCOVERY", "BUILD"].map((item, index) => <React.Fragment key={item}><Reveal delay={0.09 + index * 0.035}>{item}</Reveal>{index < 3 && <span>→</span>}</React.Fragment>)}</div><strong>CASS PLATFORM PRIMEIRO<br /><span>PAC COMO GRANDE ATUALIZAÇÃO</span></strong></div></div></div>
        </section>

        <section className="deck-slide closing-slide" aria-label="Encerramento"><div className="closing-slide__glow" aria-hidden="true" /><div className="deck-slide__inner closing-slide__inner"><Reveal><h2>A AUDIÊNCIA JÁ EXISTE<br /><span>AGORA CONSTRUÍMOS O ATIVO</span></h2></Reveal><Reveal delay={0.08}><p>CASS ECOSYSTEM</p></Reveal></div></section>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>)