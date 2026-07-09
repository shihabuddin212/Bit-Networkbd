import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { User, BarChart2, CreditCard, Headphones, ArrowRight, Monitor } from 'lucide-react';
import './SelfcareSection.css';

const features = [
  { icon: User, label: 'Manage Account' },
  { icon: BarChart2, label: 'Usage Stats' },
  { icon: CreditCard, label: 'Pay Bill' },
  { icon: Headphones, label: 'Support Ticket' },
];

export default function SelfcareSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="selfcare section" id="selfcare" ref={ref}>
      <div className="container">
        <div className="selfcare__layout">
          {/* Left visual */}
          <div className={`selfcare__visual ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
            <div className="selfcare__card-wrap">
              <div className="selfcare__portal-card">
                <div className="selfcare__portal-header">
                  <div className="selfcare__portal-dots">
                    <span /><span /><span />
                  </div>
                  <span className="selfcare__portal-title">RM Self-care Portal</span>
                </div>
                <div className="selfcare__portal-body">
                  <div className="selfcare__portal-avatar">
                    <User size={28} />
                  </div>
                  <p className="selfcare__portal-name">John Doe</p>
                  <p className="selfcare__portal-id">Account ID: RM-00123</p>
                  <div className="selfcare__portal-stats">
                    <div className="selfcare__portal-stat">
                      <span className="selfcare__portal-stat-val">120 GB</span>
                      <span className="selfcare__portal-stat-label">Used</span>
                    </div>
                    <div className="selfcare__portal-stat-bar">
                      <div className="selfcare__portal-stat-fill" style={{ width: '48%' }} />
                    </div>
                    <div className="selfcare__portal-stat">
                      <span className="selfcare__portal-stat-val">∞</span>
                      <span className="selfcare__portal-stat-label">Remaining</span>
                    </div>
                  </div>
                  <div className="selfcare__portal-features">
                    {features.map(({ icon: Icon, label }) => (
                      <div key={label} className="selfcare__portal-feature">
                        <Icon size={14} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* IPv6 floating badge */}
              <div className="selfcare__ipv6-badge">
                <Monitor size={14} />
                <div>
                  <span className="selfcare__ipv6-title">IPv6 Ready</span>
                  <span className="selfcare__ipv6-sub">Connecting the future</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className={`selfcare__content ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.2s' }}>
            <span className="section-badge" style={{ display: 'inline-flex' }}>Self-care Portal</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Manage Everything
              <br />
              <span className="highlight">From One Dashboard</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Our intuitive self-care portal lets you monitor your usage, pay bills, raise support tickets, and manage your account — all in one place, 24/7.
            </p>

            <ul className="selfcare__feature-list">
              {[
                'Real-time bandwidth monitoring',
                'Instant online bill payment',
                'Usage history & reports',
                'Raise & track support tickets',
                'Update account information',
                'IPv6 enabled network access',
              ].map((item) => (
                <li key={item} className="selfcare__feature-item">
                  <span className="selfcare__check" />
                  {item}
                </li>
              ))}
            </ul>

            <Link to="https://selfcare.rmcommunication.com" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Access Self-care Portal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
