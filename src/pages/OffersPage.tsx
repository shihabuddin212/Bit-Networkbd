import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Gift, ArrowRight, CheckCircle2, BookOpen, Shield, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, renderIcon } from '../utils/db';
import type { OfferItem } from '../utils/db';
import LatestArticles from '../components/LatestArticles/LatestArticles';
import './PageCommon.css';
import './OffersPage.css';

export default function OffersPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [offers, setOffers] = useState<OfferItem[]>([]);

  useEffect(() => {
    setOffers(db.getOffers());
    const handler = () => setOffers(db.getOffers());
    window.addEventListener('local-db-updated', handler);
    return () => window.removeEventListener('local-db-updated', handler);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">
            <Gift size={12} /> Hot Promotion Campaigns
          </span>
          <h1 className="page-hero__title">
            Exclusive <span className="highlight">Offers</span> &amp; Packages
          </h1>
          <p className="page-hero__sub">
            Save more with RM Communication Ltd.'s reward programs, prepayment campaigns, and free high-performance hardware bundles designed to maximize your digital budget.
          </p>
        </div>
      </div>

      {/* Offers List Grid */}
      <section className="section offers-section" ref={ref}>
        <div className="container">
          <div className="offers-grid">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={`offer-card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="offer-card__badge">{offer.badge}</span>
                <div className="offer-card__content">
                  <div className="offer-card__icon-wrap">
                    {renderIcon(offer.iconName, { size: 24, strokeWidth: 1.8 })}
                  </div>
                  <h2 className="offer-card__title">{offer.title}</h2>
                  <p className="offer-card__description">{offer.description}</p>

                  <ul className="offer-card__highlights">
                    {offer.highlights.map((highlight, idx) => (
                      <li key={idx} className="offer-card__highlights-item">
                        <CheckCircle2 size={15} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="offer-card__footer">
                    <Link to={offer.ctaLink} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      {offer.ctaText} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Articles promo banner */}
          <div className={`offers-articles-promo ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.3s' }}>
            <div className="offers-articles-promo__content">
              <span className="section-badge" style={{ display: 'inline-flex', gap: '0.4rem' }}>
                <BookOpen size={12} /> Tech &amp; Regulatory Hub
              </span>
              <h2 className="offers-articles-promo__title">
                Before Making Your Choice, <span className="highlight">Get Informed</span>
              </h2>
              <p className="offers-articles-promo__description">
                Explore our full archive of articles, guides, and insights. Learn how our retail high-speed internet packages perfectly align with official BTRC tariff guidelines, and read our guidelines on how to optimize home Wi-Fi and protect your personal privacy online.
              </p>
              <div className="offers-articles-promo__actions">
                <Link to="/articles" className="btn btn-primary btn-lg">
                  Read Articles &amp; Insights <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn btn-ghost btn-lg">
                  Learn About Compliance
                </Link>
              </div>
            </div>
            <div className="offers-articles-promo__image-container">
              <div className="promo-mini-card">
                <div className="promo-mini-card__icon"><Shield size={20} /></div>
                <h3 className="promo-mini-card__title">BTRC Compliant</h3>
                <p className="promo-mini-card__desc">Strict compliance with tariff policies and privacy regulations.</p>
              </div>
              <div className="promo-mini-card">
                <div className="promo-mini-card__icon"><Wifi size={20} /></div>
                <h3 className="promo-mini-card__title">ISP Guides</h3>
                <p className="promo-mini-card__desc">Step-by-step router configuration and home Wi-Fi optimization guides.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Articles section */}
      <LatestArticles />
    </>
  );
}
