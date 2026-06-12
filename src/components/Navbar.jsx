import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Navbar.css';
import './Footer.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { dark, toggleDark } = useContext(ThemeContext);

  function close() { setOpen(false); }


  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__name" onClick={close}>Manasa Rapuru</Link>
      </div>

      {/* Desktop nav */}
      <nav className="navbar__links">
        <Link to="/projects" className={`navbar__link ${pathname === '/projects' ? 'navbar__link--active' : ''}`}>Projects</Link>
        <Link to="/about" className={`navbar__link ${pathname === '/about' ? 'navbar__link--active' : ''}`}>About Me</Link>
        {/* <a href="https://www.linkedin.com/in/manasa-rapuru-b10914126/recent-activity/newsletter/" target="_blank" rel="noopener noreferrer" className="navbar__link" aria-label="Newsletter">Newsletter</a> */}
        <a href="https://www.linkedin.com/in/manasa-rapuru-b10914126" target="_blank" rel="noopener noreferrer" className="navbar__linkedin-btn">
          Resume
        </a>
        <button className="navbar__theme-toggle" onClick={toggleDark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {dark ? <IconSun /> : <IconMoon />}
        </button>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="navbar__drawer" role="dialog" aria-modal="true">
          <Link to="/projects" className="navbar__drawer-link" onClick={close}>Projects</Link>
          <Link to="/about" className="navbar__drawer-link" onClick={close}>About Me</Link>
          <a href="#" className="navbar__drawer-link" onClick={close}>Articles</a>
          <a href="https://linkedin.com/in/manasarapuru" target="_blank" rel="noopener noreferrer" className="navbar__drawer-link" onClick={close}>Connect on LinkedIn</a>
        </div>
      )}
    </header>
  );
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}
