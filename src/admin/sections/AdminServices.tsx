import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { db, renderIcon } from '../../utils/db';
import type { ServiceItem } from '../../utils/db';

const ICON_OPTIONS = [
    'Wifi', 'Shield', 'Building2', 'Server', 'Network', 'Camera',
    'Database', 'Globe', 'Zap', 'Lock', 'Cloud', 'Radio', 'Monitor',
    'Cpu', 'Activity', 'Link', 'Settings', 'Phone'
];

function generateId() {
    return 's-' + Date.now().toString(36);
}

const emptyForm = (): Omit<ServiceItem, 'id'> => ({
    iconName: 'Wifi',
    title: '',
    description: '',
    badge: null,
});

export default function AdminServices() {
    const [services, setServices] = useState<ServiceItem[]>(db.getServices());
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<ServiceItem | null>(null);
    const [form, setForm] = useState<Omit<ServiceItem, 'id'>>(emptyForm());
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const save = () => {
        if (!form.title.trim() || !form.description.trim()) return;
        let updated: ServiceItem[];
        if (editing) {
            updated = services.map((s) => (s.id === editing.id ? { ...form, id: editing.id } : s));
        } else {
            updated = [...services, { ...form, id: generateId() }];
        }
        db.saveServices(updated);
        setServices(updated);
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm());
    };

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm());
        setModalOpen(true);
    };

    const openEdit = (item: ServiceItem) => {
        setEditing(item);
        setForm({ iconName: item.iconName, title: item.title, description: item.description, badge: item.badge });
        setModalOpen(true);
    };

    const remove = (id: string) => {
        const updated = services.filter((s) => s.id !== id);
        db.saveServices(updated);
        setServices(updated);
        setDeleteConfirm(null);
    };

    return (
        <div>
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Services List ({services.length})</h3>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openAdd}>
                        <Plus size={14} /> Add Service
                    </button>
                </div>
                <div className="admin-panel__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Badge</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((s) => (
                                    <tr key={s.id}>
                                        <td>
                                            <div style={{ color: 'var(--admin-primary)' }}>
                                                {renderIcon(s.iconName, { size: 18 })}
                                            </div>
                                        </td>
                                        <td><strong>{s.title}</strong></td>
                                        <td style={{ maxWidth: 280 }}>
                                            <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {s.description}
                                            </span>
                                        </td>
                                        <td>
                                            {s.badge ? (
                                                <span className="admin-badge admin-badge--primary">{s.badge}</span>
                                            ) : (
                                                <span style={{ color: 'var(--admin-text-muted)' }}>—</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => openEdit(s)}>
                                                    <Pencil size={13} /> Edit
                                                </button>
                                                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteConfirm(s.id)}>
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit/Add Modal */}
            {modalOpen && (
                <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">{editing ? 'Edit Service' : 'Add New Service'}</h3>
                            <button className="admin-modal__close" onClick={() => setModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            <div className="admin-form-group">
                                <label className="admin-form-label">Select Icon</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {ICON_OPTIONS.map((icon) => (
                                        <button
                                            key={icon}
                                            onClick={() => setForm((f) => ({ ...f, iconName: icon }))}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '8px',
                                                border: form.iconName === icon ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border)',
                                                background: form.iconName === icon ? 'var(--admin-primary-dim)' : 'var(--admin-surface-2)',
                                                color: form.iconName === icon ? 'var(--admin-primary)' : 'var(--admin-text-muted)',
                                                cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '0.35rem',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {renderIcon(icon, { size: 14 })} {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Title *</label>
                                <input
                                    className="admin-form-input"
                                    value={form.title}
                                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                    placeholder="Service title..."
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Description *</label>
                                <textarea
                                    className="admin-form-input admin-form-textarea"
                                    value={form.description}
                                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                    placeholder="Short description..."
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Badge (optional)</label>
                                <input
                                    className="admin-form-input"
                                    value={form.badge || ''}
                                    onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value || null }))}
                                    placeholder="e.g. Popular, Business, Enterprise..."
                                />
                            </div>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="admin-btn admin-btn--primary" onClick={save}>
                                <Save size={14} /> {editing ? 'Save Changes' : 'Add Service'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">Delete Service</h3>
                            <button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            <p style={{ color: 'var(--admin-text-secondary)' }}>
                                Are you sure you want to delete this service? This action cannot be undone.
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
