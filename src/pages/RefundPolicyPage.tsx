import { useState } from 'react';
import { Shield, FileText, ArrowRight, ChevronRight, RefreshCcw, Wallet, AlertTriangle, ShieldCheck, CreditCard, ShoppingBag, Settings, Scale } from 'lucide-react';
import './PageCommon.css';
import './RefundPolicyPage.css';

const refundSections = [
    {
        id: 'scope',
        num: 1,
        title: 'Scope of Policy',
        icon: ShieldCheck,
        content: 'This Return & Refund Policy is formulated in accordance with the Consumer Rights Protection Act 2009 of Bangladesh, guidelines from the Bangladesh Telecommunication Regulatory Commission (BTRC), and circulars from Bangladesh Bank governing digital payments. This policy governs refunds for connection setup fees, advance monthly ISP packages, and hardware components supplied by RM Communication Ltd.'
    },
    {
        id: 'installation',
        num: 2,
        title: 'Installation & Setup Fees',
        icon: Settings,
        content: 'Standard installation charges cover the cost of fiber optic drop wire overhead, patch cords, splicing works, and configuration support. In compliance with industrial ISP standards, installation fee and service initiation deposits are non-refundable once the physical cable installation is completed and the connection is active.'
    },
    {
        id: 'subscription',
        num: 3,
        title: 'Prepaid Subscriptions',
        icon: Wallet,
        content: 'Subscribers can cancel their month-to-month subscription at any time. Prepaid packages are fully refundable if we fail to deliver connectivity within 72 hours of payment due to technical feasibility issues. If a client terminates an active working connection mid-cycle, the refund for the unused days will be processed on a pro-rata basis subject to a 7-day prior written notice.'
    },
    {
        id: 'equipment',
        num: 4,
        title: 'Hardware Return (ONU/MC/Routers)',
        icon: ShoppingBag,
        content: 'Any Optical Network Unit (ONU), Media Converter (MC), or router leased or rented from the Company remains our property. Upon termination of service, the client must return the hardware in good working condition within 7 days. If a security deposit was taken for the hardware, it will be refunded in full upon verification of safe equipment return.'
    },
    {
        id: 'defective',
        num: 5,
        title: 'Defective Leased Hardware',
        icon: AlertTriangle,
        content: 'If the equipment provided by the Company develops a factory defect within the warranty period (excluding damage caused by power surges, physical drops, or unauthorized opening), we will replace/repair the hardware free of charge. If purchased directly, the manufacturer warranty terms of Bangladesh apply.'
    },
    {
        id: 'refund-timeline',
        num: 6,
        title: 'Refund Timelines & Channels',
        icon: CreditCard,
        content: 'Approved refunds will be processed within 7 to 15 working days according to Bangladesh Bank transaction regulations. Refunds will be sent to the original payment source (such as MFS accounts like bKash/Nagad, credit/debit cards, or direct bank transfer). Cash refunds are not supported for digital payments.'
    },
    {
        id: 'non-refundable',
        num: 7,
        title: 'Non-Refundable Services',
        icon: Shield,
        content: 'No refunds will be granted for outages arising from force majeure, global optical fiber cuts (e.g., SEA-ME-WE submarine cables), administrative utility tasks, or disconnection due to client violation of the Terms of Service (such as bandwidth reselling or downloading restricted materials).'
    },
    {
        id: 'conflict',
        num: 8,
        title: 'Disputes & Consumer Forum',
        icon: Scale,
        content: 'If you have a grievance concerning refunds, you can file a complaint with our Billing Grievance cell. If unresolved, clients are protected under the legal remedies of the National Consumer Rights Protection Department (DNCRP) and the BTRC consumer cell.'
    }
];

export default function RefundPolicyPage() {
    const [activeSection, setActiveSection] = useState('scope');

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
                    <span className="section-badge">Client Protection</span>
                    <h1 className="page-hero__title">Return & <span className="highlight">Refunds</span></h1>
                    <p className="page-hero__sub">
                        Learn about subscription cancellations, security deposits, and device return procedures according to Bangladesh consumer rights codes.
                    </p>
                </div>
            </div>

            <section className="section refund-section">
                <div className="container refund-layout">
                    {/* Sidebar Navigation */}
                    <aside className="refund-sidebar">
                        <div className="refund-sidebar__sticky">
                            <h3 className="refund-sidebar__title">
                                <FileText size={18} /> Sections
                            </h3>
                            <ul className="refund-sidebar__list">
                                {refundSections.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`refund-sidebar__btn ${activeSection === item.id ? 'active' : ''}`}
                                            onClick={() => handleScrollTo(item.id)}
                                        >
                                            <span className="refund-sidebar__num">{item.num}</span>
                                            <span className="refund-sidebar__text">{item.title}</span>
                                            <ChevronRight size={14} className="refund-sidebar__arrow" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Refund Content */}
                    <div className="refund-content">
                        <div className="refund-card">
                            <div className="refund-card__header">
                                <RefreshCcw size={24} className="refund-card__header-icon animate-spin-slow" />
                                <div>
                                    <h2>Return & Refund Policy</h2>
                                    <p>In accordance with DNCRP and BTRC Guidelines</p>
                                </div>
                            </div>

                            <div className="refund-introduction">
                                <p>
                                    At **RM Communication Ltd.**, clear terms represent our priority. The following return and refund rules are aligned with the state regulations of the People's Republic of Bangladesh.
                                </p>
                            </div>

                            <div className="refund-list">
                                {refundSections.map((sect) => {
                                    const Icon = sect.icon;
                                    return (
                                        <article
                                            key={sect.id}
                                            id={sect.id}
                                            className={`refund-item ${activeSection === sect.id ? 'refund-item--highlighted' : ''}`}
                                            onClick={() => setActiveSection(sect.id)}
                                        >
                                            <div className="refund-item__title-row">
                                                <div className="refund-item__icon-wrapper">
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="refund-item__title">
                                                    <span className="refund-item__num">{sect.num}.</span> {sect.title}
                                                </h3>
                                            </div>
                                            <div className="refund-item__body">
                                                <p>{sect.content}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="refund-footer-note">
                            <p>
                                Need to process a refund? Contact our dedicated accounting and billing support desk right away.
                            </p>
                            <a href="/contact" className="btn btn-secondary">
                                Submit Refund Ticket <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
