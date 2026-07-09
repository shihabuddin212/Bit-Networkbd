import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Wifi, Phone, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Offers', path: '/offers' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Coverage', path: '/coverage' },
  { label: 'Pay Bill', path: '/pay-bill' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const themeToggleLabel = isLight ? 'Switch to night mode' : 'Switch to day mode';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const renderThemeToggle = (extraClass = '') => (
    <button
      type="button"
      className={`theme-toggle ${isLight ? 'theme-toggle--light' : 'theme-toggle--dark'} ${extraClass}`}
      onClick={toggleTheme}
      aria-label={themeToggleLabel}
      title={themeToggleLabel}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun">
        <Sun size={14} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon">
        <Moon size={14} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle__thumb">
        {isLight ? <Sun size={13} strokeWidth={2} /> : <Moon size={13} strokeWidth={2} />}
      </span>
    </button>
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <div className="navbar__logo-icon">
              <Wifi size={20} strokeWidth={2.5} />
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">RM</span>
              <span className="navbar__logo-sub">Communication Ltd</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar__cta">
            {renderThemeToggle()}
            <Link to="/pricing" className="btn btn-primary btn-sm">
              Get Connected <ChevronRight size={14} />
            </Link>
          </div>

          <div className="navbar__mobile-actions">
            {renderThemeToggle('theme-toggle--compact')}
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__header">
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <div className="navbar__logo-icon">
              <Wifi size={18} strokeWidth={2.5} />
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">RM</span>
              <span className="navbar__logo-sub">Communication Ltd</span>
            </div>
          </Link>
          <div className="mobile-menu__header-actions">
            {renderThemeToggle('theme-toggle--compact')}
            <button className="mobile-menu__close" onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>
        </div>

        <ul className="mobile-menu__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                end={link.path === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <ChevronRight size={16} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__footer">
          <a href="tel:09639116116" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
            <Phone size={16} /> Call Us: 09639116116
          </a>
          <Link
            to="/pricing"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            Get Connected <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
