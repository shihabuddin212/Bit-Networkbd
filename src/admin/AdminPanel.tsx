import { useState } from 'react';
import {
    Wifi, LayoutDashboard, Layers, Tag, FileText, DollarSign,
    MapPin, LogOut, Menu, X, ChevronRight, Sun, Moon, MessageSquare, Quote
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AdminDashboard from './sections/AdminDashboard';
import AdminServices from './sections/AdminServices';
import AdminOffers from './sections/AdminOffers';
import AdminArticles from './sections/AdminArticles';
import AdminPricing from './sections/AdminPricing';
import AdminCoverage from './sections/AdminCoverage';
import AdminMessages from './sections/AdminMessages';
import AdminTestimonials from './sections/AdminTestimonials';
import './admin.css';

type Section = 'dashboard' | 'services' | 'offers' | 'articles' | 'pricing' | 'coverage' | 'messages' | 'testimonials';

interface AdminPanelProps {
    onLogout: () => void;
}

const navItems = [
    { id: 'dashboard' as Section, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services' as Section, label: 'Services & Solutions', icon: Layers },
    { id: 'offers' as Section, label: 'Offers', icon: Tag },
    { id: 'articles' as Section, label: 'Articles', icon: FileText },
    { id: 'pricing' as Section, label: 'Pricing Packages', icon: DollarSign },
    { id: 'coverage' as Section, label: 'Coverage Areas', icon: MapPin },
    { id: 'messages' as Section, label: 'Messages', icon: MessageSquare },
    { id: 'testimonials' as Section, label: 'Customers Say', icon: Quote },
];

const sectionTitles: Record<Section, string> = {
    dashboard: 'Dashboard Overview',
    services: 'Services & Solutions',
    offers: 'Promotional Offers',
    articles: 'Articles & Insights',
    pricing: 'Pricing Packages',
    coverage: 'Coverage Areas',
    messages: 'Messages & Inquiries',
    testimonials: 'What Our Customers Say (Reviews)',
};

export default function AdminPanel({ onLogout }: AdminPanelProps) {
    const [activeSection, setActiveSection] = useState<Section>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navigate = (section: Section) => {
        setActiveSection(section);
        setSidebarOpen(false);
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
                <div className="admin-sidebar__logo">
                    <div className="admin-sidebar__logo-icon">
                        <Wifi size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div className="admin-sidebar__logo-name">Bitnetworkbd</div>
                        <div className="admin-sidebar__logo-sub">Admin Panel</div>
                    </div>
                </div>

                <nav className="admin-sidebar__nav">
                    <div className="admin-sidebar__section-label">Navigation</div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`admin-sidebar__link ${activeSection === item.id ? 'admin-sidebar__link--active' : ''}`}
                                onClick={() => navigate(item.id)}
                            >
                                <Icon size={16} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="admin-sidebar__footer">
                    <button className="admin-sidebar__link" onClick={onLogout} style={{ color: '#fca5a5' }}>
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="admin-topbar__left">
                        <button
                            className="admin-topbar__hamburger"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle menu"
                        >
                            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <h1 className="admin-topbar__title">{sectionTitles[activeSection]}</h1>
                    </div>
                    <div className="admin-topbar__right">
                        <button
                            className="admin-btn admin-btn--ghost admin-btn--sm"
                            onClick={toggleTheme}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                border: '1px solid var(--admin-border)',
                                padding: '0.4rem 0.75rem',
                                color: 'var(--admin-text-secondary)',
                                background: 'transparent'
                            }}
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                {theme === 'dark' ? 'Day' : 'Night'}
                            </span>
                        </button>
                        <span className="admin-topbar__badge">Admin</span>
                        <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={onLogout}>
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Breadcrumb */}
                <div style={{ padding: '0.6rem 1.75rem', borderBottom: '1px solid var(--admin-border)', fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Admin <ChevronRight size={12} /> {sectionTitles[activeSection]}
                </div>

                <div className="admin-content">
                    {activeSection === 'dashboard' && <AdminDashboard onNavigate={navigate} />}
                    {activeSection === 'services' && <AdminServices />}
                    {activeSection === 'offers' && <AdminOffers />}
                    {activeSection === 'articles' && <AdminArticles />}
                    {activeSection === 'pricing' && <AdminPricing />}
                    {activeSection === 'coverage' && <AdminCoverage />}
                    {activeSection === 'messages' && <AdminMessages />}
                    {activeSection === 'testimonials' && <AdminTestimonials />}
                </div>
            </main>
        </div>
    );
}
