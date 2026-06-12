import { useState, useEffect, useContext, createContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProjectById, getCategoryById, getProjectsByCategory } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamsChatAnimation from '../components/TeamsChatAnimation';
import SelfServiceAnimation from '../components/SelfServiceAnimation';
import HiFiButtons from '../components/HiFiButtons';
import UserPersonas from '../components/UserPersonas';
import FlowDiagram from '../components/FlowDiagram';
import ConstraintsVisual from '../components/ConstraintsVisual';
import DesignSystemMap from '../components/DesignSystemMap';
import HiFiRAG from '../components/HiFiRAG';
import RAGProblemAnimation from '../components/RAGProblemAnimation';
import RAGImpactAnimation from '../components/RAGImpactAnimation';
import PosterContextAnimation from '../components/PosterContextAnimation';
import HiFiBioinformatics from '../components/HiFiBioinformatics';
import HiFiUCSC from '../components/HiFiUCSC';
import HiFiScikit from '../components/HiFiScikit';
import HiFiPoster from '../components/HiFiPoster';
import PosterPersonas from '../components/PosterPersonas';
import PosterWireframes from '../components/PosterWireframes';
import PosterFlowDiagram from '../components/PosterFlowDiagram';
import PosterProductAnimation from '../components/PosterProductAnimation';
import HiFiRAGChat from '../components/HiFiRAGChat';
import HeuristicEval from '../components/HeuristicEval';
import UCSCFeedback from '../components/UCSCFeedback';
import SelfServiceFeedback from '../components/SelfServiceFeedback';
import RAGFeedback from '../components/RAGFeedback';
import APOEFeedback from '../components/APOEFeedback';
import APOEProductAnimation from '../components/APOEProductAnimation';
import APOEUserFlows from '../components/APOEUserFlows';
import APOEDesignContext from '../components/APOEDesignContext';
import './CaseStudy.css';
import '../components/UserPersonas.css';

const ANIMATION_COMPONENTS = {
  TeamsChatAnimation: <TeamsChatAnimation />,
  SelfServiceAnimation: <SelfServiceAnimation />,
  HiFiButtons: <HiFiButtons />,
  UserPersonas: <UserPersonas />,
  FlowDiagram: <FlowDiagram />,
  ConstraintsVisual: <ConstraintsVisual />,
  HiFiRAG: <HiFiRAG />,
  RAGProblemAnimation: <RAGProblemAnimation />,
  RAGImpactAnimation: <RAGImpactAnimation />,
  PosterContextAnimation: <PosterContextAnimation />,
  HiFiBioinformatics: <HiFiBioinformatics />,
  HiFiUCSC: <HiFiUCSC />,
  HiFiScikit: <HiFiScikit />,
  HiFiPoster: <HiFiPoster />,
  PosterPersonas: <PosterPersonas />,
  PosterWireframes: <PosterWireframes />,
  PosterFlowDiagram: <PosterFlowDiagram />,
  PosterProductAnimation: <PosterProductAnimation />,
  HiFiRAGChat: <HiFiRAGChat />,
  HeuristicEval: <HeuristicEval />,
  UCSCFeedback: <UCSCFeedback />,
  SelfServiceFeedback: <SelfServiceFeedback />,
  RAGFeedback: <RAGFeedback />,
  APOEFeedback: <APOEFeedback />,
  APOEProductAnimation: <APOEProductAnimation />,
  APOEUserFlows: <APOEUserFlows />,
  APOEDesignContext: <APOEDesignContext />,
};

const AccentCtx = createContext(null);

const SECTION_META = {
  Product:          { icon: <IcoMap />,       color: '#1a535c', soft: '#d4eced' },
  Context:          { icon: <IcoMap />,       color: '#1a535c', soft: '#d4eced' },
  Personas:         { icon: <IcoPersona />,   color: '#1a535c', soft: '#d4eced' },
  Problem:          { icon: <IcoBreak />,     color: '#ff6b6b', soft: '#fff0f0' },
  'Design Question':{ icon: <IcoQuestion />,  color: '#c8a800', soft: '#fffce0' },
  'Design Goals':   { icon: <IcoTarget />,    color: '#c8a800', soft: '#fffce0' },
  Opportunity:      { icon: <IcoLightbulb />, color: '#c8a800', soft: '#fffce0' },
  Process:          { icon: <IcoLayers />,    color: '#4ecdc4', soft: '#d4f5f3' },
  Impact:           { icon: <IcoChart />,     color: '#2a9e96', soft: '#d0f5f3' },
  'Room for Improvement': { icon: <IcoWrench />, color: '#7c6fcf', soft: '#ede9fc' },
  'Design System':              { icon: <IcoFrame />, color: '#1a535c', soft: '#d4eced' },
  'Designing Within Constraints': { icon: <IcoFrame />, color: '#1a535c', soft: '#d4eced' },
};

function CsPersonaAvatar({ index }) {
  const isFirst = index === 0;
  const bg    = isFirst ? '#29b6f6' : '#ffb74d';
  const shirt = isFirst ? '#1976d2' : '#5c6bc0';
  return (
    <svg width="64" height="64" viewBox="0 0 48 48" className="up__avatar" aria-hidden="true">
      {/* Background circle */}
      <circle cx="24" cy="24" r="24" fill={bg} />

      {/* Neck */}
      <rect x="20" y="29" width="8" height="6" fill="#fddcae" />

      {/* Shirt / body */}
      <ellipse cx="24" cy="46" rx="15" ry="10" fill={shirt} />

      {/* Head */}
      <ellipse cx="24" cy="21" rx="10" ry="11" fill="#fddcae" />

      {/* Hair */}
      {isFirst ? (
        /* Short tidy hair — swept left */
        <g fill="#4e342e">
          {/* Cap */}
          <ellipse cx="24" cy="11.5" rx="10" ry="5.5" />
          {/* Left temple */}
          <ellipse cx="14.5" cy="14" rx="2" ry="4" />
          {/* Right temple */}
          <ellipse cx="33.5" cy="14" rx="2" ry="4" />
          {/* Slight side part sweep */}
          <path d="M14 12 Q20 8 34 11" fill="#4e342e" />
        </g>
      ) : (
        /* Longer hair falling past shoulders */
        <g fill="#2c1a0e">
          {/* Top mass */}
          <ellipse cx="24" cy="11" rx="10.5" ry="5" />
          {/* Left side fall */}
          <rect x="13" y="12" width="3.5" height="14" rx="1.8" />
          {/* Right side fall */}
          <rect x="31.5" y="12" width="3.5" height="14" rx="1.8" />
          {/* Top curve */}
          <path d="M13.5 13 Q24 6.5 34.5 13" fill="#2c1a0e" />
        </g>
      )}

      {/* Eyes — irises */}
      <ellipse cx="20.5" cy="20.5" rx="2.4" ry="2.6" fill="white" />
      <ellipse cx="27.5" cy="20.5" rx="2.4" ry="2.6" fill="white" />
      {/* Pupils */}
      <circle cx="20.8" cy="20.8" r="1.4" fill="#2c1a0e" />
      <circle cx="27.8" cy="20.8" r="1.4" fill="#2c1a0e" />
      {/* Iris colour */}
      <circle cx="20.8" cy="20.8" r="0.85" fill={isFirst ? '#1565c0' : '#5d4037'} />
      {/* Specular highlight */}
      <circle cx="21.4" cy="20.2" r="0.45" fill="white" />
      <circle cx="28.4" cy="20.2" r="0.45" fill="white" />
      {/* Upper eyelid line */}
      <path d="M18.3 19.2 Q20.5 18.2 22.7 19.2" stroke="#5a3825" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M25.3 19.2 Q27.5 18.2 29.7 19.2" stroke="#5a3825" strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* Glasses for second persona */}
      {!isFirst && (
        <g stroke="#4a3728" strokeWidth="1.1" fill="none">
          <rect x="17" y="18" width="7" height="5.5" rx="2" />
          <rect x="24" y="18" width="7" height="5.5" rx="2" />
          <line x1="13.5" y1="20.5" x2="17" y2="20.5" />
          <line x1="31" y1="20.5" x2="34.5" y2="20.5" />
          <line x1="24" y1="20.5" x2="24" y2="20.5" />
        </g>
      )}

      {/* Cheeks */}
      <ellipse cx="16" cy="24.5" rx="2.8" ry="1.8" fill={isFirst ? '#f48fb1' : '#ffcc80'} opacity="0.45" />
      <ellipse cx="32" cy="24.5" rx="2.8" ry="1.8" fill={isFirst ? '#f48fb1' : '#ffcc80'} opacity="0.45" />

      {/* Mouth */}
      <path d={isFirst ? 'M20.5 27 Q24 30.5 27.5 27' : 'M21 27 Q24 29.5 27 27'}
        stroke="#b5622a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function CaseStudy() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="case-study">
        <Navbar />
        <div className="case-study__not-found">
          <p>Project not found.</p>
          <button onClick={() => navigate('/')}>← Back home</button>
        </div>
      </div>
    );
  }

  const fromCategory = state?.fromCategory ?? project.categories[0];
  const primaryCategory = getCategoryById(fromCategory);
  const cs = project.caseStudy;
  const categoryProjects = getProjectsByCategory(fromCategory);
  const currentIndex = categoryProjects.findIndex(p => p.id === projectId);
  const prevProject = categoryProjects[currentIndex - 1] ?? null;
  const nextProject = categoryProjects[currentIndex + 1] ?? null;

  const readingTime = (() => {
    const text = [cs.product,cs.context, cs.problemState, cs.designQuestion, cs.opportunity, cs.solutionGoal, cs.impact, cs.designSystem]
      .filter(Boolean).join(' ');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  })();

  const tocSections = [
    { id: 'product',         label: 'Product',        show: !!cs.product },
    { id: 'context',         label: 'Context',        show: !!cs.context },
    { id: 'personas',        label: 'Personas',       show: cs.personas?.length > 0 },
    { id: 'problem',         label: 'Problem',        show: !!cs.problemState },
    { id: 'opportunity',     label: 'Opportunity',    show: !!cs.opportunity },
    { id: 'design-question', label: 'Design Q',       show: !!cs.designQuestion },
    { id: 'design-goals',    label: 'Design Goals',  show: cs.designGoals?.length > 0 },
    { id: 'process',         label: 'Process',        show: cs.processSteps?.length > 0 },
    { id: 'impact',          label: 'Impact',         show: !!cs.impact },
    { id: 'room-for-improvement', label: 'Improvements', show: !!cs.improvements },
  ].filter(s => s.show);

  return (
    <div className="case-study">
      <Navbar />
      <CaseTOC sections={tocSections} color={primaryCategory?.color ?? '#4ecdc4'} />

      <AccentCtx.Provider value={{ color: project.accentColor ?? primaryCategory?.color ?? '#4ecdc4', soft: project.accentSoft ?? primaryCategory?.softColor ?? '#d4f5f3' }}>
      <article className="case-study__article">
        <button
          className="case-study__back"
          onClick={() => navigate(`/projects/${fromCategory}`)}
        >
          ← Back to {primaryCategory?.label}
        </button>

        <header className="case-study__header">
          <div
            className="case-study__hero"
            style={{ '--hero-color': primaryCategory?.color ?? '#1a535c', '--hero-bg': HERO_BG[project.categories[0]] ?? '#1e2a32' }}
          >
            <HeroShapes categoryId={project.categories[0]} />
            {/* Top row: eyebrow + badge */}
            <div className="case-study__hero-top">
              <p className="case-study__hero-pre">
                <span>{project.company}</span>
                <span className="case-study__hero-sep">·</span>
                <span>{project.year}</span>
                {project.sector && (
                  <>
                    <span className="case-study__hero-sep">·</span>
                    <span>{project.sector}</span>
                  </>
                )}
              </p>
              {(project.maturity || project.evidence) && (
                <ProjectBadge maturity={project.maturity} evidence={project.evidence} />
              )}
            </div>

            {/* Two-col: text left, cover image right */}
            <div className="case-study__hero-body">
              <div className="case-study__hero-text">
                <h1 className="case-study__title serif">{project.title}</h1>
                <p className="case-study__tagline">{project.tagline}</p>

                {cs.impactHeadline && (
                  <div className="case-study__impact-hls">
                    {(Array.isArray(cs.impactHeadline) ? cs.impactHeadline : [cs.impactHeadline]).map((hl, i) => (
                      <div key={i} className="case-study__impact-hl">
                        <span className="case-study__impact-stat">{hl.stat}</span>
                        <span className="case-study__impact-ctx">{hl.context}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
            <div className="case-study__hero-meta">
              <div className="case-study__hero-col">
                <span className="case-study__hero-meta-label">Role</span>
                <span className="case-study__hero-meta-value">{project.role}</span>
                {project.roleSummary && (
                  <span className="case-study__hero-meta-sub">{project.roleSummary}</span>
                )}
              </div>
              {project.tools?.length > 0 && (
                <div className="case-study__hero-col">
                  <span className="case-study__hero-meta-label">Tools</span>
                  <div className="case-study__hero-tools">
                    {project.tools.map(tool => (
                      <span key={tool} className="case-study__tool">{tool}</span>
                    ))}
                  </div>
                </div>
              )}
              {project.links?.length > 0 && (
                <div className="case-study__hero-col">
                  <span className="case-study__hero-meta-label">Links</span>
                  <div className="case-study__hero-links">
                    {project.links.map(link => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`case-study__hero-link case-study__hero-link--${link.type ?? 'default'}`}
                      >
                        <LinkIcon type={link.type} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {cs.product && (
          <Section label={cs.productLabel || 'Product'} takeaway={cs.productTakeaway}>
            <NarrativeWithMedia text={cs.product} media={cs.productMedia} />
          </Section>
        )}

        {cs.context && (
          <Section label="Context" takeaway={cs.contextTakeaway}>
            <NarrativeWithMedia text={cs.context} media={cs.contextMedia} />
          </Section>
        )}

        {cs.personas?.length > 0 && (
          <Section label="Personas">
            <div className="up">
              <div className="up__grid">
                {cs.personas.map((p, i) => (
                  <div key={i} className="up__card" style={{ '--up-color': i === 0 ? '#1976d2' : '#5c6bc0' }}>
                    <div className="up__card-band" />
                    <div className="up__card-inner" style={{ gridTemplateColumns: '180px 1fr' }}>
                      <div className="up__card-header">
                        <CsPersonaAvatar index={i} />
                        <div className="up__card-intro">
                          <div className="up__name-row">
                            <span className="up__name">{p.role}</span>
                          </div>
                        </div>
                        {p.quote && <blockquote className="up__quote">{p.quote}</blockquote>}
                      </div>
                      <div className="up__body" style={{ gridTemplateColumns: '1fr' }}>
                        <p className="up__list-item" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6 }}>{p.need}</p>
                        {p.goals?.length > 0 && (
                          <div>
                            <span className="up__section-label up__section-label--goals">Goals</span>
                            <ul className="up__list">
                              {p.goals.map((g, j) => (
                                <li key={j} className="up__list-item up__list-item--goal">
                                  <span className="up__bullet">✓</span>{g}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {p.painPoints?.length > 0 && (
                          <div>
                            <span className="up__section-label up__section-label--pain">Pain points</span>
                            <ul className="up__list">
                              {p.painPoints.map((pp, j) => (
                                <li key={j} className="up__list-item up__list-item--pain">
                                  <span className="up__bullet">✕</span>{pp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {cs.problemState && (
          <Section label="Problem" takeaway={cs.problemTakeaway}>
            <NarrativeWithMedia text={cs.problemState} media={cs.problemMedia} />
          </Section>
        )}

        {cs.opportunity && (
          <Section label="Opportunity" takeaway={cs.opportunityTakeaway}>
            <NarrativeWithMedia text={cs.opportunity} media={cs.opportunityMedia} />
          </Section>
        )}

        {cs.designQuestion && (
          <Section label="Design Question" takeaway={cs.designQuestionTakeaway}>
            <NarrativeWithMedia text={cs.designQuestion} media={cs.designQuestionMedia} />
          </Section>
        )}

        {cs.designGoals?.length > 0 && (
          <Section label="Design Goals">
            <ul className="cs-design-goals">
              {cs.designGoals.map((g, i) => (
                <li key={i} className="cs-design-goals__item">
                  <span className="cs-design-goals__num">{i + 1}</span>
                  {g}
                </li>
              ))}
            </ul>
            {cs.designGoalsMedia && <NarrativeWithMedia text=" " media={cs.designGoalsMedia} />}
          </Section>
        )}
            {/* {cs.processSteps?.length > 0 && (
            <>
              <p className="cs-process__ref">
              See the full design loop →{' '}
              <button className="cs-process__ref-link" onClick={() => navigate('/about')}>
                How I Work
              </button>
              </p>
              <ProcessSteps steps={cs.processSteps} />

            </>
          )} */}

        {cs.processSteps?.length > 0 && (
          <Section label="Process">
            <ProcessSteps
              steps={cs.processSteps}
              designSystem={cs.designSystem}
              designSystemMap={cs.designSystemMap}
              designSystemLabel={cs.designSystemLabel}
              designSystemMedia={cs.designSystemMedia}
            />
          </Section>
        )}

        {(cs.impact || cs.goalsMet?.length > 0) && (
          <Section label="Impact" takeaway={cs.impactTakeaway}>
            <NarrativeWithMedia text={cs.impact} media={cs.impactMedia} />
            {cs.goalsMet?.length > 0 && (
              <div className="cs-goals-met">
                <span className="cs-goals-met__heading">Goals met</span>
                <ul className="cs-goals-met__list">
                  {cs.goalsMet.map((g, i) => (
                    <li key={i} className="cs-goals-met__item">
                      <span className="cs-goals-met__tick">✓</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {cs.improvements && (
          <Section label="Room for Improvement">
            <p className="cs-improvements">{cs.improvements}</p>
          </Section>
        )}

        <nav className="cs-nav">
          {prevProject ? (
            <button className="cs-nav__btn cs-nav__btn--prev" onClick={() => navigate(`/case-study/${prevProject.id}`, { state: { fromCategory } })}>
              <span className="cs-nav__dir">← Previous</span>
              <span className="cs-nav__title">{prevProject.title}</span>
            </button>
          ) : <span />}
          {nextProject ? (
            <button className="cs-nav__btn cs-nav__btn--next" onClick={() => navigate(`/case-study/${nextProject.id}`, { state: { fromCategory } })}>
              <span className="cs-nav__dir">Next →</span>
              <span className="cs-nav__title">{nextProject.title}</span>
            </button>
          ) : <span />}
        </nav>
      </article>
      </AccentCtx.Provider>

      <Footer />
    </div>
  );
}

/* ── Case study TOC ─────────────────────────────────────── */
function CaseTOC({ sections, color }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      entries => {
        // pick the topmost intersecting section
        const hitting = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (hitting.length) setActive(hitting[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="cs-toc" aria-label="Page sections">
      <div className="cs-toc__track">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={`cs-toc__item${active === s.id ? ' cs-toc__item--active' : ''}`}
            style={{ '--toc-color': color }}
            onClick={() => scrollTo(s.id)}
            title={s.label}
          >
            <span className="cs-toc__label">{s.label}</span>
            <span className="cs-toc__dot" />
            {i < sections.length - 1 && <span className="cs-toc__line" />}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Section({ label, children, takeaway }) {
  const accent = useContext(AccentCtx);
  const baseMeta = SECTION_META[label] ?? { icon: null, color: '#A09890', soft: '#F0EEE9' };
  const meta = { ...baseMeta, color: accent?.color ?? baseMeta.color, soft: accent?.soft ?? baseMeta.soft };
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <section className="cs-section" id={id}>
      <div className="cs-section__heading">
        <div className="cs-section__icon" style={{ background: meta.soft, color: meta.color }} aria-hidden="true">
          {meta.icon}
        </div>
        <span className="cs-section__label" style={{ color: meta.color }}>{label}</span>
      </div>
      <div className="cs-section__body">
        {children}
        {takeaway && <blockquote className="cs-takeaway">{takeaway}</blockquote>}
      </div>
    </section>
  );
}

function NarrativeText({ children }) {
  if (!children) return null;
  return <p className="cs-narrative">{children}</p>;
}

function NarrativeWithMedia({ text, media }) {
  if (!text) return null;
  if (!media) return <NarrativeText>{text}</NarrativeText>;

  const raw = Array.isArray(media) ? media : [media];
  const items = raw
    .map(item => typeof item === 'string' ? { caption: item } : item)
    .filter(item => item && (item.src || item.video || item.caption || item.component || item.type === 'feedback'));

  if (!items.length) return <NarrativeText>{text}</NarrativeText>;

  // Animation components always render stacked (full width), not split
  const isAnimation = items.some(item => item?.component);
  if (isAnimation) {
    return (
      <>
        <NarrativeText>{text}</NarrativeText>
        <MediaBlock media={media} />
      </>
    );
  }

  const isBleed = items.some(item => item?.bleed);

  if (isBleed) {
    return (
      <>
        <NarrativeText>{text}</NarrativeText>
        <MediaBlock media={media} bleed />
      </>
    );
  }

  // 2-column grid below text (e.g. side-by-side videos)
  const isBelow2Col = items.length >= 2 && items.every(item => item?.belowGrid);
  if (isBelow2Col) {
    return (
      <>
        <NarrativeText>{text}</NarrativeText>
        <div className="cs-below-grid">
          {items.map((item, i) => (
            <MediaBlock key={i} media={item} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="cs-split">
      <NarrativeText>{text}</NarrativeText>
      <div className="cs-split__media">
        <MediaBlock media={media} />
      </div>
    </div>
  );
}

const SOLUTION_COLORS = [
  { bg: '#d4f5f3', stroke: '#4ecdc4', text: '#4ecdc4' },
  { bg: '#fffce0', stroke: '#c8a800', text: '#c8a800' },
  { bg: '#fff0f0', stroke: '#ff6b6b', text: '#ff6b6b' },
];

function SolutionSteps({ goal, goalMedia, steps, stepsMedia, execute, executeMedia }) {
  const [open, setOpen] = useState({});
  const toggle = (label) => setOpen(o => ({ ...o, [label]: !o[label] }));

  const data = [
    { label: 'Goal',      sub: 'What we set out to achieve', text: goal,    media: goalMedia,    collapsible: false },
    { label: 'Approach',  sub: 'How we structured the work',  text: steps,   media: stepsMedia,   collapsible: true  },
    { label: 'Execution', sub: 'What we actually built',      text: execute, media: executeMedia, collapsible: true  },
  ];

  return (
    <ol className="cs-solution__list">
      {data.map((item, i) => {
        if (!item.text && !item.media) return null;
        const col = SOLUTION_COLORS[i];
        const isOpen = !item.collapsible || !!open[item.label];
        return (
          <li key={item.label} className="cs-solution__item">
            <div
              className="cs-solution__dot"
              style={{ background: col.bg, borderColor: col.stroke, color: col.text }}
            >
              {i + 1}
            </div>
            <div className="cs-solution__content">
              <div
                className={`cs-solution__header${item.collapsible ? ' cs-solution__header--toggle' : ''}`}
                onClick={item.collapsible ? () => toggle(item.label) : undefined}
              >
                <div className="cs-solution__header-text">
                  <span className="cs-solution__label">{item.label}</span>
                  <span className="cs-solution__sub">{item.sub}</span>
                </div>
                {item.collapsible && (
                  <div className="cs-solution__chevron-wrap">
                    {!isOpen && <span className="cs-solution__expand-hint">expand</span>}
                    <span className={`cs-solution__chevron${isOpen ? ' cs-solution__chevron--open' : ''}`}>›</span>
                  </div>
                )}
              </div>
              {isOpen && item.text && (
                Array.isArray(item.text)
                  ? (
                    <ul className="cs-solution__bullets">
                      {item.text.map((t, j) =>
                        typeof t === 'object' && t.label
                          ? (
                            <li key={j} className="cs-solution__bullets-group">
                              <span className="cs-solution__bullets-label">{t.label}</span>
                              <ul className="cs-solution__bullets cs-solution__bullets--sub">
                                {t.items.map((sub, k) => <li key={k}>{sub}</li>)}
                              </ul>
                            </li>
                          )
                          : <li key={j}>{t}</li>
                      )}
                    </ul>
                  )
                  : <p className="cs-solution__text">{item.text}</p>
              )}
              {isOpen && item.media && <div className="cs-process__media"><MediaBlock media={item.media} /></div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const STEP_COLORS = [
  { bg: '#f3e8ff', stroke: '#7c3aed', text: '#7c3aed' },  // 0 Heuristic Evaluation
  { bg: '#fff0f0', stroke: '#ff6b6b', text: '#ff6b6b' },  // 1 User Flows
  { bg: '#fffce0', stroke: '#c8a800', text: '#c8a800' },  // 2 Design Goals
  { bg: '#d4f5f3', stroke: '#4ecdc4', text: '#4ecdc4' },  // 3 Wireframes
  { bg: '#F0EBE0', stroke: '#8A857E', text: '#3A3530'  },  // 4 Vibe Coding
  { bg: '#fffce0', stroke: '#c8a800', text: '#c8a800'  },  // 5 Design Decisions
  { bg: '#fff0f0', stroke: '#ff6b6b', text: '#ff6b6b'  },  // 6 Prototype
  { bg: '#d4f5f3', stroke: '#4ecdc4', text: '#4ecdc4'  },  // 7 Handoff & Ship
  { bg: '#F0EBE0', stroke: '#8A857E', text: '#3A3530'  },  // 8 Feedback & Iteration
];

const STEP_ORDER = [
  'Heuristic Evaluation',
  'User Flows',
  'Design Goals',
  'Wireframes',
  'Vibe Coding',
  'Design Decisions',
  'Prototype',
  'Handoff & Ship',
  'Feedback & Iteration',
];

function ProcessSteps({ steps, designSystem, designSystemMap, designSystemLabel, designSystemMedia }) {
  const accent = useContext(AccentCtx);
  const hasDesignSystem = designSystem || designSystemMap || designSystemMedia;
  return (
    <div className="cs-process">
      <ol className="cs-process__list">
        {steps.map((s, i) => {
          const globalIdx = STEP_ORDER.indexOf(s.step);
          const col = accent
            ? { bg: accent.soft, stroke: accent.color, text: accent.color }
            : STEP_COLORS[globalIdx >= 0 ? globalIdx : i % STEP_COLORS.length];  // fallback (unused when accent always set)
          return (
            <li key={s.step} className="cs-process__item">
              <div
                className="cs-process__dot"
                style={{ background: col.bg, borderColor: col.stroke, color: col.text }}
              >
                {i + 1}
              </div>
              <div className="cs-process__content">
                <span className="cs-process__step">{s.step}</span>
                {s.notes && (
                  Array.isArray(s.notes)
                    ? (
                      <ul className="cs-process__bullets">
                        {s.notes.map((n, k) =>
                          typeof n === 'object' && n.label
                            ? (
                              <li key={k} className="cs-process__bullets-group">
                                <span className="cs-process__bullets-label">{n.label}</span>
                                <ul className="cs-process__bullets cs-process__bullets--sub">
                                  {n.items.map((sub, m) => <li key={m}>{sub}</li>)}
                                </ul>
                              </li>
                            )
                            : <li key={k}>{n}</li>
                        )}
                      </ul>
                    )
                    : <p className="cs-process__notes">{s.notes}</p>
                )}
                {s.link && (
                  <a className="cs-process__link" href={s.link.url} target="_blank" rel="noopener noreferrer">
                    {s.link.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                {s.designSystemMap && <DesignSystemMap data={s.designSystemMap} />}
                {s.media && <div className="cs-process__media"><MediaBlock media={s.media} /></div>}
              </div>
            </li>
          );
        })}

        {/* Design system / constraints — appended as a final step */}
        {hasDesignSystem && (
          <li className="cs-process__item cs-process__item--system">
            <div
              className="cs-process__dot"
              style={{ background: '#F0EBE0', borderColor: '#8A857E', color: '#3A3530' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div className="cs-process__content">
              <span className="cs-process__step">{designSystemLabel ?? 'Design System'}</span>
              {designSystem && <p className="cs-process__notes">{designSystem}</p>}
              {designSystemMap && <DesignSystemMap data={designSystemMap} />}
              {designSystemMedia && <div className="cs-process__media"><MediaBlock media={designSystemMedia} /></div>}
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}

function MediaBlock({ media, bleed }) {
  if (!media) return null;

  // Normalize: string → { caption }, object → [object], array stays
  const raw = Array.isArray(media) ? media : [media];
  const items = raw
    .map(item => typeof item === 'string' ? { caption: item } : item)
    .filter(item => item && (item.src || item.video || item.caption || item.component || item.type === 'feedback' || item.type === 'ideation-concepts' || item.type === 'pros-cons' || item.type === 'decision'));

  if (!items.length) return null;

  return (
    <>
      {items.map((item, i) => {
        const isBleed = bleed || item.bleed;
        const figClass = `cs-media${isBleed ? ' cs-media--bleed' : ''}`;
        if (item.component) {
          const el = ANIMATION_COMPONENTS[item.component];
          if (!el) return null;
          return (
            <figure key={i} className={figClass}>
              {el}
              {item.caption && <figcaption className="cs-media__caption">{item.caption}</figcaption>}
            </figure>
          );
        }
        if (item.type === 'feedback') {
          return (
            <div key={i} className="cs-media-feedback">
              <span className="cs-media-feedback__label">{item.label}</span>
              <ul className="cs-media-feedback__list">
                {item.items.map((pt, j) => (
                  <li key={j} className="cs-media-feedback__item">
                    <span className="cs-media-feedback__dot">✕</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (item.type === 'embed') {
          return (
            <figure key={i} className={`${figClass} cs-media--embed`}>
              <iframe
                src={item.url}
                title={item.caption || 'Embedded site'}
                className="cs-media__embed"
                loading="lazy"
                allowFullScreen
              />
              {item.caption && <figcaption className="cs-media__caption">{item.caption}</figcaption>}
            </figure>
          );
        }
        if (item.type === 'ideation-concepts') {
          return (
            <div key={i} className="cs-ideation">
              {item.concepts.map((c, j) => (
                <div key={j} className="cs-ideation__card">
                  <IdeationIcon type={c.icon} />
                  <span className="cs-ideation__num">0{j + 1}</span>
                  <strong className="cs-ideation__title">{c.title}</strong>
                  <p className="cs-ideation__desc">{c.description}</p>
                </div>
              ))}
            </div>
          );
        }
        if (item.type === 'decision') {
          return (
            <div key={i} className="cs-decision">
              <div className="cs-decision__header">
                <span className="cs-decision__label">Decision</span>
                <strong className="cs-decision__chosen">{item.chosen}</strong>
              </div>
              <ul className="cs-decision__reasons">
                {item.reasons.map((r, k) => (
                  <li key={k} className="cs-decision__reason">
                    <span className="cs-decision__check">✓</span>{r}
                  </li>
                ))}
              </ul>
              {item.caveat && (
                <p className="cs-decision__caveat">{item.caveat}</p>
              )}
            </div>
          );
        }
        if (item.type === 'pros-cons') {
          return (
            <div key={i} className="cs-pros-cons">
              {item.items.map((c, j) => (
                <div key={j} className="cs-pros-cons__col">
                  <strong className="cs-pros-cons__title">{c.title}</strong>
                  <div className="cs-pros-cons__section">
                    <span className="cs-pros-cons__label cs-pros-cons__label--pro">Pros</span>
                    <ul className="cs-pros-cons__list">
                      {c.pros.map((p, k) => <li key={k} className="cs-pros-cons__item cs-pros-cons__item--pro">✓ {p}</li>)}
                    </ul>
                  </div>
                  <div className="cs-pros-cons__section">
                    <span className="cs-pros-cons__label cs-pros-cons__label--con">Cons</span>
                    <ul className="cs-pros-cons__list">
                      {c.cons.map((c2, k) => <li key={k} className="cs-pros-cons__item cs-pros-cons__item--con">✕ {c2}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (item.video) {
          return (
            <figure key={i} className={figClass}>
              <video
                src={item.video}
                className="cs-media__video"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
              {item.caption && <figcaption className="cs-media__caption">{item.caption}</figcaption>}
            </figure>
          );
        }
        return (
          <figure key={i} className={figClass} >
            {item.src
              ? <img src={`${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`} alt={item.caption || ''} className="cs-media__img" />
              : <div className="cs-media__box" aria-hidden="true" />
            }
            {item.caption && <figcaption className="cs-media__caption">{item.caption}</figcaption>}
          </figure>
        );
      })}
    </>
  );
}

/* ── Project badge ──────────────────────────────────────── */
const MATURITY_META = {
  'Deployed Solution':       { dotClass: 'dot--green',  tip: 'Built, launched and inuse' },
  'Prototyped Solution': { dotClass: 'dot--amber',  tip: 'Functionality tested by users' },
  'Concept Exploration':   { dotClass: 'dot--teal',  tip: 'Idea turned into a design concept' },
};

const EVIDENCE_META = {
  'Validated Impact': 'Used by real teams with measurable outcomes',
  'Observed Impact':  'Known to be in use, but no hard metrics captured',
  'Tested Concept':  'Prototype  feedback recieved',
  'Untested Concept ': 'Prototype with no feedback yet',
};

function ProjectBadge({ maturity, evidence }) {
  const m = MATURITY_META[maturity] ?? { dotClass: 'dot--slate', tip: '' };

  return (
    <span className="cs-project-badge">
      <span className={`cs-project-badge__dot ${m.dotClass}`} />
      <span className="cs-project-badge__maturity">{maturity}</span>
      <span className="cs-project-badge__sep">·</span>
      <span className="cs-project-badge__evidence">{evidence}</span>
      <span className="cs-project-badge__info" aria-hidden="true">
        ?
        <span className="cs-project-badge__tooltip">
          <strong>{maturity}</strong><br />{m.tip}<br /><br />
          <strong>{evidence}</strong><br />{EVIDENCE_META[evidence]}
        </span>
      </span>
    </span>
  );
}

/* ── Per-category hero backgrounds ─────────────────────── */
const HERO_BG = {
  'learning':      '#2a1a1a',  // deep red-brown
  'exploration':   '#0f2525',  // deep teal
  'data-retrieval':'#1e0d3a',  // deep purple
};

/* ── Per-category decorative shapes ────────────────────── */
function HeroShapes({ categoryId }) {
  const shapes = {
    'learning': (
      // Triangles + broken circle — complexity becoming clarity
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="680,20 760,160 600,160" fill="none" stroke="rgba(255,107,107,0.18)" strokeWidth="1.5"/>
        <polygon points="700,50 750,140 650,140" fill="none" stroke="rgba(255,107,107,0.1)" strokeWidth="1"/>
        <circle cx="120" cy="220" r="100" fill="none" stroke="rgba(255,107,107,0.12)" strokeWidth="1.5" strokeDasharray="8 6"/>
        <circle cx="120" cy="220" r="60"  fill="none" stroke="rgba(255,107,107,0.08)" strokeWidth="1"/>
        <line x1="400" y1="0" x2="380" y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <polygon points="420,200 480,270 360,270" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </svg>
    ),
    'exploration': (
      // Hexagons — connected cells
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="680,40 720,110 680,180 600,180 560,110 600,40" fill="none" stroke="rgba(78,205,196,0.2)" strokeWidth="1.5"/>
        <polygon points="660,65 692,120 660,175 596,175 564,120 596,65" fill="none" stroke="rgba(78,205,196,0.08)" strokeWidth="1"/>
        <polygon points="100,60 130,110 100,160 40,160 10,110 40,60" fill="none" stroke="rgba(78,205,196,0.14)" strokeWidth="1.5"/>
        <circle cx="400" cy="260" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="130" y1="110" x2="560" y2="110" stroke="rgba(78,205,196,0.06)" strokeWidth="1" strokeDasharray="6 8"/>
      </svg>
    ),
    'data-retrieval': (
      // Concentric target rings — decision focus
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="700" cy="140" r="130" fill="none" stroke="rgba(26,83,92,0.5)" strokeWidth="1.5"/>
        <circle cx="700" cy="140" r="90"  fill="none" stroke="rgba(78,205,196,0.18)" strokeWidth="1.5"/>
        <circle cx="700" cy="140" r="52"  fill="none" stroke="rgba(78,205,196,0.25)" strokeWidth="1"/>
        <circle cx="700" cy="140" r="22"  fill="none" stroke="rgba(78,205,196,0.35)" strokeWidth="1"/>
        <line x1="570" y1="140" x2="0" y2="140" stroke="rgba(78,205,196,0.06)" strokeWidth="1"/>
        <rect x="40" y="40" width="80" height="80" rx="8" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" transform="rotate(12 80 80)"/>
      </svg>
    ),
    'scalability': (
      // Grid dots + expanding squares — growth
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        {[0,1,2,3,4,5].map(col => [0,1,2,3].map(row => (
          <circle key={`${col}-${row}`} cx={580 + col * 40} cy={40 + row * 60} r="2.5" fill="rgba(200,168,0,0.2)"/>
        )))}
        <rect x="60"  y="60"  width="60"  height="60"  rx="6" fill="none" stroke="rgba(200,168,0,0.2)" strokeWidth="1.5"/>
        <rect x="40"  y="40"  width="100" height="100" rx="10" fill="none" stroke="rgba(200,168,0,0.1)" strokeWidth="1"/>
        <rect x="20"  y="20"  width="140" height="140" rx="14" fill="none" stroke="rgba(200,168,0,0.06)" strokeWidth="1"/>
        <circle cx="700" cy="230" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      </svg>
    ),
    'streamlining': (
      // Flowing parallel lines + arrow — smooth flow
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        {[0,1,2,3,4].map(i => (
          <path key={i} d={`M0 ${60 + i*36} Q200 ${40 + i*36} 400 ${60 + i*36} Q600 ${80 + i*36} 800 ${60 + i*36}`}
            fill="none" stroke="rgba(42,158,150,0.12)" strokeWidth="1.2"/>
        ))}
        <circle cx="680" cy="80"  r="70" fill="none" stroke="rgba(42,158,150,0.15)" strokeWidth="1.5"/>
        <circle cx="680" cy="80"  r="40" fill="none" stroke="rgba(42,158,150,0.1)"  strokeWidth="1"/>
        <polygon points="730,20 800,80 730,140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </svg>
    ),
    'user-centric-solutions': (
      // Organic rounded shapes — human-centred
      <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="680" cy="80"  r="110" fill="none" stroke="rgba(224,85,85,0.16)" strokeWidth="1.5"/>
        <circle cx="680" cy="80"  r="70"  fill="none" stroke="rgba(224,85,85,0.1)"  strokeWidth="1"/>
        <circle cx="100" cy="200" r="80"  fill="none" stroke="rgba(224,85,85,0.12)" strokeWidth="1.5" strokeDasharray="10 6"/>
        <ellipse cx="400" cy="260" rx="120" ry="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <circle cx="420" cy="100" r="30"  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </svg>
    ),
  };

  const svg = shapes[categoryId] ?? shapes['exploration'];

  return (
    <span className="case-study__hero-shapes" aria-hidden="true">
      {svg}
    </span>
  );
}

/* ── Link icon ──────────────────────────────────────────── */
function IdeationIcon({ type }) {
  if (!type) return null;
  return (
    <img
      src={`${import.meta.env.BASE_URL}${type}.png`}
      alt={type}
      className="cs-ideation__icon"
    />
  );
}

function LinkIcon({ type }) {
  if (type === 'figma') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z"/>
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z"/>
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z"/>
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"/>
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
    </svg>
  );
  if (type === 'github') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.26 2.87.13 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
  if (type === 'live') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  );
  // default: external link arrow
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9"/>
      <path d="M11 2h3v3"/>
      <line x1="8" y1="8" x2="14" y2="2"/>
    </svg>
  );
}

/* ── Section icons ──────────────────────────────────────── */

/// Design Question — question mark: "what are we solving"
function IcoQuestion() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function IcoTarget() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function IcoWrench() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function IcoPersona() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

// Context — map/location pin: "where we are"
function IcoMap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}

// Problem — broken link: "something is broken"
function IcoBreak() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      <line x1="12" y1="2" x2="12" y2="5"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
  );
}

// Opportunity — lightbulb: "an idea emerges"
function IcoLightbulb() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.2 4.15-3 5.19V17H9v-2.81A6 6 0 0112 3z"/>
      <line x1="9" y1="21" x2="15" y2="21"/>
    </svg>
  );
}

// Process — layers stack: "building the answer"
function IcoLayers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}

// Impact — bar chart going up: "the result"
function IcoChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  );
}

// Design System — frame corners: "the structure beneath"
function IcoFrame() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 8V5h3"/>
      <path d="M21 8V5h-3"/>
      <path d="M3 16v3h3"/>
      <path d="M21 16v3h-3"/>
      <rect x="8" y="8" width="8" height="8" rx="1"/>
    </svg>
  );
}
