import { useState } from 'react';
import { Shield, FileText, ArrowRight, ChevronRight, Scale, Info, Users, Box, Truck, BarChart3, AlertTriangle, CloudRain, CreditCard, Lock, HelpCircle, DollarSign, RefreshCw } from 'lucide-react';
import './PageCommon.css';
import './TermsConditionsPage.css';

const termsList = [
    {
        id: 'identification',
        num: 1,
        title: 'Subscriber Identification',
        icon: Users,
        content: 'The Client must provide valid documentation for identification and verification. The Company reserves the right to verify this information and suspend or terminate services if false information is provided.'
    },
    {
        id: 'confidentiality',
        num: 2,
        title: 'Confidentiality',
        icon: Lock,
        content: 'Both parties agree to keep confidential any information explicitly marked as proprietary, except where required by law or already in the public domain.'
    },
    {
        id: 'ownership',
        num: 3,
        title: 'Ownership',
        icon: Box,
        content: 'All equipment provided by The Company for the delivery of services remains the sole property of The Company.'
    },
    {
        id: 'delivery',
        num: 4,
        title: 'Service Delivery',
        icon: Truck,
        content: 'The Company will endeavor to install services within the agreed timeline. The Company shall not be liable for delays due to circumstances beyond its reasonable control.'
    },
    {
        id: 'contention',
        num: 5,
        title: 'Contention Ratio',
        icon: BarChart3,
        content: 'Services are provided on a shared bandwidth basis (contention ratio). Speeds are subject to network utilization and fair usage policies.'
    },
    {
        id: 'prohibited',
        num: 6,
        title: 'Prohibited Use & Sharing',
        icon: AlertTriangle,
        content: 'The Client is strictly prohibited from reselling or sharing the connection with third parties. Breach of this policy will result in immediate termination and possible legal action.'
    },
    {
        id: 'interruptions',
        num: 7,
        title: 'Service Interruptions',
        icon: CloudRain,
        content: 'The Company is not liable for interruptions, downtime, or reduced speeds caused by force majeure, natural disasters, or external factors beyond our control.'
    },
    {
        id: 'payments',
        num: 8,
        title: 'Payments',
        icon: CreditCard,
        content: 'Payments must be made by the due date specified on the invoice. Failure to pay may result in service disconnection.'
    },
    {
        id: 'security',
        num: 9,
        title: 'Data Security',
        icon: Shield,
        content: 'While The Company employs industry-standard security measures, the Client is responsible for their own device security and browsing habits. The Company does not guarantee absolute protection against cyber threats.'
    },
    {
        id: 'support',
        num: 10,
        title: 'Technical Support',
        icon: HelpCircle,
        content: 'Support is provided for services rendered by The Company. Support for third-party hardware or software may incur additional charges.'
    },
    {
        id: 'fees',
        num: 11,
        title: 'Connection Fees',
        icon: DollarSign,
        content: 'Connection and installation fees are determined by the chosen package and location. Downgrade fees may apply to specific packages. The Company reserves the right to modify these fees upon notice.'
    },
    {
        id: 'modifications',
        num: 12,
        title: 'Modifications',
        icon: RefreshCw,
        content: 'The Company reserves the right to modify these Terms and Conditions at any time. Continued use of services constitutes acceptance of the updated terms.'
    },
    {
        id: 'liability',
        num: 13,
        title: 'Limitation of Liability',
        icon: Scale,
        content: 'The Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of its services.'
    },
    {
        id: 'law',
        num: 14,
        title: 'Governing Law',
        icon: Info,
        content: 'This agreement shall be governed by the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangladesh.'
    }
];

export default function TermsConditionsPage() {
    const [activeSection, setActiveSection] = useState('identification');

    const handleScrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120; // account for fixed header/navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="page-hero">
                <div className="page-hero__bg" />
                <div className="container">
                    <span className="section-badge">Legal Policy</span>
                    <h1 className="page-hero__title">Terms & <span className="highlight">Conditions</span></h1>
                    <p className="page-hero__sub">
                        Please read these terms carefully. By subscribing to RM Communication Ltd.'s services, you agree to be bound by these conditions.
                    </p>
                </div>
            </div>

            <section className="section terms-section">
                <div className="container terms-layout">
                    {/* Sidebar Nav */}
                    <aside className="terms-sidebar">
                        <div className="terms-sidebar__sticky">
                            <h3 className="terms-sidebar__title">
                                <FileText size={18} /> Table of Contents
                            </h3>
                            <ul className="terms-sidebar__list">
                                {termsList.map((term) => (
                                    <li key={term.id}>
                                        <button
                                            className={`terms-sidebar__btn ${activeSection === term.id ? 'active' : ''}`}
                                            onClick={() => handleScrollTo(term.id)}
                                        >
                                            <span className="terms-sidebar__num">{term.num}</span>
                                            <span className="terms-sidebar__text">{term.title}</span>
                                            <ChevronRight size={14} className="terms-sidebar__arrow" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Terms Content */}
                    <div className="terms-content">
                        <div className="terms-card">
                            <div className="terms-card__header">
                                <Shield size={24} className="terms-card__header-icon" />
                                <div>
                                    <h2>Agreement Terms & Policies</h2>
                                    <p>Effective Date: July 7, 2026</p>
                                </div>
                            </div>

                            <div className="terms-introduction">
                                <p>
                                    <strong>RM Communication Ltd.</strong> provides internet and communication services subject to the following Terms and Conditions. By subscribing to our services, the subscriber (<strong>"Client"</strong> or <strong>"Subscriber"</strong>) agrees to be bound by this agreement.
                                </p>
                            </div>

                            <div className="terms-list">
                                {termsList.map((term) => {
                                    const Icon = term.icon;
                                    return (
                                        <article
                                            key={term.id}
                                            id={term.id}
                                            className={`terms-item ${activeSection === term.id ? 'terms-item--highlighted' : ''}`}
                                            onClick={() => setActiveSection(term.id)}
                                        >
                                            <div className="terms-item__title-row">
                                                <div className="terms-item__icon-wrapper">
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="terms-item__title">
                                                    <span className="terms-item__num">{term.num}.</span> {term.title}
                                                </h3>
                                            </div>
                                            <div className="terms-item__body">
                                                <p>{term.content}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="terms-footer-note">
                            <p>
                                If you have any questions or need clarification regarding these Terms and Conditions, please reach out to our support team.
                            </p>
                            <a href="/contact" className="btn btn-secondary">
                                Contact Legal Support <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
