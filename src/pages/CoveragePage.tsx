import CoverageSection from '../components/CoverageSection/CoverageSection';
import CTABanner from '../components/CTABanner/CTABanner';
import './PageCommon.css';

export default function CoveragePage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">Coverage</span>
          <h1 className="page-hero__title">Our <span className="highlight">Coverage Areas</span></h1>
          <p className="page-hero__sub">Rm Communication is rapidly expanding its fiber network across Dhaka. Check if your area is covered and get connected today.</p>
        </div>
      </div>
      <CoverageSection />
      <CTABanner />
    </>
  );
}
