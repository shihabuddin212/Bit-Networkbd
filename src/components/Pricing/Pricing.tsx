import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Zap, ArrowRight, FileText } from 'lucide-react';
import { db } from '../../utils/db';
import type { PricingPlanItem } from '../../utils/db';
import './Pricing.css';

interface PricingProps {
  limit?: number;
}

export default function Pricing({ limit }: PricingProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [plans, setPlans] = useState<PricingPlanItem[]>([]);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    const loadPlans = () => {
      const all = db.getPricingPlans();
      setPlans(limit ? all.slice(0, limit) : all);
    };
    loadPlans();
    window.addEventListener('local-db-updated', loadPlans);
    return () => window.removeEventListener('local-db-updated', loadPlans);
  }, [limit]);

  return (
    <section className="pricing section" id="pricing" ref={ref}>
      <div className="container">
        <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <span className="section-badge"><Star size={12} /> Pricing Plans</span>
          <h2 className="section-title">
            Choose Your Perfect <span className="highlight">Package</span>
          </h2>
          <p className="section-subtitle">
            Flexible plans for every budget. All packages include unlimited data and free installation.
          </p>
          <div className="pricing__header-links">
            <a
              href="/files/rm-communication-tariff.pdf"
              className="pricing__tariff-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} /> View BTRC Approved Tariff
            </a>
          </div>
        </div>

        <div className="pricing__grid">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`pricing__card ${plan.featured ? 'pricing__card--featured' : ''} ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
              style={{
                animationDelay: `${i * 0.07}s`,
                '--plan-color': plan.color,
              } as React.CSSProperties}
              onMouseEnter={() => setHovered(plan.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {plan.badge && (
                <div className="pricing__badge">
                  <Zap size={10} /> {plan.badge}
                </div>
              )}
              <div className="pricing__header">
                <div className="pricing__speed-pill" style={{ '--plan-color': plan.color } as React.CSSProperties}>
                  <Zap size={12} /> {plan.speed}
                </div>
                <h3 className="pricing__name">{plan.name}</h3>
                <div className="pricing__price">
                  <span className="pricing__currency">TK</span>
                  <span className="pricing__amount">{plan.price.toLocaleString()}</span>
                  <span className="pricing__period">/{plan.period}</span>
                </div>
              </div>
              <ul className="pricing__features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing__feature">
                    <Check size={14} className="pricing__check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                state={{ plan: plan.name }}
                className={`btn ${plan.featured ? 'btn-primary' : hovered === plan.id ? 'btn-primary' : 'btn-outline'} pricing__btn`}
              >
                Get {plan.name} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {limit && (
          <div className="pricing__view-more">
            <Link to="/pricing" className="btn btn-outline btn-lg">
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
