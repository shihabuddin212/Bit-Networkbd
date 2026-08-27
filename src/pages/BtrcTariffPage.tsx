import { useState } from 'react';
import { FileText, ArrowRight, ChevronRight, Scale, Info, CheckCircle2, DollarSign, Award, Percent, ClipboardList, ShieldAlert } from 'lucide-react';
import './PageCommon.css';
import './BtrcTariffPage.css';

const tariffSections = [
    {
        id: 'ek-desh',
        num: 1,
        title: 'Ek Desh Ek Rate Policy',
        icon: Award,
        content: 'Bitnetworkbd Ltd. is fully compliant with the "Ek Desh, Ek Rate" (One Country, One Rate) tariff structure established by the Bangladesh Telecommunication Regulatory Commission (BTRC). Under this policy, internet packages are price-capped uniformly across all regions, unions, and districts of Bangladesh, ensuring billing transparency and removing geographic price differences.'
    },
    {
        id: 'retail-caps',
        num: 2,
        title: 'Approved Retail Pricing Caps',
        icon: DollarSign,
        content: 'Our core retail internet packages are priced in strict compliance with the BTRC maximum price boundaries. The standard regulatory price caps are defined as: 5 Mbps connectivity at BDT 500/month maximum limit; 10 Mbps connectivity at BDT 800/month maximum limit; and 20 Mbps connectivity at BDT 1,200/month maximum limit. Bitnetworkbd Ltd. packages match or provide higher capability relative to these caps.'
    },
    {
        id: 'corporate-tariff',
        num: 3,
        title: 'Dedicated Corporate Tariffs',
        icon: Info,
        content: 'For dedicated IP and corporate connections, tarifs are custom calculated based on backup connectivity requirements, SLA (Service Level Agreement) percentages, port costs, and utility requirements. All corporate prices remain subject to maximum tariff guidelines registered with BTRC for dedicated transmissions.'
    },
    {
        id: 'vat-tax',
        num: 4,
        title: 'VAT and Service Taxes',
        icon: Percent,
        content: 'In accordance with code directives from the National Board of Revenue (NBR) and BTRC, internet usage is subject to Value Added Tax (VAT) as declared by the government in the yearly budget. The pricing mentioned in our core consumer tables clearly describes the VAT-inclusive or exclusive details.'
    },
    {
        id: 'billing-compliance',
        num: 5,
        title: 'Billing Audits & Disclosures',
        icon: ClipboardList,
        content: 'Bitnetworkbd Ltd. conducts regular billing audits to confirm tariff compliance. Subscribers cannot be billed setup, maintenance, or line charges outside BTRC directives. Any fee changes requested by our network must receive BTRC certification approval before being rolled out.'
    },
    {
        id: 'support-grievance',
        num: 6,
        title: 'Fair Pricing Grievance',
        icon: ShieldAlert,
        content: 'Subscribers have the right to challenge any billing discrepancies. If you notice any tariff inconsistency, you may submit it to our billing helpline. Consumers are supported by the legal redress mechanisms of BTRC customer complaint division.'
    }
];

export default function BtrcTariffPage() {
    const [activeSection, setActiveSection] = useState('ek-desh');

    const handleScrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="page-hero">
                <div className="page-hero__bg" />
                <div className="container">
                    <span className="section-badge">BTRC Compliance</span>
                    <h1 className="page-hero__title">Approved <span className="highlight">Tariff List</span></h1>
                    <p className="page-hero__sub">
                        Consumer broadband packages and pricing caps regulated under the guidelines of the Bangladesh Telecommunication Regulatory Commission.
                    </p>
                </div>
            </div>

            <section className="section tariff-section">
                <div className="container tariff-layout">
                    {/* Sidebar Nav */}
                    <aside className="tariff-sidebar">
                        <div className="tariff-sidebar__sticky">
                            <h3 className="tariff-sidebar__title">
                                <FileText size={18} /> Sections
                            </h3>
                            <ul className="tariff-sidebar__list">
                                {tariffSections.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`tariff-sidebar__btn ${activeSection === item.id ? 'active' : ''}`}
                                            onClick={() => handleScrollTo(item.id)}
                                        >
                                            <span className="tariff-sidebar__num">{item.num}</span>
                                            <span className="tariff-sidebar__text">{item.title}</span>
                                            <ChevronRight size={14} className="tariff-sidebar__arrow" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Page content */}
                    <div className="tariff-content">
                        <div className="tariff-card">
                            <div className="tariff-card__header">
                                <Scale size={24} className="tariff-card__header-icon" />
                                <div>
                                    <h2>Official Tariff Policies</h2>
                                    <p>Government Regulated Broadband Pricing Matrix</p>
                                </div>
                            </div>

                            <div className="tariff-introduction">
                                <p>
                                    As a licensed Telecommunications & Internet Service Provider in Bangladesh, **Bitnetworkbd Ltd.** is strictly aligned with the BTRC broadband pricing mandates, promoting affordable access to digital assets for all.
                                </p>
                            </div>

                            {/* Ek Desh Highlight Box */}
                            <div className="ek-desh-box">
                                <div className="ek-desh-box__title">
                                    <CheckCircle2 size={16} /> BTRC Retail Tariff Matrix
                                </div>
                                <div className="ek-desh-box__grid">
                                    <div className="ek-desh-box__item">
                                        <span className="ek-desh-box__label">Minimum Speed</span>
                                        <span className="ek-desh-box__val">5 Mbps</span>
                                        <span className="ek-desh-box__sub">Max 500 BDT / month</span>
                                    </div>
                                    <div className="ek-desh-box__item">
                                        <span className="ek-desh-box__label">Intermediary Speed</span>
                                        <span className="ek-desh-box__val">10 Mbps</span>
                                        <span className="ek-desh-box__sub">Max 800 BDT / month</span>
                                    </div>
                                    <div className="ek-desh-box__item">
                                        <span className="ek-desh-box__label">High Speed Range</span>
                                        <span className="ek-desh-box__val">20 Mbps</span>
                                        <span className="ek-desh-box__sub">Max 1200 BDT / month</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tariff-list" style={{ marginTop: '2.5rem' }}>
                                {tariffSections.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <article
                                            key={item.id}
                                            id={item.id}
                                            className={`tariff-item ${activeSection === item.id ? 'tariff-item--highlighted' : ''}`}
                                            onClick={() => setActiveSection(item.id)}
                                        >
                                            <div className="tariff-item__title-row">
                                                <div className="tariff-item__icon-wrapper">
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="tariff-item__title">
                                                    <span className="tariff-item__num">{item.num}.</span> {item.title}
                                                </h3>
                                            </div>
                                            <div className="tariff-item__body">
                                                <p>{item.content}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="tariff-footer-note">
                            <p>
                                Would you like to review package pricing structures or custom speed rates? Check options on our pricing table.
                            </p>
                            <a href="/pricing" className="btn btn-secondary">
                                Explore Subscription Packages <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
