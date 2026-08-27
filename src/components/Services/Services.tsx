import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { db, renderIcon } from '../../utils/db';
import type { ServiceItem } from '../../utils/db';
import './Services.css';

export default function Services() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [services, setServices] = useState<ServiceItem[]>([]);

    useEffect(() => {
        setServices(db.getServices());
        const handler = () => setServices(db.getServices());
        window.addEventListener('local-db-updated', handler);
        return () => window.removeEventListener('local-db-updated', handler);
    }, []);

    return (
        <section className="services section" id="services" ref={ref}>
            <div className="container">
                <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
                    <span className="section-badge">What We Offer</span>
                    <h2 className="section-title">
                        Services &amp; <span className="highlight">Solutions</span>
                    </h2>
                    <p className="section-subtitle">
                        Join Bitnetworkbd today and take advantage of our comprehensive range of internet and network solutions designed for every need.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            className={`services__card card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            {service.badge && (
                                <span className="services__badge">{service.badge}</span>
                            )}
                            <div className="services__icon-wrap">
                                {renderIcon(service.iconName, { size: 24, strokeWidth: 1.5 })}
                            </div>
                            <h3 className="services__title">{service.title}</h3>
                            <p className="services__desc">{service.description}</p>
                            <div className="services__arrow">
                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
