import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import './ScrollTopBtn.css';

export default function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="scroll-top-btn"
      className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
      onClick={scrollTop}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}
