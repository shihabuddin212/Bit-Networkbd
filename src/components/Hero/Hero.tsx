import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import './Hero.css';

const features = [
  { icon: Zap, label: 'Ultra-Fast Speed' },
  { icon: Shield, label: 'Secure Network' },
  { icon: Clock, label: '24/7 Support' },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '1Gbps', label: 'Max Speed' },
  { value: '24/7', label: 'Support' },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge">
            <span className="glow-dot" />
            Bangladesh's Most Reliable ISP
          </div>

          {/* Headline */}
          <h1 className="hero__title">
            Experience
            <span className="hero__title-accent"> Lightning-Fast</span>
            <br />
            Internet Connectivity
          </h1>

          <p className="hero__description">
            Rm Communication Ltd delivers premium broadband internet solutions for homes and businesses.
            Enjoy uninterrupted connectivity with fiber-optic speeds and enterprise-grade reliability.
          </p>

          {/* Features */}
          <div className="hero__features">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="hero__feature">
                <Icon size={14} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <Link to="/pricing" className="btn btn-primary btn-lg">
              View Packages <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              <Play size={16} />
              Get a Connection
            </Link>
          </div>

          {/* Trust badges */}
          <div className="hero__trust">
            <CheckCircle size={14} className="hero__trust-icon" />
            <span>BTRC Licensed &amp; Approved</span>
            <span className="hero__trust-sep">•</span>
            <span>No hidden charges</span>
            <span className="hero__trust-sep">•</span>
            <span>Free installation</span>
          </div>
        </div>

        {/* Right side - Stats & Visual */}
        <div className="hero__visual">
          {/* Central display card */}
          <div className="hero__card-main">
            <div className="hero__card-header">
              <div className="hero__signal">
                <span /><span /><span /><span />
              </div>
              <span className="hero__card-label">Live Network Status</span>
              <span className="hero__online-badge"><span className="glow-dot" /> Online</span>
            </div>

            <div className="hero__speed-display">
              <div className="hero__speed-ring">
                <svg viewBox="0 0 120 120" className="hero__speed-svg">
                  <circle cx="60" cy="60" r="50" className="hero__speed-track" />
                  <circle cx="60" cy="60" r="50" className="hero__speed-progress" />
                </svg>
                <div className="hero__speed-value">
                  <span className="hero__speed-number">1</span>
                  <span className="hero__speed-unit">Gbps</span>
                  <span className="hero__speed-label">Max Speed</span>
                </div>
              </div>
            </div>

            <div className="hero__metrics">
              <div className="hero__metric">
                <span className="hero__metric-value">0.3ms</span>
                <span className="hero__metric-label">Latency</span>
              </div>
              <div className="hero__metric-divider" />
              <div className="hero__metric">
                <span className="hero__metric-value">99.9%</span>
                <span className="hero__metric-label">Uptime</span>
              </div>
              <div className="hero__metric-divider" />
              <div className="hero__metric">
                <span className="hero__metric-value">IPv6</span>
                <span className="hero__metric-label">Ready</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="hero__float-badge hero__float-badge--1">
            <Zap size={14} />
            <span>Fiber Optic</span>
          </div>
          <div className="hero__float-badge hero__float-badge--2">
            <Shield size={14} />
            <span>Secure</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
