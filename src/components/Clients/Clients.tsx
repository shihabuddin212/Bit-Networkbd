import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';
import './Clients.css';

const testimonials = [
  {
    name: 'Rafiqul Islam',
    role: 'Home User, Mirpur',
    rating: 5,
    text: 'Rm Communication has been a game-changer for my household. The speed is consistently fast and the connection never drops. Excellent service!',
    initials: 'RI',
    color: '#00c6ff',
  },
  {
    name: 'Tahmina Begum',
    role: 'Business Owner, Dhanmondi',
    rating: 5,
    text: 'I rely on stable internet for my business. Rm Communication\'s corporate package has been flawless. Their 24/7 support team is incredibly responsive.',
    initials: 'TB',
    color: '#7c3aed',
  },
  {
    name: 'Md. Karim',
    role: 'Software Developer, Uttara',
    rating: 5,
    text: 'As a developer, low latency is critical. The 100 Mbps plan gives me blazing speeds with minimal ping. Best ISP I\'ve ever used in Dhaka.',
    initials: 'MK',
    color: '#f59e0b',
  },
  {
    name: 'Fatema Khatun',
    role: 'Student, Badda',
    rating: 5,
    text: 'Very affordable pricing with great speeds. The online bill payment is super easy. I highly recommend Rm Communication to everyone!',
    initials: 'FK',
    color: '#4ade80',
  },
  {
    name: 'Shahidul Hoque',
    role: 'Gaming Enthusiast, Gulshan',
    rating: 5,
    text: 'Finally found an ISP with consistent low latency for gaming! The fiber connection is rock-solid. The support team helped set everything up quickly.',
    initials: 'SH',
    color: '#f43f5e',
  },
  {
    name: 'Nasrin Akter',
    role: 'Home User, Mohammadpur',
    rating: 5,
    text: 'Great value for money. My whole family streams videos and works from home simultaneously with zero issues. Very happy customer!',
    initials: 'NA',
    color: '#a78bfa',
  },
];

export default function Clients() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="clients section" id="clients" ref={ref}>
      <div className="container">
        <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <span className="section-badge"><Star size={12} /> Testimonials</span>
          <h2 className="section-title">
            What Our <span className="highlight">Customers Say</span>
          </h2>
          <p className="section-subtitle">
            Thousands of happy customers enjoy Rm Communication's fastest internet every day.
          </p>
        </div>

        <div className="clients__grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`clients__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Quote size={28} className="clients__quote-icon" style={{ color: t.color, opacity: 0.3 }} />
              <div className="clients__stars">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={13} fill={t.color} color={t.color} />
                ))}
              </div>
              <p className="clients__text">{t.text}</p>
              <div className="clients__author">
                <div className="clients__avatar" style={{ '--avatar-color': t.color } as React.CSSProperties}>
                  {t.initials}
                </div>
                <div>
                  <p className="clients__name">{t.name}</p>
                  <p className="clients__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
