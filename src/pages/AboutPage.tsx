import { useInView } from 'react-intersection-observer';
import { Wifi, Target, Eye, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PageCommon.css';
import './AboutPage.css';

const milestones = [
  { year: '2015', label: 'Founded in Dhaka' },
  { year: '2017', label: 'Reached 1,000 customers' },
  { year: '2019', label: 'Launched fiber optic network' },
  { year: '2021', label: 'BTRC license obtained' },
  { year: '2023', label: '10,000+ active subscribers' },
  { year: '2025', label: 'IPv6 network launched' },
];

export default function AboutPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">About Us</span>
          <h1 className="page-hero__title">We Are <span className="highlight">Rm Communication Ltd</span></h1>
          <p className="page-hero__sub">A trusted name in broadband internet and telecom solutions, committed to connecting Bangladesh with fast, reliable, and affordable internet.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section about-mission" ref={ref}>
        <div className="container">
          <div className="about-mission__grid">
            <div className={`about-mission__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
              <div className="about-mission__icon"><Target size={24} strokeWidth={1.5} /></div>
              <h3>Our Mission</h3>
              <p>To make quality internet and telecom solutions accessible and affordable for every user — from individuals to large enterprises — across Bangladesh.</p>
            </div>
            <div className={`about-mission__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.1s' }}>
              <div className="about-mission__icon"><Eye size={24} strokeWidth={1.5} /></div>
              <h3>Our Vision</h3>
              <p>To be Bangladesh's most trusted and innovative ISP, driving digital transformation through cutting-edge network infrastructure and exceptional customer service.</p>
            </div>
            <div className={`about-mission__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.2s' }}>
              <div className="about-mission__icon"><Award size={24} strokeWidth={1.5} /></div>
              <h3>Our Values</h3>
              <p>Reliability, transparency, customer-first service, and continuous innovation drive everything we do at Rm Communication Ltd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section about-story">
        <div className="container about-story__layout">
          <div>
            <span className="section-badge" style={{ display: 'inline-flex' }}><Wifi size={12} /> Our Story</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Building Bangladesh's <span className="highlight">Digital Future</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Founded in 2015, Rm Communication Ltd started with a simple goal: provide fast, reliable internet to Dhaka's underserved communities at fair prices. Over the years, we've grown from a small team of network enthusiasts to a fully licensed ISP serving thousands of homes and businesses.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              Our fiber optic backbone, combined with 24/7 expert support, has made us one of the most trusted names in Bangladesh's internet industry. We continue to expand our network, improve our services, and invest in cutting-edge technology to deliver the best possible experience.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Get in Touch <ChevronRight size={16} />
            </Link>
          </div>
          <div className="about-story__timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className={`about-story__milestone ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="about-story__year">{m.year}</div>
                <div className="about-story__dot" />
                <div className="about-story__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
