import HowToPay from '../components/HowToPay/HowToPay';
import CTABanner from '../components/CTABanner/CTABanner';
import './PageCommon.css';

export default function PayBillPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">Bill Payment</span>
          <h1 className="page-hero__title">Pay Your Bill <span className="highlight">Easily</span></h1>
          <p className="page-hero__sub">Multiple convenient payment options available. No extra charges — just pay and enjoy uninterrupted internet.</p>
        </div>
      </div>
      <HowToPay />
      <CTABanner />
    </>
  );
}
