import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import './CTABanner.css';

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="cta-banner section-sm" ref={ref}>
      <div className="container">
        <div className={`cta-banner__inner ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <div className="cta-banner__bg-orb cta-banner__bg-orb--1" />
          <div className="cta-banner__bg-orb cta-banner__bg-orb--2" />

          <div className="cta-banner__content">
            <span className="section-badge" style={{ marginBottom: '1rem' }}>
              <MapPin size={12} /> Ready to Connect?
            </span>
            <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
              Locate Our <span className="highlight">Coverage Area</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '550px', lineHeight: 1.7 }}>
              Bitnetworkbd is spread almost everywhere in Dhaka city. Check the availability
              of all coverage areas and get connected today.
            </p>
          </div>

          <div className="cta-banner__actions">
            <Link to="/coverage" className="btn btn-primary btn-lg">
              <MapPin size={16} /> Check Coverage Area
            </Link>
            <a href="tel:+8801700000000" className="btn btn-ghost btn-lg">
              <Phone size={16} /> Call Us Now
            </a>
          </div>

          <Link to="/contact" className="cta-banner__link">
            Get a free consultation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
