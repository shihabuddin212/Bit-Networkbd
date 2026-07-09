import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <div className="notfound__bg">
        <div className="notfound__orb" />
      </div>
      <div className="container notfound__content">
        <div className="notfound__code">
          <span>4</span>
          <div className="notfound__zero">
            <div className="notfound__zero-inner">0</div>
          </div>
          <span>4</span>
        </div>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__desc">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Go to Homepage
          </Link>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>

        <div className="notfound__links">
          <p>Quick links:</p>
          <div className="notfound__quick-links">
            {[
              { label: 'Pricing', path: '/pricing' },
              { label: 'Coverage', path: '/coverage' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="notfound__quick-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
