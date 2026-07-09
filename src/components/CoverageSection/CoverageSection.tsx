import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../../utils/db';
import './CoverageSection.css';

export default function CoverageSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    setAreas(db.getCoverageAreas());
    const handler = () => setAreas(db.getCoverageAreas());
    window.addEventListener('local-db-updated', handler);
    return () => window.removeEventListener('local-db-updated', handler);
  }, []);

  return (
    <section className="coverage-section section" id="coverage" ref={ref}>
      <div className="container">
        <div className="coverage-section__layout">
          {/* Left - Text */}
          <div className={`coverage-section__content ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
            <span className="section-badge" style={{ textAlign: 'left', display: 'inline-flex' }}>
              <MapPin size={12} /> Coverage Area
            </span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              We're Spread Across
              <br />
              <span className="highlight">All of Dhaka City</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Rm Communication Ltd is rapidly expanding its fiber optic network across Dhaka.
              Check if your area is covered and get connected today.
            </p>

            <div className="coverage-section__stats">
              <div className="coverage-section__stat">
                <span className="coverage-section__stat-num">{areas.length}+</span>
                <span className="coverage-section__stat-label">Areas Covered</span>
              </div>
              <div className="coverage-section__stat-div" />
              <div className="coverage-section__stat">
                <span className="coverage-section__stat-num">10K+</span>
                <span className="coverage-section__stat-label">Active Users</span>
              </div>
              <div className="coverage-section__stat-div" />
              <div className="coverage-section__stat">
                <span className="coverage-section__stat-num">500km+</span>
                <span className="coverage-section__stat-label">Fiber Laid</span>
              </div>
            </div>

            <Link to="/coverage" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              View Coverage Map <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right - Area grid */}
          <div className={`coverage-section__areas ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.2s' }}>
            <div className="coverage-section__areas-header">
              <MapPin size={16} />
              <span>Available Coverage Areas</span>
            </div>
            <div className="coverage-section__area-grid">
              {areas.map((area, i) => (
                <div
                  key={area}
                  className="coverage-section__area"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <CheckCircle size={12} />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="coverage-section__more">
              + More areas coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
