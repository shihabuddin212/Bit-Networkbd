import { useState } from 'react';
import {
    Mail, Phone, User, Calendar, Tag, Trash2,
    CheckCheck, MessageSquare, X, ChevronDown, ChevronUp,
    Search, Filter, StickyNote, Save, RotateCcw
} from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import type { MessageItem } from '../../utils/db';

const subjectLabels: Record<string, string> = {
    'new-connection': 'New Connection',
    'technical-support': 'Technical Support',
    'billing': 'Billing Query',
    'corporate': 'Corporate Package',
    'other': 'Other',
};

const statusConfig: Record<MessageItem['status'], { label: string; color: string; bg: string }> = {
    unread: { label: 'Unread', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
    read: { label: 'Read', color: 'var(--admin-text-muted)', bg: 'rgba(148,163,184,0.1)' },
    replied: { label: 'Replied', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
    resolved: { label: 'Resolved', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
};

export default function AdminMessages() {
    const { messages, updateMessages } = useDataStore();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [editingNotes, setEditingNotes] = useState<string | null>(null);
    const [noteDraft, setNoteDraft] = useState('');
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<MessageItem['status'] | 'all'>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Filter messages
    const filtered = messages.filter(msg => {
        const matchesSearch =
            msg.name.toLowerCase().includes(search.toLowerCase()) ||
            msg.email.toLowerCase().includes(search.toLowerCase()) ||
            msg.message.toLowerCase().includes(search.toLowerCase()) ||
            msg.subject.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const unreadCount = messages.filter(m => m.status === 'unread').length;

    const updateStatus = (id: string, status: MessageItem['status']) => {
        const updated = messages.map(m => m.id === id ? { ...m, status } : m);
        updateMessages(updated);
    };

    const saveNotes = (id: string) => {
        const updated = messages.map(m => m.id === id ? { ...m, notes: noteDraft } : m);
        updateMessages(updated);
        setEditingNotes(null);
    };

    const deleteMessage = (id: string) => {
        const updated = messages.filter(m => m.id !== id);
        updateMessages(updated);
        if (expandedId === id) setExpandedId(null);
        setDeleteConfirm(null);
    };

    const toggleExpand = (id: string, msg: MessageItem) => {
        if (expandedId === id) {
            setExpandedId(null);
            setEditingNotes(null);
        } else {
            setExpandedId(id);
            // Auto-mark as read on open
            if (msg.status === 'unread') updateStatus(id, 'read');
        }
    };

    const markAllRead = () => {
        const updated = messages.map(m => m.status === 'unread' ? { ...m, status: 'read' as const } : m);
        updateMessages(updated);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: '0.25rem' }}>
                        Support Messages
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                        {messages.length} total messages
                        {unreadCount > 0 && (
                            <span style={{ marginLeft: '0.5rem', background: 'rgba(251,191,36,0.18)', color: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '99px', fontWeight: 700, fontSize: '0.78rem' }}>
                                {unreadCount} unread
                            </span>
                        )}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                        onClick={markAllRead}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                        <CheckCheck size={14} /> Mark All Read
                    </button>
                )}
            </div>

            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name, email or message..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                            background: 'var(--admin-bg-card)', border: '1px solid var(--admin-border)',
                            borderRadius: '8px', color: 'var(--admin-text-primary)', fontSize: '0.875rem',
                        }}
                    />
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Filter size={14} style={{ color: 'var(--admin-text-muted)' }} />
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value as MessageItem['status'] | 'all')}
                        style={{
                            padding: '0.55rem 0.75rem', background: 'var(--admin-bg-card)',
                            border: '1px solid var(--admin-border)', borderRadius: '8px',
                            color: 'var(--admin-text-primary)', fontSize: '0.875rem', cursor: 'pointer',
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
            </div>

            {/* Message List */}
            {filtered.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '3rem', background: 'var(--admin-bg-card)',
                    border: '1px solid var(--admin-border)', borderRadius: '12px',
                    color: 'var(--admin-text-muted)'
                }}>
                    <MessageSquare size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
                    <p style={{ fontWeight: 600 }}>No messages found</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Try adjusting your search or filter</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filtered.map(msg => {
                        const isExpanded = expandedId === msg.id;
                        const sc = statusConfig[msg.status];
                        return (
                            <div
                                key={msg.id}
                                style={{
                                    background: 'var(--admin-bg-card)', border: '1px solid var(--admin-border)',
                                    borderRadius: '12px', overflow: 'hidden',
                                    borderLeft: msg.status === 'unread' ? '3px solid #fbbf24' : '3px solid transparent',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {/* Message Row Header */}
                                <div
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1rem 1.25rem', cursor: 'pointer',
                                        flexWrap: 'wrap'
                                    }}
                                    onClick={() => toggleExpand(msg.id, msg)}
                                >
                                    {/* Avatar */}
                                    <div style={{
                                        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                                        background: 'linear-gradient(135deg, var(--admin-accent), #7c3aed)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontWeight: 700, fontSize: '0.9rem'
                                    }}>
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: msg.status === 'unread' ? 700 : 600, color: 'var(--admin-text-primary)', fontSize: '0.9rem' }}>
                                                {msg.name}
                                            </span>
                                            <span style={{
                                                fontSize: '0.72rem', fontWeight: 600, padding: '0.1rem 0.5rem',
                                                borderRadius: '99px', color: sc.color, background: sc.bg,
                                                border: `1px solid ${sc.color}33`
                                            }}>
                                                {sc.label}
                                            </span>
                                            <span style={{
                                                fontSize: '0.72rem', fontWeight: 600, padding: '0.1rem 0.5rem',
                                                borderRadius: '99px', color: 'var(--admin-accent)',
                                                background: 'rgba(0,198,255,0.08)', border: '1px solid rgba(0,198,255,0.2)'
                                            }}>
                                                {subjectLabels[msg.subject] || msg.subject}
                                            </span>
                                        </div>
                                        <p style={{
                                            fontSize: '0.82rem', color: 'var(--admin-text-muted)',
                                            marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap', maxWidth: '500px'
                                        }}>
                                            {msg.message}
                                        </p>
                                    </div>

                                    {/* Date & Toggle */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                                            {msg.date}
                                        </span>
                                        {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--admin-text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--admin-text-muted)' }} />}
                                    </div>
                                </div>

                                {/* Expanded Detail Panel */}
                                {isExpanded && (
                                    <div style={{
                                        borderTop: '1px solid var(--admin-border)',
                                        padding: '1.25rem',
                                        background: 'rgba(0,0,0,0.04)',
                                        display: 'flex', flexDirection: 'column', gap: '1.25rem'
                                    }}>
                                        {/* Contact Details */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                            {[
                                                { icon: User, label: 'Sender', value: msg.name },
                                                { icon: Mail, label: 'Email', value: msg.email },
                                                { icon: Phone, label: 'Phone', value: msg.phone || '—' },
                                                { icon: Calendar, label: 'Received', value: msg.date },
                                                { icon: Tag, label: 'Subject', value: subjectLabels[msg.subject] || msg.subject },
                                            ].map(({ icon: Icon, label, value }) => (
                                                <div key={label} style={{
                                                    background: 'var(--admin-bg-card)', borderRadius: '8px',
                                                    padding: '0.6rem 0.85rem', border: '1px solid var(--admin-border)'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                                                        <Icon size={12} /> {label}
                                                    </div>
                                                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text-primary)' }}>{value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Full Message */}
                                        <div style={{
                                            background: 'var(--admin-bg-card)', borderRadius: '8px',
                                            padding: '1rem', border: '1px solid var(--admin-border)'
                                        }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <MessageSquare size={12} /> Message
                                            </p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-primary)', lineHeight: 1.7 }}>
                                                {msg.message}
                                            </p>
                                        </div>

                                        {/* Admin Notes */}
                                        <div style={{
                                            background: 'var(--admin-bg-card)', borderRadius: '8px',
                                            padding: '1rem', border: '1px solid var(--admin-border)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                    <StickyNote size={12} /> Admin Notes (private)
                                                </p>
                                                {editingNotes !== msg.id && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setEditingNotes(msg.id); setNoteDraft(msg.notes || ''); }}
                                                        style={{ fontSize: '0.75rem', color: 'var(--admin-accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                )}
                                            </div>
                                            {editingNotes === msg.id ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <textarea
                                                        value={noteDraft}
                                                        onChange={e => setNoteDraft(e.target.value)}
                                                        rows={3}
                                                        placeholder="Write your private admin notes here..."
                                                        onClick={e => e.stopPropagation()}
                                                        style={{
                                                            width: '100%', padding: '0.6rem 0.75rem', resize: 'vertical',
                                                            background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
                                                            borderRadius: '6px', color: 'var(--admin-text-primary)', fontSize: '0.875rem',
                                                        }}
                                                    />
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); saveNotes(msg.id); }}
                                                            className="admin-btn admin-btn--primary admin-btn--sm"
                                                            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                                                        >
                                                            <Save size={13} /> Save Notes
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setEditingNotes(null); }}
                                                            className="admin-btn admin-btn--ghost admin-btn--sm"
                                                            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                                                        >
                                                            <X size={13} /> Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p style={{ fontSize: '0.875rem', color: msg.notes ? 'var(--admin-text-primary)' : 'var(--admin-text-muted)', fontStyle: msg.notes ? 'normal' : 'italic' }}>
                                                    {msg.notes || 'No notes yet. Click Edit to add.'}
                                                </p>
                                            )}
                                        </div>

                                        {/* Action Bar */}
                                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginRight: '0.25rem' }}>Set Status:</span>
                                            {(['unread', 'read', 'replied', 'resolved'] as const).map(s => {
                                                const cfg = statusConfig[s];
                                                return (
                                                    <button
                                                        key={s}
                                                        onClick={() => updateStatus(msg.id, s)}
                                                        style={{
                                                            padding: '0.3rem 0.75rem', borderRadius: '99px', cursor: 'pointer',
                                                            fontSize: '0.78rem', fontWeight: 600,
                                                            border: msg.status === s ? `1.5px solid ${cfg.color}` : '1px solid var(--admin-border)',
                                                            background: msg.status === s ? cfg.bg : 'transparent',
                                                            color: msg.status === s ? cfg.color : 'var(--admin-text-muted)',
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                    >
                                                        {cfg.label}
                                                    </button>
                                                );
                                            })}

                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                                                <a
                                                    href={`mailto:${msg.email}`}
                                                    onClick={e => e.stopPropagation()}
                                                    className="admin-btn admin-btn--ghost admin-btn--sm"
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                                                >
                                                    <Mail size={13} /> Reply via Email
                                                </a>

                                                {deleteConfirm === msg.id ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <span style={{ fontSize: '0.78rem', color: '#f87171' }}>Are you sure?</span>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); deleteMessage(msg.id); }}
                                                            style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                                                        >
                                                            Yes, Delete
                                                        </button>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); setDeleteConfirm(null); }}
                                                            style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'transparent', color: 'var(--admin-text-muted)', border: '1px solid var(--admin-border)', cursor: 'pointer', fontSize: '0.78rem' }}
                                                        >
                                                            <RotateCcw size={11} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={e => { e.stopPropagation(); setDeleteConfirm(msg.id); }}
                                                        className="admin-btn admin-btn--ghost admin-btn--sm"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
                                                    >
                                                        <Trash2 size={13} /> Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Summary Footer */}
            {filtered.length > 0 && (
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--admin-text-muted)', paddingTop: '0.5rem' }}>
                    Showing {filtered.length} of {messages.length} messages
                </div>
            )}
        </div>
    );
}
