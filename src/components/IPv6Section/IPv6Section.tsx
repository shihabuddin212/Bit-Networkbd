import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import './IPv6Section.css';

export default function IPv6Section() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="ipv6 section-sm" id="ipv6" ref={ref}>
      <div className="container">
        <div className={`ipv6__inner ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          {/* Animated background */}
          <div className="ipv6__bg">
            <div className="ipv6__ring ipv6__ring--1" />
            <div className="ipv6__ring ipv6__ring--2" />
            <div className="ipv6__ring ipv6__ring--3" />
            <div className="ipv6__grid-overlay" />
          </div>

          <div className="ipv6__content">
            {/* Badge */}
            <div className="ipv6__badge">
              <Globe size={14} />
              <span>IPv6 READY</span>
            </div>

            <h2 className="ipv6__title">
              Connecting the World
            </h2>
            <p className="ipv6__subtitle">
              One address at a time with IPv6
            </p>
            <p className="ipv6__desc">
              Bitnetworkbd is fully IPv6 enabled, ensuring your devices are future-proof
              and securely connected with the next-generation internet protocol.
            </p>

            {/* IPv6 address display */}
            <div className="ipv6__address-display">
              <div className="ipv6__address-label">Sample IPv6 Address</div>
              <div className="ipv6__address">
                <span>2001</span>
                <span className="ipv6__colon">:</span>
                <span>0db8</span>
                <span className="ipv6__colon">:</span>
                <span>85a3</span>
                <span className="ipv6__colon">:</span>
                <span>0000</span>
                <span className="ipv6__colon">:</span>
                <span>0000</span>
                <span className="ipv6__colon">:</span>
                <span>8a2e</span>
                <span className="ipv6__colon">:</span>
                <span>0370</span>
                <span className="ipv6__colon">:</span>
                <span>7334</span>
              </div>
            </div>

            {/* Features */}
            <div className="ipv6__features">
              {[
                { label: '128-bit Address', sub: 'Virtually unlimited IPs' },
                { label: 'Auto-config', sub: 'Zero manual setup' },
                { label: 'Enhanced Security', sub: 'Built-in IPSec' },
                { label: 'No NAT', sub: 'Direct connectivity' },
              ].map((f) => (
                <div key={f.label} className="ipv6__feature">
                  <span className="ipv6__feature-label">{f.label}</span>
                  <span className="ipv6__feature-sub">{f.sub}</span>
                </div>
              ))}
            </div>

            <Link to="/pricing" className="btn btn-primary ipv6__cta">
              Get IPv6 Connection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
