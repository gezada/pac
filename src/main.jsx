import React from "react"
import { createRoot } from "react-dom/client"
import { motion } from "motion/react"
import "./styles.css"
import "./deck.css"

const ease = [0.22, 1, 0.36, 1]

const behaviorLoop = ["ASSISTE", "ENTRA", "GANHA", "ACUMULA", "EVOLUI", "TROCA", "PARTICIPA", "VOLTA"]

const cassRoadmap = [
  ["01", "FOUNDATION", "Conta · Perfil · XP · CassCoin"],
  ["02", "REWARDS ENGINE", "Store · Raffles · Drops"],
  ["03", "LIVE ENGAGEMENT", "Codes · Missions · Predictions"],
  ["04", "PARTNER LAYER", "Tracking · Campaigns · Reports"],
  ["05", "PAC READY", "Saldo · Identidade · Event Engine"],
  ["06", "MOBILE", "App/PWA · Push · CRM"],
]

const callTemplates = [
  ["01", "COMMUNITY CALL", "A COMUNIDADE FORMA A BANCA", "Cass executa"],
  ["02", "MATCH CALL", "CASS ADICIONA R$ OU %", "Pode participar ou apenas bonificar"],
  ["03", "PROTECTED / BOOSTED", "CASS OU PARCEIRO PROTEGE OU IMPULSIONA", "Proteção · prêmio · retorno melhor"],
]

const distributionStrategies = [
  "PROPORCIONAL",
  "IGUALITÁRIA",
  "1 VENCEDOR",
  "1 VENCEDOR + PRINCIPAL VOLTA",
  "X VENCEDORES",
  "RANKING",
  "PATROCINADA",
]

const pacRoadmap = [
  ["01", "TECHNICAL DISCOVERY", "Fluxo · Jurídico · PSP/BaaS"],
  ["02", "WALLET + LEDGER", "Saldo · Reserva · Logs · Pix"],
  ["03", "CALL ENGINE MVP", "Dashboard · Realtime · Settlement"],
  ["04", "AUTOMATION LAYER", "API · CSV · Webhooks · Reconciliação"],
  ["05", "EXPANSION", "Novas Calls · Overlays · Analytics"],
  ["06", "STRATEGIC OPTIONALITY", "Exclusivo · Multi-Creator · B2B"],
]

const milestones = [
  ["25%", "KICKOFF"],
  ["25%", "CASS FOUNDATION"],
  ["20%", "CASS LAUNCH"],
  ["20%", "PAC FOUNDATION"],
  ["10%", "PAC LAUNCH"],
]

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-7%" }}
      transition={{ duration: 0.68, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Kicker({ children }) {
  return <div className="deck-kicker"><i />{children}</div>
}

function SlideHead({ kicker, children, support, accent }) {
  return (
    <header className="slide-head">
      {kicker && <Reveal><Kicker>{kicker}</Kicker></Reveal>}
      <Reveal delay={0.04}>
        <h2>{children}{accent && <><br /><span>{accent}</span></>}</h2>
      </Reveal>
      {support && <Reveal className="slide-support" delay={0.08}>{support}</Reveal>}
    </header>
  )
}

function Arrow({ vertical = false }) {
  return <span className={"diagram-arrow" + (vertical ? " diagram-arrow--vertical" : "")} aria-hidden="true">→</span>
}

function Tag({ children, accent = false }) {
  return <span className={"deck-tag" + (accent ? " deck-tag--accent" : "")}>{children}</span>
}

function CallInterface() {
  return (
    <div className="call-ui">
      <div className="call-ui__bar">
        <span className="status-live"><i /> CALL AO VIVO</span>
        <span>EXEMPLO DE INTERFACE</span>
      </div>
      <div className="call-ui__title">
        <small>COMMUNITY MATCH</small>
        <strong>DOUBLE TROUBLE</strong>
      </div>
      <div className="call-ui__chart" aria-hidden="true">
        <svg viewBox="0 0 560 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="callLine" x1="0" x2="1">
              <stop offset="0" stopColor="#64ff93" />
              <stop offset=".5" stopColor="#20d9ff" />
              <stop offset="1" stopColor="#b42bff" />
            </linearGradient>
          </defs>
          <path d="M0 98 C55 92 74 58 116 72 S182 104 222 74 S286 31 330 51 S393 96 432 61 S499 31 560 20" fill="none" stroke="url(#callLine)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="call-ui__metrics">
        <div><small>COMUNIDADE</small><strong>R$ XX.XXX</strong></div>
        <div><small>CASS MATCH</small><strong>+ XX%</strong></div>
        <div><small>PARTICIPANTES</small><strong>X PARTICIPANTES</strong></div>
      </div>
      <div className="call-ui__actions">
        <span>ENTRAR COM R$</span>
        <span>ENTRAR COM CASSCOIN</span>
      </div>
    </div>
  )
}

function DashboardInterface() {
  const fields = [
    ["TIPO DE CALL", "MATCH CALL"],
    ["ENTRADA", "R$ XX"],
    ["META", "R$ XX.XXX"],
    ["APORTE CASS", "XX%"],
    ["PROTEÇÃO", "ATIVA"],
    ["DISTRIBUIÇÃO", "PROPORCIONAL"],
    ["ELEGIBILIDADE", "LEVEL X+"],
    ["DURAÇÃO", "XX MIN"],
    ["PARCEIRO", "SELECIONAR"],
    ["REWARD", "SELECIONAR"],
  ]

  return (
    <div className="creator-ui">
      <aside className="creator-ui__rail">
        <div className="mini-mark"><i /><i /><i /></div>
        {[0, 1, 2, 3].map((item) => <span className={item === 0 ? "active" : ""} key={item} />)}
      </aside>
      <div className="creator-ui__main">
        <div className="creator-ui__header">
          <div><small>CREATOR CONTROL</small><strong>NOVA CALL</strong></div>
          <span>AGENDAMENTO · EXEMPLO</span>
        </div>
        <div className="creator-ui__body">
          <div className="creator-ui__fields">
            {fields.map(([label, value], index) => (
              <div className={index === 0 ? "wide" : ""} key={label}>
                <small>{label}</small>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="creator-ui__preview">
            <small>PREVIEW</small>
            <div className="preview-orbit"><span>CALL</span><strong>READY</strong></div>
            <div className="creator-ui__start-note">START = REGRA CONGELADA</div>
            <button type="button">INICIAR CALL</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Timeline({ items, className = "" }) {
  return (
    <div className={"timeline " + className}>
      <div className="timeline__track" aria-hidden="true" />
      {items.map(([number, title, copy], index) => (
        <Reveal className="timeline__item" delay={index * 0.045} key={title}>
          <span>{number}</span>
          <h3>{title}</h3>
          {copy && <p>{copy}</p>}
        </Reveal>
      ))}
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
            <SlideHead kicker="HOJE" support="A audiência existe, mas a relação ainda depende de plataformas de terceiros">
              FACEBOOK É O PALCO<br />WHATSAPP É A DISTRIBUIÇÃO<br /><span>NENHUM DOS DOIS É A CASA</span>
            </SlideHead>
            <div className="reality-map">
              <Reveal className="platform-window platform-window--facebook" delay={0.1}>
                <div className="platform-window__top"><i /><span>FACEBOOK LIVE</span></div>
                <div className="live-frame"><span className="live-chip">AO VIVO</span><div className="live-person" /><div className="live-chat"><i /><i /><i /></div></div>
              </Reveal>
              <div className="reality-links" aria-hidden="true"><i /><i /></div>
              <Reveal className="audience-core" delay={0.18}><small>COMUNIDADE</small><strong>AUDIÊNCIA<br />DO CASS</strong><span>RELAÇÃO ALUGADA</span></Reveal>
              <Reveal className="platform-window platform-window--whatsapp" delay={0.14}>
                <div className="platform-window__top"><i /><span>WHATSAPP</span></div>
                <div className="chat-stack"><i /><i /><i /><i /></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="deck-slide movement-slide" aria-label="O movimento">
          <div className="deck-slide__inner">
            <SlideHead>
              NÃO TROCAMOS O QUE JÁ FUNCIONA<br /><span>ADICIONAMOS O QUE AINDA NÃO EXISTE</span>
            </SlideHead>
            <div className="layer-architecture">
              <Reveal className="layer-node" delay={0.08}><small>FACEBOOK</small><strong>PALCO</strong><span>ALCANCE + LIVE</span></Reveal>
              <Arrow />
              <Reveal className="layer-node" delay={0.12}><small>WHATSAPP</small><strong>DISTRIBUIÇÃO</strong><span>COMUNIDADE + RETORNO</span></Reveal>
              <Arrow />
              <Reveal className="layer-node layer-node--owned" delay={0.16}><small>CASS PLATFORM</small><strong>CASA</strong><span>IDENTIDADE + DADOS</span></Reveal>
              <Arrow />
              <Reveal className="layer-node layer-node--owned layer-node--pac" delay={0.2}><small>PAC</small><strong>PARTICIPAÇÃO</strong><span>ECONOMIA + TICKET</span></Reveal>
            </div>
            <Reveal className="slide-footnote" delay={0.24}>Aquisição e comunidade continuam onde já funcionam — identidade, dados e economia passam a ser próprios</Reveal>
          </div>
        </section>

        <section className="deck-slide benchmark-new-slide" aria-label="Benchmark Roshtein">
          <div className="deck-slide__inner">
            <SlideHead kicker="BENCHMARK">
              A CATEGORIA JÁ PROVOU QUE FUNCIONA<br /><span>A OPORTUNIDADE É ADAPTAR PARA O CASS</span>
            </SlideHead>
            <div className="benchmark-split">
              <Reveal className="benchmark-product" delay={0.08}>
                <div className="benchmark-product__bar"><span>ROSHSTEIN ECOSYSTEM</span><small>PROVA DE CATEGORIA</small></div>
                <div className="benchmark-profile"><div className="profile-ring">R</div><div><strong>LEVEL XX</strong><span>PROGRESSÃO ATIVA</span></div></div>
                <div className="benchmark-modules"><span>MISSIONS</span><span>REWARDS</span><span>STORE</span><span>COMMUNITY</span></div>
                <div className="benchmark-progress"><i /></div>
              </Reveal>
              <div className="benchmark-lessons">
                {[
                  ["APRENDER", "Progressão · Missions · Rewards · Store"],
                  ["ADAPTAR", "Facebook · WhatsApp · Pix · Casas brasileiras"],
                  ["CRIAR", "Uma camada própria que Roshtein não tem: PAC"],
                ].map(([title, copy], index) => (
                  <Reveal className={index === 2 ? "benchmark-lesson benchmark-lesson--accent" : "benchmark-lesson"} delay={0.12 + index * 0.05} key={title}>
                    <span>{title}</span><strong>{copy}</strong>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cass" className="deck-slide product-transition product-transition--cass" aria-label="Cass Platform">
          <div className="product-transition__glow" aria-hidden="true" />
          <div className="deck-slide__inner product-transition__inner">
            <Reveal><Kicker>PRODUTO 01</Kicker></Reveal>
            <Reveal delay={0.05}><h2>CASS<br /><span>PLATFORM</span></h2></Reveal>
            <Reveal className="product-transition__support" delay={0.1}>A casa própria do Cass</Reveal>
            <Reveal className="product-transition__micro" delay={0.14}>Conta · hábito · rewards · dados próprios</Reveal>
          </div>
        </section>

        <section className="deck-slide account-slide" aria-label="Por que criar conta">
          <div className="deck-slide__inner">
            <SlideHead support="A vantagem precisa existir desde o primeiro acesso">
              CADASTRAR PRECISA<br /><span>VALER A PENA</span>
            </SlideHead>
            <div className="account-orbit">
              <Reveal className="viewer-profile" delay={0.1}>
                <div className="viewer-profile__avatar">C</div>
                <small>PERFIL DO VIEWER</small>
                <strong>LEVEL XX</strong>
                <div className="viewer-profile__bar"><i /></div>
                <div className="viewer-profile__wallet"><span>XP</span><span>CASSCOIN</span></div>
              </Reveal>
              {[
                ["GANHA", "Rewards desde a entrada"],
                ["EVOLUI", "XP · levels · streaks"],
                ["TROCA", "Store · raffles · drops"],
                ["PARTICIPA", "Missions · predictions · campanhas"],
              ].map(([title, copy], index) => (
                <Reveal className={"orbit-action orbit-action--" + (index + 1)} delay={0.14 + index * 0.04} key={title}>
                  <strong>{title}</strong><span>{copy}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="deck-slide loop-slide" aria-label="Loop de comportamento">
          <div className="deck-slide__inner">
            <SlideHead>DE AUDIÊNCIA<br /><span>PARA HÁBITO</span></SlideHead>
            <div className="behavior-loop">
              <div className="behavior-loop__ring" aria-hidden="true" />
              {behaviorLoop.map((item, index) => (
                <Reveal className={"behavior-loop__item behavior-loop__item--" + (index + 1)} delay={0.07 + index * 0.035} key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>
                </Reveal>
              ))}
              <div className="behavior-loop__center"><small>LOOP</small><strong>MAIS<br />VALOR</strong></div>
            </div>
            <Reveal className="slide-footnote" delay={0.22}>Cada volta cria mais dados, mais relacionamento e mais oportunidades comerciais</Reveal>
          </div>
        </section>

        <section className="deck-slide economy-new-slide" aria-label="Economia da Cass Platform">
          <div className="deck-slide__inner">
            <SlideHead>UMA ECONOMIA<br /><span>DOIS PAPÉIS</span></SlideHead>
            <div className="economy-roles">
              <Reveal className="economy-role economy-role--xp" delay={0.08}>
                <div className="economy-role__head"><small>XP</small><strong>STATUS</strong></div>
                <div className="economy-role__list"><span>LEVEL</span><span>RANKING</span><span>PROGRESSÃO</span><span>DESBLOQUEIOS</span></div>
                <div className="economy-role__flag">NÃO É DINHEIRO</div>
              </Reveal>
              <div className="economy-divider"><i /><span>≠</span><i /></div>
              <Reveal className="economy-role economy-role--coin" delay={0.12}>
                <div className="economy-role__head"><small>CASSCOIN</small><strong>VALOR ECONÔMICO</strong></div>
                <div className="economy-role__list"><span>STORE</span><span>RAFFLES</span><span>REWARDS</span><span>FUTURAMENTE PAC</span></div>
                <div className="economy-role__rate">1.000 CC = R$1</div>
              </Reveal>
            </div>
            <Reveal className="rewards-rail" delay={0.18}><strong>REWARDS</strong>{["BANCA", "FREE SPINS", "MERCH", "HARDWARE", "TICKETS", "EXPERIÊNCIAS"].map((item) => <Tag key={item}>{item}</Tag>)}</Reveal>
          </div>
        </section>

        <section className="deck-slide live-layer-slide" aria-label="Live engagement">
          <div className="deck-slide__inner">
            <SlideHead support="O site cria motivos para assistir, entrar, interagir e voltar">
              A LIVE GANHA<br /><span>UMA SEGUNDA CAMADA</span>
            </SlideHead>
            <div className="live-layer">
              <Reveal className="live-mock" delay={0.08}>
                <div className="live-mock__screen"><span>FACEBOOK LIVE</span><div className="live-person live-person--large" /><div className="live-reactions">♥ ♥ ✦</div></div>
                <strong>PRÓXIMA LIVE</strong>
              </Reveal>
              <div className="live-layer__flow">
                <div className="engagement-modules">{["CÓDIGOS", "MISSIONS", "DROPS", "PREDICTIONS"].map((item, index) => <Reveal delay={0.1 + index * 0.035} key={item}><Tag>{item}</Tag></Reveal>)}</div>
                <Arrow vertical />
                <Reveal className="platform-core" delay={0.17}><small>CASS PLATFORM</small><strong>REWARDS + PROGRESSÃO</strong></Reveal>
                <div className="return-line"><span>RETORNO</span><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="deck-slide partner-slide" aria-label="Partner layer e dados">
          <div className="deck-slide__inner">
            <SlideHead accent="VIRA DADO + HISTÓRICO + RELACIONAMENTO">
              CADA ATIVAÇÃO DEIXA<br />DE SER SÓ UM LINK
            </SlideHead>
            <div className="partner-flow">
              {["CASA PARCEIRA", "CAMPANHA", "CONTA DO USUÁRIO", "AÇÃO", "TRACKING", "CRM"].map((item, index) => (
                <React.Fragment key={item}>
                  <Reveal className={index === 2 || index === 5 ? "partner-node partner-node--accent" : "partner-node"} delay={0.07 + index * 0.035}><span>{item}</span></Reveal>
                  {index < 5 && <Arrow />}
                </React.Fragment>
              ))}
            </div>
            <div className="partner-bottom">
              <Reveal className="integration-strip" delay={0.2}>{["API", "WEBHOOK", "POSTBACK", "SUBID", "CSV", "MANUAL"].map((item) => <Tag key={item}>{item}</Tag>)}</Reveal>
              <Reveal className="integration-callout" delay={0.23}>A INTEGRAÇÃO NÃO PODE BLOQUEAR O PRODUTO</Reveal>
            </div>
          </div>
        </section>

        <section className="deck-slide roadmap-cass-slide" aria-label="Roadmap Cass Platform">
          <div className="deck-slide__inner">
            <SlideHead>COMEÇA PELO ESSENCIAL<br /><span>CRESCE SEM REFAZER O CORE</span></SlideHead>
            <Timeline items={cassRoadmap} className="timeline--cass" />
          </div>
        </section>

        <section id="pac" className="deck-slide product-transition product-transition--pac" aria-label="Passa a Call">
          <div className="product-transition__glow" aria-hidden="true" />
          <div className="deck-slide__inner product-transition__inner">
            <Reveal><Kicker>PRODUTO 02</Kicker></Reveal>
            <Reveal delay={0.05}><h2>PASSA<br /><span>A CALL</span></h2></Reveal>
            <Reveal className="product-transition__support product-transition__support--strong" delay={0.1}>ASSISTIR VIRA PARTICIPAR</Reveal>
            <Reveal className="product-transition__micro" delay={0.14}>O viewer deixa de torcer de fora</Reveal>
          </div>
        </section>
        <section className="deck-slide pac-screen-slide" aria-label="PAC em uma tela">
          <div className="deck-slide__inner">
            <SlideHead>COMUNIDADE ENTRA<br />CASS EXECUTA<br /><span>PAC ORGANIZA</span></SlideHead>
            <div className="pac-screen-layout">
              <Reveal className="call-ui-wrap" delay={0.08}><CallInterface /></Reveal>
              <Reveal className="pac-screen-tags" delay={0.16}><Tag accent>R$ OU CASSCOIN</Tag><Tag>REGRA CONGELADA</Tag><Tag>SETTLEMENT</Tag></Reveal>
            </div>
          </div>
        </section>

        <section className="deck-slide call-flow-slide" aria-label="Como uma Call funciona">
          <div className="deck-slide__inner">
            <SlideHead>POR FORA, SIMPLES<br /><span>POR DENTRO, CONTROLADO</span></SlideHead>
            <div className="call-flow">
              {[
                ["01", "CRIA", "Cass escolhe template e regra"],
                ["02", "ENTRA", "Viewer participa com saldo"],
                ["03", "RESERVA", "Valor fica reservado"],
                ["04", "EXECUTA", "Cass conduz a Call ao vivo"],
                ["05", "DISTRIBUI", "PAC calcula resultado, fee e settlement"],
              ].map(([number, title, copy], index) => (
                <React.Fragment key={title}>
                  <Reveal className="call-flow__step" delay={0.07 + index * 0.04}><span>{number}</span><strong>{title}</strong><small>{copy}</small></Reveal>
                  {index === 2 && <Reveal className="call-flow__start" delay={0.18}><span>START</span><strong>REGRA<br />CONGELADA</strong></Reveal>}
                  {index < 4 && index !== 2 && <Arrow />}
                </React.Fragment>
              ))}
            </div>
            <Reveal className="slide-footnote" delay={0.24}>Saldo pode ficar no ecossistema para a próxima Call ou ser sacado</Reveal>
          </div>
        </section>

        <section className="deck-slide engine-slide" aria-label="Call Engine">
          <div className="deck-slide__inner">
            <SlideHead kicker="CALL ENGINE">UM ENGINE<br /><span>DIFERENTES FORMAS DE JOGAR JUNTO</span></SlideHead>
            <div className="engine-composition">
              <div className="engine-core"><span>CALL</span><strong>ENGINE</strong><i /></div>
              <div className="template-grid">
                {callTemplates.map(([number, title, headline, copy], index) => (
                  <Reveal className="template-card" delay={0.08 + index * 0.05} key={title}>
                    <span>{number}</span><small>{title}</small><strong>{headline}</strong><p>{copy}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="engine-footer" delay={0.22}><strong>MESMO ENGINE</strong><span>REGRAS DIFERENTES</span></Reveal>
          </div>
        </section>

        <section className="deck-slide distribution-new-slide" aria-label="Distribution Engine">
          <div className="deck-slide__inner">
            <SlideHead kicker="DISTRIBUTION ENGINE">
              A CALL DEFINE A EXPERIÊNCIA<br /><span>A DISTRIBUIÇÃO DEFINE COMO VOLTA</span>
            </SlideHead>
            <div className="distribution-matrix">
              <Reveal className="matrix-axis" delay={0.08}><small>CALL TEMPLATE</small><strong>×</strong><small>DISTRIBUTION STRATEGY</small></Reveal>
              <div className="strategy-cloud">
                {distributionStrategies.map((item, index) => <Reveal className={index === 2 || index === 3 || index === 4 ? "strategy-pill strategy-pill--winner" : "strategy-pill"} delay={0.1 + index * 0.03} key={item}>{item}</Reveal>)}
              </div>
            </div>
            <Reveal className="slide-footnote" delay={0.23}>Novas estratégias entram sem reescrever o core do produto</Reveal>
          </div>
        </section>

        <section className="deck-slide dashboard-slide" aria-label="Dashboard do Cass">
          <div className="deck-slide__inner">
            <div className="dashboard-slide__head">
              <SlideHead kicker="CREATOR CONTROL" support="Template, entrada, aporte, proteção, distribuição e duração">
                SEM DEV<br /><span>CASS MONTA A CALL</span>
              </SlideHead>
            </div>
            <Reveal className="creator-ui-wrap" delay={0.08}><DashboardInterface /></Reveal>
          </div>
        </section>

        <section className="deck-slide finance-architecture-slide" aria-label="Arquitetura financeira">
          <div className="deck-slide__inner">
            <SlideHead kicker="FINANCEIRO">DINHEIRO COM O PARCEIRO<br /><span>PRODUTO COM A GENTE</span></SlideHead>
            <div className="finance-layers">
              <Reveal className="finance-layer finance-layer--financial" delay={0.08}>
                <div className="finance-layer__label">FINANCIAL LAYER</div>
                <div className="finance-pair"><div><small>USUÁRIO</small><strong>CONTA + SALDO</strong></div><span>↔</span><div className="finance-pair__accent"><small>PSP / BAAS</small><strong>KYC · PIX · CUSTÓDIA · SALDO · SAQUE</strong></div></div>
              </Reveal>
              <div className="finance-bridge"><span>API / WEBHOOK</span><i /></div>
              <Reveal className="finance-layer finance-layer--product" delay={0.14}>
                <div className="finance-layer__label">PRODUCT LAYER</div>
                <div className="finance-pair"><div className="finance-pair__accent"><small>PAC</small><strong>UX · REGRAS · LEDGER LÓGICO · RESERVA · SETTLEMENT</strong></div><span>↔</span><div><small>CASS / CASA PARCEIRA</small><strong>EXECUÇÃO DA CALL</strong></div></div>
              </Reveal>
            </div>
            <Reveal className="slide-footnote" delay={0.22}>PAC não precisa custodiar dinheiro em conta própria</Reveal>
          </div>
        </section>

        <section className="deck-slide discovery-slide" aria-label="Discovery">
          <div className="deck-slide__inner">
            <SlideHead>DISCOVERY<br /><span>TAMBÉM É ENTREGA</span></SlideHead>
            <div className="discovery-triad">
              {[
                ["FINANCEIRO", ["PSP / BaaS", "Pix", "KYC", "Custódia"]],
                ["JURÍDICO", ["Fluxos", "CassCoin", "Regras", "Compliance"]],
                ["INTEGRAÇÕES", ["APIs", "Webhooks", "CSV", "Reconciliação"]],
              ].map(([title, items], index) => (
                <Reveal className="discovery-pillar" delay={0.08 + index * 0.05} key={title}>
                  <span>0{index + 1}</span><h3>{title}</h3><div>{items.map((item) => <Tag key={item}>{item}</Tag>)}</div>
                </Reveal>
              ))}
            </div>
            <Reveal className="discovery-conclusion" delay={0.22}>O PROJETO INCLUI TRANSFORMAR ESSAS INCÓGNITAS EM DECISÕES DE PRODUTO</Reveal>
          </div>
        </section>

        <section className="deck-slide roadmap-pac-slide" aria-label="Roadmap PAC">
          <div className="deck-slide__inner">
            <SlideHead>PRIMEIRO FAZ FUNCIONAR<br /><span>DEPOIS FAZ ESCALAR</span></SlideHead>
            <Timeline items={pacRoadmap} className="timeline--pac" />
            <Reveal className="optionality-paths" delay={0.23}><span>CASS EXCLUSIVE</span><i>OU</i><span>MULTI-CREATOR</span><i>OU</i><span>BET / B2B</span></Reveal>
          </div>
        </section>

        <section className="deck-slide wrap-up-slide" aria-label="Tese combinada">
          <div className="deck-slide__inner">
            <div className="wrap-up-head">
              <Reveal><h2>PRIMEIRO TRANSFORMAMOS<br />AUDIÊNCIA EM ATIVO</h2></Reveal>
              <Reveal delay={0.06}><h2 className="gradient-text">DEPOIS FAZEMOS<br />ESSE ATIVO VALER MAIS</h2></Reveal>
            </div>
            <div className="wrap-equation">
              <Reveal className="wrap-product" delay={0.1}><small>CASS PLATFORM</small><div>{["IDENTIDADE", "HÁBITO", "REWARDS", "DADOS"].map((item) => <Tag key={item}>{item}</Tag>)}</div></Reveal>
              <span className="equation-sign">+</span>
              <Reveal className="wrap-product" delay={0.14}><small>PAC</small><div>{["PARTICIPAÇÃO", "RECORRÊNCIA", "TICKET"].map((item) => <Tag key={item}>{item}</Tag>)}</div></Reveal>
              <span className="equation-sign">=</span>
              <Reveal className="wrap-result" delay={0.18}><small>RESULTADO</small><strong>INFRAESTRUTURA<br />PROPRIETÁRIA</strong></Reveal>
            </div>
          </div>
        </section>

        <section id="investimento" className="deck-slide investment-new-slide" aria-label="Investimento">
          <div className="deck-slide__inner">
            <SlideHead kicker="INVESTIMENTO">DOIS PRODUTOS<br /><span>UM PACOTE RECOMENDADO</span></SlideHead>
            <div className="offer-grid">
              <Reveal className="offer-card" delay={0.07}><small>CASS PLATFORM</small><strong>R$ 85.000</strong><span>PRODUTO 01</span></Reveal>
              <Reveal className="offer-card" delay={0.11}><small>PAC</small><strong>R$ 165.000</strong><span>PRODUTO 02</span></Reveal>
              <Reveal className="offer-card offer-card--featured" delay={0.15}><div className="recommended-badge">RECOMENDADO</div><small>CASS PLATFORM + PAC</small><strong>R$ 220.000</strong><span>ECOSSISTEMA COMPLETO</span></Reveal>
            </div>
            <Reveal className="post-launch-strip" delay={0.21}>
              <small>OPCIONAL PÓS-LANÇAMENTO</small>
              <div><span>SUPORTE / PRODUTO</span><strong>R$ 12.000 / MÊS</strong></div>
              <div><span>GROWTH / CRM</span><strong>R$ 8.000 / MÊS</strong></div>
            </Reveal>
          </div>
        </section>

        <section className="deck-slide milestones-new-slide" aria-label="Milestones">
          <div className="deck-slide__inner">
            <SlideHead>PAGAMENTO ACOMPANHA<br /><span>O PRODUTO SAINDO DO PAPEL</span></SlideHead>
            <div className="milestone-timeline">
              <div className="milestone-timeline__track"><i style={{ width: "100%" }} /></div>
              {milestones.map(([percent, title], index) => (
                <Reveal className="milestone-point" delay={0.08 + index * 0.045} key={title}><span>{percent}</span><i /><strong>{title}</strong></Reveal>
              ))}
            </div>
            <Reveal className="slide-footnote" delay={0.22}>CASS Platform primeiro · PAC como grande atualização</Reveal>
          </div>
        </section>

        <section className="deck-slide assumptions-new-slide" aria-label="Premissas comerciais">
          <div className="deck-slide__inner">
            <SlideHead kicker="PREMISSAS">O QUE O FEE CONSTRÓI<br /><span>E O QUE DEPENDE DE TERCEIROS</span></SlideHead>
            <div className="premise-grid">
              {[
                ["FINANCEIRO", "PSP/BaaS, KYC, Pix e taxas transacionais são custos externos"],
                ["JURÍDICO", "Validações e adequações regulatórias acontecem durante a implementação"],
                ["OPERAÇÃO", "Cloud, mensageria, rewards, prêmios e fornecedores não fazem parte do fee"],
                ["PARCEIROS", "Integrações profundas dependem de API, documentação e colaboração das casas"],
              ].map(([title, copy], index) => (
                <Reveal className="premise-block" delay={0.08 + index * 0.045} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="proximos" className="deck-slide next-steps-slide" aria-label="Próximos passos">
          <div className="deck-slide__inner">
            <SlideHead>DA APROVAÇÃO<br /><span>PARA O BUILD</span></SlideHead>
            <div className="next-flow">
              {[
                ["01", "APROVA", "Pacote + valores + escopo macro"],
                ["02", "KICKOFF", "Prioridades + responsáveis"],
                ["03", "DISCOVERY", "Produto + financeiro + jurídico"],
                ["04", "BUILD", "CASS Platform → PAC"],
              ].map(([number, title, copy], index) => (
                <React.Fragment key={title}>
                  <Reveal className="next-flow__step" delay={0.08 + index * 0.045}><span>{number}</span><strong>{title}</strong><small>{copy}</small></Reveal>
                  {index < 3 && <Arrow />}
                </React.Fragment>
              ))}
            </div>
            <Reveal className="next-callout" delay={0.23}>CASS PLATFORM PRIMEIRO<br /><span>PAC COMO GRANDE ATUALIZAÇÃO</span></Reveal>
          </div>
        </section>

        <section className="deck-slide closing-slide" aria-label="Encerramento">
          <div className="closing-slide__glow" aria-hidden="true" />
          <div className="deck-slide__inner closing-slide__inner">
            <Reveal><h2>A PRÓXIMA FASE<br /><span>COMEÇA AQUI</span></h2></Reveal>
            <Reveal delay={0.08}><p>cass platform + passa a call</p></Reveal>
          </div>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)