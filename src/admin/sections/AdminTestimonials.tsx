import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Star, Quote } from 'lucide-react';
import { db } from '../../utils/db';
import type { TestimonialItem } from '../../utils/db';

const COLOR_OPTIONS = [
    '#00c6ff', '#7c3aed', '#f59e0b', '#4ade80', '#f43f5e', '#a78bfa',
    '#3b82f6', '#ec4899', '#06b6d4', '#10b981', '#6366f1', '#f97316'
];

function generateId() {
    return 't-' + Date.now().toString(36);
}

function getInitials(name: string): string {
    if (!name) return 'CU';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

const emptyForm = (): Omit<TestimonialItem, 'id'> => ({
    name: '',
    role: '',
    rating: 5,
    text: '',
    initials: 'CU',
    color: '#00c6ff',
});

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(db.getTestimonials());
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<TestimonialItem | null>(null);
    const [form, setForm] = useState<Omit<TestimonialItem, 'id'>>(emptyForm());
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const save = () => {
        if (!form.name.trim() || !form.text.trim()) return;
        const autoInitials = form.initials.trim() || getInitials(form.name);
        const itemToSave = { ...form, initials: autoInitials };

        let updated: TestimonialItem[];
        if (editing) {
            updated = testimonials.map((t) => (t.id === editing.id ? { ...itemToSave, id: editing.id } : t));
        } else {
            updated = [...testimonials, { ...itemToSave, id: generateId() }];
        }
        db.saveTestimonials(updated);
        setTestimonials(updated);
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm());
    };

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm());
        setModalOpen(true);
    };

    const openEdit = (item: TestimonialItem) => {
        setEditing(item);
        setForm({
            name: item.name,
            role: item.role,
            rating: item.rating,
            text: item.text,
            initials: item.initials || getInitials(item.name),
            color: item.color || '#00c6ff',
        });
        setModalOpen(true);
    };

    const remove = (id: string) => {
        const updated = testimonials.filter((t) => t.id !== id);
        db.saveTestimonials(updated);
        setTestimonials(updated);
        setDeleteConfirm(null);
    };

    const handleNameChange = (val: string) => {
        setForm((f) => ({
            ...f,
            name: val,
            initials: getInitials(val)
        }));
    };

    return (
        <div>
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Customers Say Reviews ({testimonials.length})</h3>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openAdd}>
                        <Plus size={14} /> Add Customer Review
                    </button>
                </div>
                <div className="admin-panel__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Role / Area</th>
                                    <th>Rating</th>
                                    <th>Review Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((t) => (
                                    <tr key={t.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                                <div
                                                    style={{
                                                        width: '34px',
                                                        height: '34px',
                                                        borderRadius: '50%',
                                                        background: `${t.color}22`,
                                                        color: t.color,
                                                        border: `1.5px solid ${t.color}`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 700,
                                                        fontSize: '0.75rem',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    {t.initials}
                                                </div>
                                                <div>
                                                    <strong>{t.name}</strong>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>
                                                {t.role || '—'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: t.color }}>
                                                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                                    <Star key={i} size={13} fill={t.color} color={t.color} />
                                                ))}
                                                <span style={{ marginLeft: '4px', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                                                    ({t.rating}/5)
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ maxWidth: 320 }}>
                                            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-start' }}>
                                                <Quote size={14} style={{ color: t.color, opacity: 0.6, flexShrink: 0, marginTop: '2px' }} />
                                                <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.85rem' }}>
                                                    {t.text}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => openEdit(t)}>
                                                    <Pencil size={13} /> Edit
                                                </button>
                                                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteConfirm(t.id)}>
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {testimonials.length === 0 && (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-text-muted)' }}>
                                            No customer reviews found. Click "Add Customer Review" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">{editing ? 'Edit Customer Review' : 'Add New Customer Review'}</h3>
                            <button className="admin-modal__close" onClick={() => setModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Customer Name *</label>
                                    <input
                                        className="admin-form-input"
                                        value={form.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="e.g. Rafiqul Islam..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Initials</label>
                                    <input
                                        className="admin-form-input"
                                        value={form.initials}
                                        maxLength={3}
                                        onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value.toUpperCase() }))}
                                        placeholder="e.g. RI"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Role / Location</label>
                                <input
                                    className="admin-form-input"
                                    value={form.role}
                                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                                    placeholder="e.g. Home User, Mirpur or Software Developer, Uttara..."
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Rating (1 - 5 Stars)</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setForm((f) => ({ ...f, rating: star }))}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0.2rem',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Star
                                                    size={22}
                                                    fill={star <= form.rating ? form.color : 'transparent'}
                                                    color={star <= form.rating ? form.color : 'var(--admin-border)'}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-form-label">Badge / Accent Color</label>
                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                        {COLOR_OPTIONS.map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setForm((f) => ({ ...f, color: c }))}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: c,
                                                    border: form.color === c ? '2px solid var(--admin-text-main)' : 'none',
                                                    cursor: 'pointer',
                                                    outline: form.color === c ? '2px solid ' + c : 'none',
                                                    outlineOffset: '1px'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Review Message *</label>
                                <textarea
                                    className="admin-form-input admin-form-textarea"
                                    style={{ minHeight: '100px' }}
                                    value={form.text}
                                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                                    placeholder="Write customer review content..."
                                />
                            </div>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="admin-btn admin-btn--primary" onClick={save}>
                                <Save size={14} /> {editing ? 'Save Changes' : 'Add Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">Delete Customer Review</h3>
                            <button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            <p style={{ color: 'var(--admin-text-secondary)' }}>
                                Are you sure you want to delete this customer review? This action cannot be undone.
                            </p>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="admin-btn admin-btn--danger" onClick={() => remove(deleteConfirm)}>
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
