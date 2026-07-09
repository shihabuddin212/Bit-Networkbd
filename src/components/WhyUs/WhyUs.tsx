import { useInView } from 'react-intersection-observer';
import { Zap, Clock, Headphones, Shield, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import './WhyUs.css';

const reasons = [
  {
    icon: Zap,
    title: 'Blazing Fast Speeds',
    description: 'Fiber optic infrastructure delivering speeds up to 1 Gbps with consistently low latency.',
  },
  {
    icon: Clock,
    title: '99.9% Uptime Guarantee',
    description: 'Redundant network paths ensure your internet stays on — backed by our SLA commitment.',
  },
  {
    icon: Headphones,
    title: '24/7 Expert Support',
    description: 'Our dedicated support team is available around the clock to resolve any issue promptly.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Advanced DDoS protection and network security to keep your data safe and private.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Easily upgrade your plan as your needs grow — no contracts, no hassle.',
  },
  {
    icon: Users,
    title: 'Trusted by Thousands',
    description: 'Over 10,000 happy customers across Dhaka trust Rm Communication for daily connectivity.',
  },
];

const certifications = [
  { icon: Award, label: 'BTRC Licensed' },
  { icon: CheckCircle, label: 'ISO Certified' },
  { icon: Shield, label: 'Data Protected' },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="whyus section" id="why-us" ref={ref}>
      {/* Background accent */}
      <div className="whyus__bg-accent" />

      <div className="container">
        <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">
            Why Rm Communication Is
            <br />
            <span className="highlight">Your Best Choice?</span>
          </h2>
          <p className="section-subtitle">
            We don't just provide internet — we deliver a premium connectivity experience backed by cutting-edge infrastructure and dedicated service.
          </p>
        </div>

        <div className="whyus__grid">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className={`whyus__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="whyus__icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="whyus__title">{r.title}</h3>
                  <p className="whyus__desc">{r.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications row */}
        <div className={`whyus__certs ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.5s' }}>
          {certifications.map(({ icon: Icon, label }) => (
            <div key={label} className="whyus__cert">
              <Icon size={16} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
