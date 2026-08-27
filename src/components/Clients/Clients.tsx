import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';
import { db, type TestimonialItem } from '../../utils/db';
import './Clients.css';

export default function Clients() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(db.getTestimonials());

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(db.getTestimonials());
    };
    window.addEventListener('local-db-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('local-db-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <section className="clients section" id="clients" ref={ref}>
      <div className="container">
        <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
          <span className="section-badge"><Star size={12} /> Testimonials</span>
          <h2 className="section-title">
            What Our <span className="highlight">Customers Say</span>
          </h2>
          <p className="section-subtitle">
            Thousands of happy customers enjoy Bitnetworkbd's fastest internet every day.
          </p>
        </div>

        <div className="clients__grid">
          {testimonials.map((t, i) => (
            <div
              key={t.id || t.name}
              className={`clients__card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Quote size={28} className="clients__quote-icon" style={{ color: t.color || '#00c6ff', opacity: 0.3 }} />
              <div className="clients__stars">
                {Array.from({ length: t.rating || 5 }).map((_, si) => (
                  <Star key={si} size={13} fill={t.color || '#00c6ff'} color={t.color || '#00c6ff'} />
                ))}
              </div>
              <p className="clients__text">{t.text}</p>
              <div className="clients__author">
                <div className="clients__avatar" style={{ '--avatar-color': t.color || '#00c6ff' } as React.CSSProperties}>
                  {t.initials || t.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
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
