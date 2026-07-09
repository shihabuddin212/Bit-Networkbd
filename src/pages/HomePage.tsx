import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import WhyUs from '../components/WhyUs/WhyUs';
import Stats from '../components/Stats/Stats';
import Pricing from '../components/Pricing/Pricing';
import HowToPay from '../components/HowToPay/HowToPay';
import CoverageSection from '../components/CoverageSection/CoverageSection';
import SelfcareSection from '../components/SelfcareSection/SelfcareSection';
import LatestArticles from '../components/LatestArticles/LatestArticles';
import Clients from '../components/Clients/Clients';
import CTABanner from '../components/CTABanner/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Stats />
      <Pricing limit={4} />
      <HowToPay />
      <CoverageSection />
      <SelfcareSection />
      <LatestArticles />
      <Clients />
      <CTABanner />
    </>
  );
}
