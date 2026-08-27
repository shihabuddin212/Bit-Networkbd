import { Layers, Tag, FileText, DollarSign, MapPin, ArrowRight, MessageSquare, Quote } from 'lucide-react';
import { db } from '../../utils/db';

type Section = 'dashboard' | 'services' | 'offers' | 'articles' | 'pricing' | 'coverage' | 'messages' | 'testimonials';

interface AdminDashboardProps {
    onNavigate: (section: Section) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
    const allMessages = db.getMessages();
    const unreadCount = allMessages.filter(m => m.status === 'unread').length;

    const stats = [
        { label: 'Services', count: db.getServices().length, icon: Layers, color: '#00c6ff', section: 'services' as Section },
        { label: 'Offers', count: db.getOffers().length, icon: Tag, color: '#22c55e', section: 'offers' as Section },
        { label: 'Articles', count: db.getArticles().length, icon: FileText, color: '#f59e0b', section: 'articles' as Section },
        { label: 'Pricing Plans', count: db.getPricingPlans().length, icon: DollarSign, color: '#a78bfa', section: 'pricing' as Section },
        { label: 'Coverage Areas', count: db.getCoverageAreas().length, icon: MapPin, color: '#fb7185', section: 'coverage' as Section },
        { label: 'Customers Say', count: db.getTestimonials().length, icon: Quote, color: '#38bdf8', section: 'testimonials' as Section },
        { label: 'Messages', count: allMessages.length, icon: MessageSquare, color: '#fbbf24', section: 'messages' as Section, badge: unreadCount > 0 ? `${unreadCount} new` : undefined },
    ];

    const quickLinks = [
        { label: 'Add New Service', section: 'services' as Section, icon: Layers },
        { label: 'Post New Article', section: 'articles' as Section, icon: FileText },
        { label: 'Create New Offer', section: 'offers' as Section, icon: Tag },
        { label: 'Add Pricing Plan', section: 'pricing' as Section, icon: DollarSign },
        { label: 'Manage Coverage', section: 'coverage' as Section, icon: MapPin },
        { label: 'Manage Customers Say', section: 'testimonials' as Section, icon: Quote },
        { label: 'View Messages', section: 'messages' as Section, icon: MessageSquare },
    ];

    return (
        <div>
            {/* Stats */}
            <div className="admin-stats-grid">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="admin-stat-card"
                            style={{ cursor: 'pointer', position: 'relative' }}
                            onClick={() => onNavigate(stat.section)}
                        >
                            <div
                                className="admin-stat-card__icon"
                                style={{ background: `${stat.color}18`, color: stat.color }}
                            >
                                <Icon size={18} />
                            </div>
                            <div className="admin-stat-card__num">{stat.count}</div>
                            <div className="admin-stat-card__label">{stat.label}</div>
                            {'badge' in stat && stat.badge && (
                                <span style={{
                                    position: 'absolute', top: '0.6rem', right: '0.6rem',
                                    fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.45rem',
                                    borderRadius: '99px', background: 'rgba(251,191,36,0.18)',
                                    color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)'
                                }}>
                                    {stat.badge}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Quick Actions</h3>
                </div>
                <div className="admin-panel__body" style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <button
                                key={link.label}
                                className="admin-btn admin-btn--ghost"
                                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', width: '100%' }}
                                onClick={() => onNavigate(link.section)}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Icon size={15} /> {link.label}
                                </span>
                                <ArrowRight size={14} />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Info banner */}
            <div style={{
                background: 'rgba(0,198,255,0.06)',
                border: '1px solid rgba(0,198,255,0.15)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                fontSize: '0.875rem',
                color: 'var(--admin-text-secondary)',
                lineHeight: 1.6
            }}>
                <strong style={{ color: 'var(--admin-primary)', display: 'block', marginBottom: '0.4rem' }}>
                    ℹ️ How the Admin Panel Works
                </strong>
                All changes are saved to the browser's LocalStorage and <strong>immediately reflected</strong> on the live website.
                Navigate to the sections from the sidebar to add, edit or delete content for each section of the website.
            </div>
        </div>
    );
}
