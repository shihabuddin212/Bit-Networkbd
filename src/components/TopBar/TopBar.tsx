import { useLayoutEffect, useRef, useState } from 'react';
import { X, Zap } from 'lucide-react';
import './TopBar.css';

export default function TopBar() {
  const [visible, setVisible] = useState(true);
  const topbarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateOffset = () => {
      const offset = visible && topbarRef.current ? `${topbarRef.current.offsetHeight}px` : '0px';
      document.documentElement.style.setProperty('--topbar-offset', offset);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => {
      window.removeEventListener('resize', updateOffset);
      document.documentElement.style.setProperty('--topbar-offset', '0px');
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="topbar" id="announcement-bar" ref={topbarRef}>
      <div className="container topbar__inner">
        <div className="topbar__content">
          <Zap size={13} className="topbar__icon" />
          <span className="topbar__text">
            বাড়তি খরচ ছাড়াই আপনার ইন্টারনেট বিল পরিশোধ করুন — &nbsp;
            <a
              href="https://admin.msonlinebd.com/BillPayment/Index"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar__link"
            >
              Pay Bill Now →
            </a>
          </span>
        </div>
        <button
          className="topbar__close"
          onClick={() => setVisible(false)}
          aria-label="Close announcement"
          id="topbar-close-btn"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
