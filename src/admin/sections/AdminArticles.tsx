import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { db, renderIcon } from '../../utils/db';
import type { ArticleItem } from '../../utils/db';

const CATEGORIES: ArticleItem['category'][] = ['Home', 'Enterprise', 'Support', 'Guide'];
const ICON_OPTIONS = ['Shield', 'Wifi', 'Building2', 'HelpCircle', 'Globe', 'Zap', 'BookOpen', 'Server', 'Lock', 'Activity'];

function generateId() { return 'a-' + Date.now().toString(36); }

const today = () => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const emptyForm = (): Omit<ArticleItem, 'id'> => ({
    title: '',
    category: 'Guide',
    date: today(),
    readTime: '5 min read',
    author: 'RM Editorial',
    summary: '',
    content: [''],
    iconName: 'Shield',
    featuredPlan: '',
    ctaText: 'Learn More',
    ctaLink: '/pricing',
});

export default function AdminArticles() {
    const [articles, setArticles] = useState<ArticleItem[]>(db.getArticles());
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<ArticleItem | null>(null);
    const [form, setForm] = useState<Omit<ArticleItem, 'id'>>(emptyForm());
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const save = () => {
        if (!form.title.trim() || !form.summary.trim()) return;
        const cleanContent = form.content.filter((p) => p.trim() !== '');
        const payload = { ...form, content: cleanContent.length ? cleanContent : [''] };
        let updated: ArticleItem[];
        if (editing) {
            updated = articles.map((a) => (a.id === editing.id ? { ...payload, id: editing.id } : a));
        } else {
            updated = [{ ...payload, id: generateId() }, ...articles];
        }
        db.saveArticles(updated);
        setArticles(updated);
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm());
    };

    const openAdd = () => { setEditing(null); setForm(emptyForm()); setModalOpen(true); };
    const openEdit = (item: ArticleItem) => { setEditing(item); setForm({ ...item }); setModalOpen(true); };
    const remove = (id: string) => {
        const updated = articles.filter((a) => a.id !== id);
        db.saveArticles(updated);
        setArticles(updated);
        setDeleteConfirm(null);
    };

    const updateParagraph = (idx: number, val: string) => {
        const c = [...form.content]; c[idx] = val;
        setForm((f) => ({ ...f, content: c }));
    };
    const addParagraph = () => setForm((f) => ({ ...f, content: [...f.content, ''] }));
    const removeParagraph = (idx: number) => setForm((f) => ({ ...f, content: f.content.filter((_, i) => i !== idx) }));

    const catColor: Record<string, string> = { Home: 'primary', Enterprise: 'warning', Support: 'success', Guide: 'danger' };

    return (
        <div>
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Articles ({articles.length})</h3>
                    <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openAdd}><Plus size={14} /> New Article</button>
                </div>
                <div className="admin-panel__body" style={{ padding: 0 }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Read Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((a) => (
                                    <tr key={a.id}>
                                        <td><span style={{ color: 'var(--admin-primary)' }}>{renderIcon(a.iconName, { size: 18 })}</span></td>
                                        <td style={{ maxWidth: 250 }}><strong style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.title}</strong></td>
                                        <td><span className={`admin-badge admin-badge--${catColor[a.category] || 'primary'}`}>{a.category}</span></td>
                                        <td style={{ fontSize: '0.8rem' }}>{a.author}</td>
                                        <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{a.date}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{a.readTime}</td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => openEdit(a)}><Pencil size={13} /> Edit</button>
                                                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteConfirm(a.id)}><Trash2 size={13} /> Delete</button>
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
                            <h3 className="admin-modal__title">{editing ? 'Edit Article' : 'New Article'}</h3>
                            <button className="admin-modal__close" onClick={() => setModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            {/* Icon */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Icon</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {ICON_OPTIONS.map((icon) => (
                                        <button key={icon} onClick={() => setForm((f) => ({ ...f, iconName: icon }))}
                                            style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: form.iconName === icon ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border)', background: form.iconName === icon ? 'var(--admin-primary-dim)' : 'var(--admin-surface-2)', color: form.iconName === icon ? 'var(--admin-primary)' : 'var(--admin-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem' }}>
                                            {renderIcon(icon, { size: 13 })} {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Title *</label>
                                <input className="admin-form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Article title..." />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Category</label>
                                    <select className="admin-form-input admin-form-select" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ArticleItem['category'] }))}>
                                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Author</label>
                                    <input className="admin-form-input" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="Author name..." />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Date</label>
                                    <input className="admin-form-input" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="July 8, 2026" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Read Time</label>
                                    <input className="admin-form-input" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))} placeholder="5 min read" />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Summary *</label>
                                <textarea className="admin-form-input admin-form-textarea" value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} placeholder="Short article summary shown on cards..." />
                            </div>
                            {/* Content paragraphs */}
                            <div className="admin-form-group">
                                <label className="admin-form-label">Article Content (Paragraphs)</label>
                                {form.content.map((para, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                                        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', paddingTop: '0.8rem', minWidth: 20, textAlign: 'right' }}>{idx + 1}</span>
                                        <textarea className="admin-form-input admin-form-textarea" style={{ flex: 1, minHeight: 70 }} value={para} onChange={(e) => updateParagraph(idx, e.target.value)} placeholder={`Paragraph ${idx + 1}...`} />
                                        <button className="admin-btn admin-btn--danger admin-btn--sm" style={{ marginTop: '0.5rem' }} onClick={() => removeParagraph(idx)}><X size={12} /></button>
                                    </div>
                                ))}
                                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addParagraph}><Plus size={13} /> Add Paragraph</button>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Featured Plan (optional)</label>
                                    <input className="admin-form-input" value={form.featuredPlan || ''} onChange={(e) => setForm((f) => ({ ...f, featuredPlan: e.target.value }))} placeholder="e.g. Platinum+ (100 Mbps)" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA Button Text</label>
                                    <input className="admin-form-input" value={form.ctaText || ''} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} placeholder="e.g. Explore Packages" />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">CTA Link</label>
                                <input className="admin-form-input" value={form.ctaLink || ''} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} placeholder="/pricing" />
                            </div>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="admin-btn admin-btn--primary" onClick={save}><Save size={14} /> {editing ? 'Save Changes' : 'Publish Article'}</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal__header"><h3 className="admin-modal__title">Delete Article</h3><button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
                        <div className="admin-modal__body"><p style={{ color: 'var(--admin-text-secondary)' }}>Delete this article permanently? This cannot be undone.</p></div>
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
