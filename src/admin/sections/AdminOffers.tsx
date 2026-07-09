import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, CheckCircle2 } from 'lucide-react';
import { db, renderIcon } from '../../utils/db';
import type { OfferItem } from '../../utils/db';

const ICON_OPTIONS = ['Zap', 'Gift', 'Award', 'Star', 'Tag', 'Percent', 'Sparkles', 'Rocket', 'Trophy', 'BadgeCheck'];

function generateId() { return 'o-' + Date.now().toString(36); }

const emptyForm = (): Omit<OfferItem, 'id'> => ({
    title: '',
    badge: '',
    description: '',
    iconName: 'Gift',
    highlights: [''],
    ctaText: 'Learn More',
    ctaLink: '/pricing',
});

export default function AdminOffers() {
    const [offers, setOffers] = useState<OfferItem[]>(db.getOffers());
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<OfferItem | null>(null);
    const [form, setForm] = useState<Omit<OfferItem, 'id'>>(emptyForm());
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const save = () => {
        if (!form.title.trim() || !form.description.trim()) return;
        const cleanedHighlights = form.highlights.filter((h) => h.trim() !== '');
        const payload = { ...form, highlights: cleanedHighlights };
        let updated: OfferItem[];
        if (editing) {
            updated = offers.map((o) => (o.id === editing.id ? { ...payload, id: editing.id } : o));
        } else {
            updated = [...offers, { ...payload, id: generateId() }];
        }
        db.saveOffers(updated);
        setOffers(updated);
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm());
    };

    const openAdd = () => { setEditing(null); setForm(emptyForm()); setModalOpen(true); };
    const openEdit = (item: OfferItem) => {
        setEditing(item);
        setForm({ ...item });
        setModalOpen(true);
    };

    const remove = (id: string) => {
        const updated = offers.filter((o) => o.id !== id);
        db.saveOffers(updated);
        setOffers(updated);
        setDeleteConfirm(null);
    };

    const updateHighlight = (idx: number, val: string) => {
        const h = [...form.highlights];
        h[idx] = val;
        setForm((f) => ({ ...f, highlights: h }));
    };

    const addHighlight = () => setForm((f) => ({ ...f, highlights: [...f.highlights, ''] }));
    const removeHighlight = (idx: number) => setForm((f) => ({ ...f, highlights: f.highlights.filter((_, i) => i !== idx) }));

    return (
        <div>
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Active Offers ({offers.length})</h3>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openAdd}>
                        <Plus size={14} /> Add Offer
                    </button>
                </div>
                <div className="admin-panel__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Title</th>
                                    <th>Badge</th>
                                    <th>Highlights</th>
                                    <th>CTA</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.map((o) => (
                                    <tr key={o.id}>
                                        <td><span style={{ color: 'var(--admin-primary)' }}>{renderIcon(o.iconName, { size: 18 })}</span></td>
                                        <td><strong>{o.title}</strong></td>
                                        <td><span className="admin-badge admin-badge--warning">{o.badge}</span></td>
                                        <td>{o.highlights.length} items</td>
                                        <td style={{ fontSize: '0.8rem' }}>{o.ctaText}</td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => openEdit(o)}><Pencil size={13} /> Edit</button>
                                                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteConfirm(o.id)}><Trash2 size={13} /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">{editing ? 'Edit Offer' : 'Add New Offer'}</h3>
                            <button className="admin-modal__close" onClick={() => setModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            {/* Icon picker */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Icon</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {ICON_OPTIONS.map((icon) => (
                                        <button key={icon} onClick={() => setForm((f) => ({ ...f, iconName: icon }))}
                                            style={{ padding: '0.45rem 0.65rem', borderRadius: '8px', border: form.iconName === icon ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border)', background: form.iconName === icon ? 'var(--admin-primary-dim)' : 'var(--admin-surface-2)', color: form.iconName === icon ? 'var(--admin-primary)' : 'var(--admin-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                                            {renderIcon(icon, { size: 13 })} {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Title *</label>
                                    <input className="admin-form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Offer title..." />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Badge Label *</label>
                                    <input className="admin-form-input" value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="e.g. Hot Deal, Limited Time..." />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Description *</label>
                                <textarea className="admin-form-input admin-form-textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Offer description..." />
                            </div>
                            {/* Highlights */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Highlights</label>
                                {form.highlights.map((h, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                        <CheckCircle2 size={14} style={{ color: 'var(--admin-primary)', flexShrink: 0 }} />
                                        <input className="admin-form-input" style={{ marginBottom: 0 }} value={h} onChange={(e) => updateHighlight(idx, e.target.value)} placeholder={`Highlight ${idx + 1}`} />
                                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeHighlight(idx)}><X size={12} /></button>
                                    </div>
                                ))}
                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addHighlight} style={{ marginTop: '0.25rem' }}><Plus size={13} /> Add Highlight</button>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA Button Text</label>
                                    <input className="admin-form-input" value={form.ctaText} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} placeholder="e.g. Get Started" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA Link</label>
                                    <input className="admin-form-input" value={form.ctaLink} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} placeholder="/pricing" />
                                </div>
                            </div>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="admin-btn admin-btn--primary" onClick={save}><Save size={14} /> {editing ? 'Save Changes' : 'Add Offer'}</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal__header"><h3 className="admin-modal__title">Delete Offer</h3><button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
                        <div className="admin-modal__body"><p style={{ color: 'var(--admin-text-secondary)' }}>Are you sure? This cannot be undone.</p></div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="admin-btn admin-btn--danger" onClick={() => remove(deleteConfirm)}><Trash2 size={14} /> Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
