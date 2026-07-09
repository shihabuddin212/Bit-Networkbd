import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Star } from 'lucide-react';
import { db } from '../../utils/db';
import type { PricingPlanItem } from '../../utils/db';

function generateId() { return 'p-' + Date.now().toString(36); }

const COLOR_OPTIONS = [
    '#94a3b8', '#f59e0b', '#00c6ff', '#60a5fa',
    '#818cf8', '#a78bfa', '#c084fc', '#fb7185',
    '#34d399', '#f97316',
];

const emptyForm = (): Omit<PricingPlanItem, 'id'> => ({
    name: '',
    speed: '',
    price: 0,
    period: 'month',
    features: [''],
    featured: false,
    badge: '',
    color: '#00c6ff',
});

export default function AdminPricing() {
    const [plans, setPlans] = useState<PricingPlanItem[]>(db.getPricingPlans());
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<PricingPlanItem | null>(null);
    const [form, setForm] = useState<Omit<PricingPlanItem, 'id'>>(emptyForm());
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const save = () => {
        if (!form.name.trim() || !form.speed.trim()) return;
        const cleanFeatures = form.features.filter((f) => f.trim() !== '');
        const payload = { ...form, features: cleanFeatures.length ? cleanFeatures : [''] };
        let updated: PricingPlanItem[];
        if (editing) {
            updated = plans.map((p) => (p.id === editing.id ? { ...payload, id: editing.id } : p));
        } else {
            updated = [...plans, { ...payload, id: generateId() }];
        }
        db.savePricingPlans(updated);
        setPlans(updated);
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm());
    };

    const openAdd = () => { setEditing(null); setForm(emptyForm()); setModalOpen(true); };
    const openEdit = (item: PricingPlanItem) => { setEditing(item); setForm({ ...item }); setModalOpen(true); };
    const remove = (id: string) => {
        const updated = plans.filter((p) => p.id !== id);
        db.savePricingPlans(updated);
        setPlans(updated);
        setDeleteConfirm(null);
    };

    const updateFeature = (idx: number, val: string) => {
        const f = [...form.features]; f[idx] = val;
        setForm((prev) => ({ ...prev, features: f }));
    };
    const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ''] }));
    const removeFeature = (idx: number) => setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));

    return (
        <div>
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Pricing Plans ({plans.length})</h3>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openAdd}><Plus size={14} /> Add Plan</button>
                </div>
                <div className="admin-panel__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Color</th>
                                    <th>Name</th>
                                    <th>Speed</th>
                                    <th>Price (TK)</th>
                                    <th>Features</th>
                                    <th>Badge</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: p.color, border: '2px solid rgba(255,255,255,0.15)' }} />
                                        </td>
                                        <td><strong>{p.name}</strong></td>
                                        <td>{p.speed}</td>
                                        <td><strong style={{ color: 'var(--admin-primary)' }}>{p.price.toLocaleString()} TK</strong></td>
                                        <td>{p.features.length} items</td>
                                        <td>
                                            {p.badge
                                                ? <span className="admin-badge admin-badge--warning">{p.badge}</span>
                                                : <span style={{ color: 'var(--admin-text-muted)' }}>—</span>
                                            }
                                        </td>
                                        <td>
                                            {p.featured
                                                ? <Star size={16} style={{ color: '#f59e0b' }} fill="#f59e0b" />
                                                : <span style={{ color: 'var(--admin-text-muted)' }}>—</span>
                                            }
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => openEdit(p)}><Pencil size={13} /> Edit</button>
                                                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteConfirm(p.id)}><Trash2 size={13} /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {modalOpen && (
                <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">{editing ? 'Edit Plan' : 'Add Pricing Plan'}</h3>
                            <button className="admin-modal__close" onClick={() => setModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            {/* Color picker */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Plan Color</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {COLOR_OPTIONS.map((c) => (
                                        <button key={c} onClick={() => setForm((f) => ({ ...f, color: c }))}
                                            style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: form.color === c ? '3px solid white' : '2px solid transparent', cursor: 'pointer', outline: form.color === c ? `2px solid ${c}` : 'none', outlineOffset: 2 }}
                                            title={c}
                                        />
                                    ))}
                                    <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                                        style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--admin-border)', cursor: 'pointer', background: 'transparent', padding: 0 }} title="Custom color" />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Plan Name *</label>
                                    <input className="admin-form-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Platinum+" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Speed *</label>
                                    <input className="admin-form-input" value={form.speed} onChange={(e) => setForm((f) => ({ ...f, speed: e.target.value }))} placeholder="e.g. 100 Mbps" />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Price (TK) *</label>
                                    <input type="number" className="admin-form-input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} placeholder="1260" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Period</label>
                                    <select className="admin-form-input admin-form-select" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}>
                                        <option value="month">Per Month</option>
                                        <option value="year">Per Year</option>
                                        <option value="quarter">Per Quarter</option>
                                    </select>
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Badge (optional)</label>
                                    <input className="admin-form-input" value={form.badge || ''} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="e.g. Most Popular, Max Speed" />
                                </div>
                                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.15rem' }}>
                                    <label className="admin-form-checkbox">
                                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
                                        Mark as Featured Plan
                                    </label>
                                </div>
                            </div>
                            {/* Features */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Features Included</label>
                                {form.features.map((feat, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.45rem', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.72rem', minWidth: 20, textAlign: 'right' }}>{idx + 1}</span>
                                        <input className="admin-form-input" style={{ marginBottom: 0 }} value={feat} onChange={(e) => updateFeature(idx, e.target.value)} placeholder={`Feature ${idx + 1}`} />
                                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeFeature(idx)}><X size={12} /></button>
                                    </div>
                                ))}
                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addFeature} style={{ marginTop: '0.25rem' }}><Plus size={13} /> Add Feature</button>
                            </div>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="admin-btn admin-btn--primary" onClick={save}><Save size={14} /> {editing ? 'Save Changes' : 'Add Plan'}</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal__header"><h3 className="admin-modal__title">Delete Plan</h3><button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
                        <div className="admin-modal__body"><p style={{ color: 'var(--admin-text-secondary)' }}>Delete this pricing plan? This cannot be undone.</p></div>
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
