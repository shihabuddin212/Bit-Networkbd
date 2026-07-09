import { useInView } from 'react-intersection-observer';
import { Smartphone, Globe, Building, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HowToPay.css';

const methods = [
  {
    icon: Smartphone,
    title: 'Mobile Banking',
    desc: 'Pay via bKash, Nagad, or Rocket instantly from your phone.',
    steps: ['Open your mobile banking app', 'Select "Pay Bill"', 'Enter merchant number', 'Confirm payment'],
    color: '#e91e8c',
  },
  {
    icon: Globe,
    title: 'Online Self-care Portal',
    desc: 'Log in to your account and pay securely using card or MFS.',
    steps: ['Login to selfcare portal', 'Go to "Pay Bill" section', 'Choose payment method', 'Complete payment'],
    color: '#00c6ff',
  },
  {
    icon: Building,
    title: 'Bank Transfer',
    desc: 'Transfer directly to our bank account via NPSB or BEFTN.',
    steps: ['Get our bank details', 'Initiate bank transfer', 'Use your account ID as reference', 'Send proof of payment'],
    color: '#4ade80',
  },
  {
    icon: CreditCard,
    title: 'Cash Payment',
    desc: 'Visit our office or pay through our authorized collection agents.',
    steps: ['Visit our nearest office', 'Provide your account ID', 'Pay the bill amount', 'Collect your receipt'],
    color: '#f59e0b',
  },
];

export default function HowToPay() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="howtopay section" id="how-to-pay" ref={ref}>
      <div className="container">
        <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <span className="section-badge">Payment</span>
          <h2 className="section-title">
            How to <span className="highlight">Pay Your Bill?</span>
          </h2>
          <p className="section-subtitle">
            Multiple convenient payment options available. Choose the method that works best for you.
          </p>
        </div>

        <div className="howtopay__grid">
          {methods.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className={`howtopay__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
                style={{ animationDelay: `${i * 0.1}s`, '--method-color': m.color } as React.CSSProperties}
              >
                <div className="howtopay__icon-wrap">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="howtopay__title">{m.title}</h3>
                <p className="howtopay__desc">{m.desc}</p>
                <ul className="howtopay__steps">
                  {m.steps.map((step, si) => (
                    <li key={step} className="howtopay__step">
                      <span className="howtopay__step-num">{si + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={`howtopay__cta ${inView ? 'animate-fade-in-up' : 'pre-animate'}`} style={{ animationDelay: '0.4s' }}>
          <div className="howtopay__cta-content">
            <CheckCircle size={24} className="howtopay__cta-icon" />
            <div>
              <h3>Need help with payment?</h3>
              <p>Our support team is available 24/7 to assist you with any payment queries.</p>
            </div>
          </div>
          <Link to="/pay-bill" className="btn btn-primary">
            Pay Your Bill Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
