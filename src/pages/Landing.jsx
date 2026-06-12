import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllProjects } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import profileImg from '../assets/prof.png';
import './Landing.css';

const CREDS = [
  { label: 'AWS Certified Cloud Practitioner (In Progress)',            accent: '#FF9900' },
  { label: 'AI Developer Professional Certificate',                     accent: '#7c3aed' },
  { label: 'Full Stack Software Developer Professional Certificate',    accent: '#1e6091' },
  { label: 'Masters of Science in Bioinformatics',                      accent: null },
  { label: 'Bachelor of Science in Microbiology & Minor in Chemistry',                            accent: null },
];

const CRED_ROWS = [
  [CREDS[3], CREDS[4]], // degrees
  [CREDS[0]],           // AWS
  [CREDS[1], CREDS[2]], // certificates
];

function CredChip({ label }) {
  return <span className="cred-chip">{label}</span>;
}

function CredSep() {
  return <span className="cred-sep" aria-hidden="true">·</span>;
}

const CAT_META = {
  'data-retrieval': { label: 'Retrieve — tools for accessing and querying genetic data' },
  'exploration':    { label: 'Explore — interfaces for navigating complex datasets' },
  'learning':       { label: 'Communicate — products that translate science for broader audiences' },
};

const BIO_TECHS = [
  { label: 'RNA-Seq',           projectId: 'wes-wgs' },
  { label: 'Single Cell RNA-seq', projectId: 'single-cell-rna-seq' },
  { label: 'CRISPR',              projectId: 'crispr' },
  { label: 'Phylogenetics',       projectId: 'phylogenetics' },
  { label: 'Protein Modelling',   projectId: 'protein-modelling' },
  { label: 'qPCR / dPCR',        projectId: 'qpcr-dpcr' },
];

const MEDIUMS = [
  {
    id:    'bioinformatics',
    word:  'Bioinformatics',
    color: '#1e6091',
    popup: 'The application of computational methods to analyze and interpret genetic data — from sequencing genomes to modeling proteins and profiling gene expression across conditions.',
  },
  {
    id:    'software',
    word:  'Software',
    color: '#7c3aed',
    popup: 'Building the interfaces and applications that help researchers interact with, navigate, and extract meaning from complex genetic datasets.',
  },
  {
    id:    'storytelling',
    word:  'Storytelling',
    color: '#c2410c',
    popup: 'Translating dense genetic concepts into accessible visual and narrative formats — through illustration, animation, and science communication.',
  },
];

function IconInstagram() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/>
    </svg>
  );
}

function IconSpotify() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [activePopup, setActivePopup]     = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openCats, setOpenCats]           = useState({});

  const allProjects = getAllProjects().filter(p => !p.comingSoon);
  const projectsByCat = {
    'data-retrieval': allProjects.filter(p => p.categories.includes('data-retrieval')),
    'exploration':    allProjects.filter(p => p.categories.includes('exploration')),
    'learning':       allProjects.filter(p => p.categories.includes('learning')),
  };

  function toggleCat(catId) {
    setOpenCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  }

  function togglePopup(id, e) {
    e.stopPropagation();
    setActivePopup(prev => prev === id ? null : id);
  }

  function toggleAccordion(id) {
    setOpenAccordion(prev => prev === id ? null : id);
  }

  return (
    <div className="landing" onClick={() => setActivePopup(null)}>
      <Navbar />
      <main className="landing__main">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero__left">
            <span className="hero__otw">
              <span className="hero__otw-dot" />
              Open to Work
            </span>
            <h1 className="hero__headline">
              Building tools and experiences to decipher our genes faster.
            </h1>
            <p className="hero__sub">
              My experiences span across molecular diagnostics, neurodegeneration disease research, and microbiology.
            </p>
            <div className="hero__ctas">
              <button className="hero__cta hero__cta--primary" onClick={() => navigate('/projects')}>
                Explore Work
              </button>
              <button className="hero__cta hero__cta--ghost" onClick={() => navigate('/about')}>
                About Me
              </button>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero__photo-wrap">
              <img src={profileImg} alt="Manasa Rapuru" className="hero__photo" />
              <span className="hero__float-tag hero__float-tag--1" style={{ '--tag-color': '#4c1d95' }}>Scientific Software Developer</span>
              <span className="hero__float-tag hero__float-tag--2" style={{ '--tag-color': '#1e6091' }}>Bioinformatician</span>
              <span className="hero__float-tag hero__float-tag--3" style={{ '--tag-color': '#c2410c' }}>Animator</span>
              <span className="hero__float-tag hero__float-tag--4" style={{ '--tag-color': '#c2410c' }}>Storyteller</span>
            </div>
          </div>
        </section>

        {/* ── Credentials strip ── */}
        <div className="cred-strip">
          {/* Desktop: 3 centered rows */}
          <div className="cred-strip__static">
            {CRED_ROWS.map((row, ri) => (
              <div key={ri} className="cred-strip__row">
                {row.map((c, i) => (
                  <span key={c.label} className="cred-strip__item">
                    <CredChip label={c.label} />
                    {i < row.length - 1 && <CredSep />}
                  </span>
                ))}
              </div>
            ))}
          </div>
          {/* Mobile: infinite marquee — separator after every item for seamless loop */}
          <div className="cred-strip__marquee" aria-hidden="true">
            <div className="cred-strip__track">
              {[...CREDS, ...CREDS].map((c, i) => (
                <span key={i} className="cred-strip__item">
                  <CredChip label={c.label} />
                  <CredSep />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Thesis ── */}
        <div className="thesis">
          <p className="thesis__text">
            The challenges in modern biology rarely fit within a single discipline. Progress emerges through collaboration between scientists, engineers, computational researchers, clinicians, educators, designers, and communicators, each contributing a different perspective. Inspired by this interdisciplinary nature, I pursued a path that combines bioinformatics, software development, and storytelling to help make complex genetic information more accessible and actionable.
          </p>
        </div>

        {/* ── Mediums + Tree (desktop) ── */}
        <section className="mediums-section" onClick={e => e.stopPropagation()}>
          <p className="mediums-section__label">THE MEDIUMS</p>

          {/* Desktop tree */}
          <div className="med-tree">
            {/* Bioinformatics */}
            <div className="med-col">
              <div className="med-col__top">
                <button
                  className={`med-word${activePopup === 'bioinformatics' ? ' med-word--active' : ''}`}
                  style={{ '--med-color': '#1e6091' }}
                  onClick={e => togglePopup('bioinformatics', e)}
                >
                  Bioinformatics Analysis
                  <span className="med-word__hint">tap to learn</span>
                </button>
                <div className={`med-popup${activePopup === 'bioinformatics' ? ' med-popup--show' : ''}`}>
                  {MEDIUMS[0].popup}
                </div>
              </div>
              <div className="med-col__connector" style={{ '--med-color': '#1e6091' }} />
              <div className="med-col__branches">
                {BIO_TECHS.map(tech => (
                  <button key={tech.label} className="med-tag" style={{ '--med-color': '#1e6091' }} onClick={() => navigate(`/case-study/${tech.projectId}`)}>
                    {tech.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Software */}
            <div className="med-col">
              <div className="med-col__top">
                <button
                  className={`med-word${activePopup === 'software' ? ' med-word--active' : ''}`}
                  style={{ '--med-color': '#475569' }}
                  onClick={e => togglePopup('software', e)}
                >
                  Scientific Software Development
                  <span className="med-word__hint">tap to learn</span>
                </button>
                <div className={`med-popup${activePopup === 'software' ? ' med-popup--show' : ''}`}>
                  {MEDIUMS[1].popup}
                </div>
              </div>
              <div className="med-col__connector" style={{ '--med-color': '#475569' }} />
              <div className="med-col__branches med-col__branches--projects">
                {Object.entries(CAT_META).map(([catId, cat]) => (
                  <div key={catId} className="cat-group">
                    <button
                      className="cat-group__pill"
                      onClick={() => toggleCat(catId)}
                    >
                      <span>{cat.label}</span>
                      <span className="cat-group__count">{projectsByCat[catId].length}</span>
                      <span className="cat-group__arrow">{openCats[catId] ? '↑' : '↓'}</span>
                    </button>
                    {openCats[catId] && (
                      <div className="cat-group__projects">
                        {projectsByCat[catId].map(p => (
                          <button
                            key={p.id}
                            className="med-project"
                            style={{ '--med-color': '#475569' }}
                            onClick={() => navigate(`/case-study/${p.id}`)}
                          >
                            <span className="med-project__title">{p.title}</span>
                            <span className="med-project__tagline">{p.tagline || p.caseStudy?.product}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Storytelling */}
            <div className="med-col">
              <div className="med-col__top">
                <button
                  className={`med-word${activePopup === 'storytelling' ? ' med-word--active' : ''}`}
                  style={{ '--med-color': '#be185d' }}
                  onClick={e => togglePopup('storytelling', e)}
                >
                  Narrative & Visual Storytelling
                  <span className="med-word__hint">tap to learn</span>
                </button>
                <div className={`med-popup${activePopup === 'storytelling' ? ' med-popup--show' : ''}`}>
                  {MEDIUMS[2].popup}
                </div>
              </div>
              <div className="med-col__connector" style={{ '--med-color': '#be185d' }} />
              <div className="med-col__branches">
                <span className="med-tag med-tag--muted" style={{ '--med-color': '#be185d' }}>
                  Art &amp; Illustration
                  <IconInstagram /><IconTikTok />
                </span>
                <span className="med-tag med-tag--muted" style={{ '--med-color': '#be185d' }}>
                  Podcast
                  <span className="med-tag__soon">soon</span>
                  <IconSpotify />
                </span>
                <span className="med-tag med-tag--muted" style={{ '--med-color': '#be185d' }}>
                  Newsletter
                  <IconLinkedIn />
                </span>
              </div>
            </div>
          </div>

          {/* Mobile accordion */}
          <div className="med-accordion">
            {MEDIUMS.map((m, i) => {
              const isOpen = openAccordion === m.id;
              return (
                <div key={m.id} className={`acc-row${isOpen ? ' acc-row--open' : ''}`} style={{ '--med-color': m.color }}>
                  <button className="acc-row__header" onClick={() => toggleAccordion(m.id)}>
                    <span className="acc-row__word">{m.word}</span>
                    <span className="acc-row__arrow">{isOpen ? '↑' : '↓'}</span>
                  </button>
                  {isOpen && (
                    <div className="acc-row__body">
                      <p className="acc-row__popup">{m.popup}</p>
                      <div className="acc-row__branches">
                        {i === 0 && BIO_TECHS.map(tech => (
                          <button key={tech.label} className="med-tag" style={{ '--med-color': m.color }} onClick={() => navigate(`/case-study/${tech.projectId}`)}>{tech.label}</button>
                        ))}
                        {i === 1 && Object.entries(CAT_META).map(([catId, cat]) => (
                          <div key={catId} className="cat-group">
                            <button
                              className="cat-group__pill"
                              onClick={() => toggleCat(`mob-${catId}`)}
                            >
                              <span>{cat.label}</span>
                              <span className="cat-group__count">{projectsByCat[catId].length}</span>
                              <span className="cat-group__arrow">{openCats[`mob-${catId}`] ? '↑' : '↓'}</span>
                            </button>
                            {openCats[`mob-${catId}`] && (
                              <div className="cat-group__projects">
                                {projectsByCat[catId].map(p => (
                                  <button
                                    key={p.id}
                                    className="med-project"
                                    style={{ '--med-color': '#475569' }}
                                    onClick={() => navigate(`/case-study/${p.id}`)}
                                  >
                                    <span className="med-project__title">{p.title}</span>
                                    <span className="med-project__tagline">{p.tagline || p.caseStudy?.product}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {i === 2 && (<>
                          <span className="med-tag med-tag--muted" style={{ '--med-color': m.color }}>
                            Art &amp; Illustration
                            <IconInstagram /><IconTikTok />
                          </span>
                          <span className="med-tag med-tag--muted" style={{ '--med-color': m.color }}>
                            Podcast
                            <span className="med-tag__soon">soon</span>
                            <IconSpotify />
                          </span>
                          <span className="med-tag med-tag--muted" style={{ '--med-color': m.color }}>
                            Newsletter
                            <IconLinkedIn />
                          </span>
                        </>)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
