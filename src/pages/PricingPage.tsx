import Pricing from '../components/Pricing/Pricing';
import CTABanner from '../components/CTABanner/CTABanner';
import './PageCommon.css';

export default function PricingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">Pricing Plans</span>
          <h1 className="page-hero__title">Simple, Transparent <span className="highlight">Pricing</span></h1>
          <p className="page-hero__sub">Choose a package that suits your needs and budget. All plans include free installation and unlimited data.</p>
        </div>
      </div>
      <Pricing />
      <CTABanner />
    </>
  );
}
