import { useState } from 'react';
import { Shield, FileText, ArrowRight, ChevronRight, Check, Eye, Trash2, ShieldAlert, Award, Radio, HelpCircle, HardDrive, RefreshCw } from 'lucide-react';
import './PageCommon.css';
import './PrivacyPolicyPage.css';

const privacySections = [
    {
        id: 'introduction',
        num: 1,
        title: 'Introduction & Legal Scope',
        icon: Eye,
        content: 'RM Communication Ltd. is committed to protecting your privacy online. This Privacy Policy is formulated in compliance with the Information and Communication Technology (ICT) Act 2006 (Amended), the Cyber Security Act of Bangladesh, and general regulations set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). It governs the collection, storage, processing, and usage of your personal data when subscribing to our internet services.'
    },
    {
        id: 'collection',
        num: 2,
        title: 'Information We Collect',
        icon: HardDrive,
        content: 'To provide high-quality internet and telecom services, we collect necessary personal information including: your full name, national identification number (NID) or passport number, telephone numbers, billing/installation addresses, email addresses, payment/transaction details, and technical network attributes (such as assigned IP addresses, MAC addresses, router details, and user portal login credentials).'
    },
    {
        id: 'usage',
        num: 3,
        title: 'How We Use Your Data',
        icon: Radio,
        content: 'Your information is processed to process subscriptions, execute installation, manage billing, offer targeted customer support, optimize network performance, prevent bandwidth abuse, and comply with security compliance standards.'
    },
    {
        id: 'data-retention',
        num: 4,
        title: 'Data Retention & Logging',
        icon: ShieldAlert,
        content: 'Pursuant to the directives and licensing conditions of the Bangladesh Telecommunication Regulatory Commission (BTRC), we retain internet traffic logs, IP allocation records, and system logs for a mandatory minimum duration. Personal billing information is retained as long as your account is active, or as required by national tax and accounting laws.'
    },
    {
        id: 'security',
        num: 5,
        title: 'Information Security Protocols',
        icon: Shield,
        content: 'We employ industry-standard technologies and security policies (including secure firewalls, database encryption, and access controls) to guard your personal data against unauthorized access, manipulation, disclosure, or destruction. We limit internal staff access on a strict need-to-know basis.'
    },
    {
        id: 'lawful-disclosure',
        num: 6,
        title: 'Lawful Disclosures & Interception',
        icon: Award,
        content: 'As a licensed ISP under BTRC, RM Communication Ltd. is legally obligated to cooperate with government agencies, security organisations, and law enforcement agencies. We will disclose necessary traffic details or subscriber information under legitimate warrants, court orders, or official directives in accordance with the laws of Bangladesh.'
    },
    {
        id: 'third-party',
        num: 7,
        title: 'Third Party Sharing',
        icon: Trash2,
        content: 'Except as required by lawful authority, we do not rent, sell, or trade your personal information to third parties. We may share selected data with trusted partners (such as bank gateways, SMS senders, or delivery agents) solely to facilitate transaction payments or service operations.'
    },
    {
        id: 'cookies',
        num: 8,
        title: 'Cookies & Analytics',
        icon: RefreshCw,
        content: 'Our corporate website and selfcare portal use cookies and session logging to study website navigation, maintain your user dashboard security, and offer personalized portal settings. You can modify your browser settings to decline cookies, though this may disable certain portal utilities.'
    },
    {
        id: 'rights',
        num: 9,
        title: 'Your Legal Rights',
        icon: Check,
        content: 'Subject to verifying ownership, subscribers have the right to review their personal files, update inaccurate or old information, request the closure of their profile (upon disconnection and clearance of dues), and enquire about the utilization of their registered detail data.'
    },
    {
        id: 'updates',
        num: 10,
        title: 'Updates to this Policy',
        icon: HelpCircle,
        content: 'RM Communication Ltd. reserves the right to review and update this Privacy Policy to match evolving BTRC regulations, technological changes, and local laws. All changes will be posted here on our website. Continued usage of our services constitutes acceptance of the published policy.'
    }
];

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState('introduction');

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
                    <span className="section-badge">Data Protection</span>
                    <h1 className="page-hero__title">Privacy <span className="highlight">Policy</span></h1>
                    <p className="page-hero__sub">
                        How we protect, manage, and secure your personal data in accordance with BTRC guidelines and Bangladesh internet laws.
                    </p>
                </div>
            </div>

            <section className="section privacy-section">
                <div className="container privacy-layout">
                    {/* Sidebar Navigation */}
                    <aside className="privacy-sidebar">
                        <div className="privacy-sidebar__sticky">
                            <h3 className="privacy-sidebar__title">
                                <FileText size={18} /> Sections
                            </h3>
                            <ul className="privacy-sidebar__list">
                                {privacySections.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`privacy-sidebar__btn ${activeSection === item.id ? 'active' : ''}`}
                                            onClick={() => handleScrollTo(item.id)}
                                        >
                                            <span className="privacy-sidebar__num">{item.num}</span>
                                            <span className="privacy-sidebar__text">{item.title}</span>
                                            <ChevronRight size={14} className="privacy-sidebar__arrow" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Privacy Content */}
                    <div className="privacy-content">
                        <div className="privacy-card">
                            <div className="privacy-card__header">
                                <Shield size={24} className="privacy-card__header-icon" />
                                <div>
                                    <h2>Privacy and Data Practices</h2>
                                    <p>In accordance with Digital Security / BTRC standards</p>
                                </div>
                            </div>

                            <div className="privacy-introduction">
                                <p>
                                    This policy outlines how **RM Communication Ltd.** collected data is processed. Your privacy is protected under legal frameworks established by the BTRC and Bangladesh Government. By subscribing, you agree to these guidelines terms.
                                </p>
                            </div>

                            <div className="privacy-list">
                                {privacySections.map((sect) => {
                                    const Icon = sect.icon;
                                    return (
                                        <article
                                            key={sect.id}
                                            id={sect.id}
                                            className={`privacy-item ${activeSection === sect.id ? 'privacy-item--highlighted' : ''}`}
                                            onClick={() => setActiveSection(sect.id)}
                                        >
                                            <div className="privacy-item__title-row">
                                                <div className="privacy-item__icon-wrapper">
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="privacy-item__title">
                                                    <span className="privacy-item__num">{sect.num}.</span> {sect.title}
                                                </h3>
                                            </div>
                                            <div className="privacy-item__body">
                                                <p>{sect.content}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="privacy-footer-note">
                            <p>
                                Any data safety concerns or requests can be directed straight to our privacy grievance officer.
                            </p>
                            <a href="/contact" className="btn btn-secondary">
                                Inquire Support Desk <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
