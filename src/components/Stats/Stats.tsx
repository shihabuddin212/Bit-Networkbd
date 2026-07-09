import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './Stats.css';

const stats = [
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: 10000, suffix: '+', label: 'Happy Customers', decimals: 0,
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    value: 99.9, suffix: '%', label: 'Network Uptime', decimals: 1,
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    value: 30, suffix: '+', label: 'Areas Covered', decimals: 0,
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: 24, suffix: '/7', label: 'Customer Support', decimals: 0,
  },
];

function useCounter(end: number, duration: number, decimals: number, started: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!started) { setCount(0); return; }
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - p) * (1 - p);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, end, duration, decimals]);
  return count;
}

interface StatItemProps {
  svg: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  decimals: number;
  delay: number;
  started: boolean;
}

function StatItem({ svg, value, suffix, label, decimals, delay, started }: StatItemProps) {
  const [go, setGo] = useState(false);
  const count = useCounter(value, 2200, decimals, go);
  useEffect(() => {
    if (started) {
      const t = setTimeout(() => setGo(true), delay);
      return () => clearTimeout(t);
    }
  }, [started, delay]);
  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
  return (
    <div
      className={`stats-section__item ${started ? 'animate-fade-in-up' : 'pre-animate'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stats-section__icon">{svg}</div>
      <div className="stats-section__value">{display}{suffix}</div>
      <div className="stats-section__label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-section__bg" />
      <div className="container">
        <div className="stats-section__grid">
          {stats.map((s, i) => (
            <StatItem
              key={s.label}
              svg={s.svg}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              decimals={s.decimals}
              delay={i * 150}
              started={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
