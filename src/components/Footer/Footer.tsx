import { Link } from 'react-router-dom';
import { Wifi, ExternalLink, Play, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

interface FooterLink {
  label: string;
  path: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Coverage Area', path: '/coverage' },
    { label: 'Bill Payment', path: '/pay-bill' },
  ],
  support: [
    { label: 'How to Pay', path: '/pay-bill' },
    { label: 'Self-care Portal', path: 'https://selfcare.rmcommunication.com', external: true },
    { label: 'Articles', path: '/articles' },
    { label: 'Contact Us', path: '/contact' },
  ],
  legal: [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Return & Refund', path: '/refund' },
    { label: 'BTRC Approved Tariff', path: '/tariff' },
  ],
};

const socials = [
  { icon: ExternalLink, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Play, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'done'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubStatus('done');
      setEmail('');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <Wifi size={18} strokeWidth={2.5} />
              </div>
              <div className="footer__logo-text">
                <span className="footer__logo-name">RM Communication</span>
                <span className="footer__logo-sub">Ltd</span>
              </div>
            </Link>
            <p className="footer__brand-desc">
              Providing fast, reliable, and affordable broadband internet and telecom solutions across Dhaka. BTRC licensed and approved.
            </p>
            <div className="footer__contact-info">
              <div className="footer__contact-item" style={{ gap: '0.4rem', flexWrap: 'wrap' }}>
                <Phone size={13} style={{ flexShrink: 0 }} />
                <a href="tel:09639116116">09639116116</a>
                <span>|</span>
                <a href="tel:01749090930">01749090930</a>
                <span>|</span>
                <a href="tel:01911223006">01911223006</a>
              </div>
              <a href="mailto:rmcommunicationltd@gmail.com" className="footer__contact-item">
                <Mail size={13} /> rmcommunicationltd@gmail.com
              </a>
              <div className="footer__contact-item">
                <MapPin size={13} style={{ flexShrink: 0 }} />
                <span>89, 3 Water Works Rd, Lalbagh, Dhaka 1211</span>
              </div>
            </div>
            <div className="footer__socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__col-links">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer__col">
            <h4 className="footer__col-title">Support</h4>
            <ul className="footer__col-links">
              {footerLinks.support.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.path} target="_blank" rel="noopener noreferrer" className="footer__link">{l.label}</a>
                  ) : (
                    <Link to={l.path} className="footer__link">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__col">
            <h4 className="footer__col-title">Legal</h4>
            <ul className="footer__col-links">
              {footerLinks.legal.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.path} target="_blank" rel="noopener noreferrer" className="footer__link">{l.label}</a>
                  ) : (
                    <Link to={l.path} className="footer__link">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h4 className="footer__col-title">Newsletter</h4>
            <p className="footer__newsletter-desc">
              Get the latest news, articles, and updates delivered to your inbox weekly.
            </p>
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="footer__newsletter-input"
                id="newsletter-email"
                required
              />
              <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
            {subStatus === 'done' && (
              <p className="footer__newsletter-success">✓ Subscribed successfully!</p>
            )}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© Rm Communication Ltd {new Date().getFullYear()}. All rights reserved.</p>
          <p>Developed with ❤️ for a better Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
