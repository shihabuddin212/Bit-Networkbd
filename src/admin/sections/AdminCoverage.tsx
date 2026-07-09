import { useState } from 'react';
import { Plus, Trash2, X, Save, MapPin, Search } from 'lucide-react';
import { db } from '../../utils/db';

export default function AdminCoverage() {
    const [areas, setAreas] = useState<string[]>(db.getCoverageAreas());
    const [newArea, setNewArea] = useState('');
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [bulkInput, setBulkInput] = useState('');
    const [bulkMode, setBulkMode] = useState(false);

    const addArea = () => {
        const trimmed = newArea.trim();
        if (!trimmed || areas.includes(trimmed)) return;
        const updated = [...areas, trimmed];
        db.saveCoverageAreas(updated);
        setAreas(updated);
        setNewArea('');
    };

    const addBulk = () => {
        const newOnes = bulkInput
            .split('\n')
            .map((a) => a.trim())
            .filter((a) => a && !areas.includes(a));
        if (!newOnes.length) return;
        const updated = [...areas, ...newOnes];
        db.saveCoverageAreas(updated);
        setAreas(updated);
        setBulkInput('');
        setBulkMode(false);
    };

    const remove = (area: string) => {
        const updated = areas.filter((a) => a !== area);
        db.saveCoverageAreas(updated);
        setAreas(updated);
        setDeleteConfirm(null);
    };

    const filtered = search.trim()
        ? areas.filter((a) => a.toLowerCase().includes(search.toLowerCase()))
        : areas;

    return (
        <div>
            {/* Add Area Panel */}
            <div className="admin-panel" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title"><MapPin size={15} /> Add New Coverage Area</h3>
                    <button
                        className={`admin-btn admin-btn--sm ${bulkMode ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
                        onClick={() => setBulkMode(!bulkMode)}
                    >
                        {bulkMode ? 'Single Mode' : 'Bulk Add'}
                    </button>
                </div>
                <div className="admin-panel__body">
                    {!bulkMode ? (
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                            <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
                                <label className="admin-form-label">Area Name</label>
                                <input
                                    className="admin-form-input"
                                    value={newArea}
                                    onChange={(e) => setNewArea(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addArea()}
                                    placeholder="e.g. Uttara, Mirpur..."
                                />
                            </div>
                            <button className="admin-btn admin-btn--primary" onClick={addArea} disabled={!newArea.trim()}>
                                <Plus size={14} /> Add Area
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Paste areas (one per line)</label>
                                <textarea
                                    className="admin-form-input admin-form-textarea"
                                    style={{ minHeight: 120 }}
                                    value={bulkInput}
                                    onChange={(e) => setBulkInput(e.target.value)}
                                    placeholder={"Badda\nRampura\nBanasree\nAftabnagar..."}
                                />
                            </div>
                            <button className="admin-btn admin-btn--primary" onClick={addBulk} disabled={!bulkInput.trim()}>
                                <Save size={14} /> Add All Areas
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Coverage List Panel */}
            <div className="admin-panel">
                <div className="admin-panel__header">
                    <h3 className="admin-panel__title">Coverage Areas ({areas.length} total / {filtered.length} shown)</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--admin-surface-2)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.35rem 0.75rem' }}>
                        <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
                        <input
                            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--admin-text)', fontSize: '0.875rem', width: 160 }}
                            placeholder="Search areas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="admin-panel__body">
                    {filtered.length === 0 ? (
                        <p style={{ color: 'var(--admin-text-muted)', textAlign: 'center', padding: '2rem' }}>
                            {search ? 'No areas match your search.' : 'No coverage areas added yet.'}
                        </p>
                    ) : (
                        <div className="coverage-chips">
                            {filtered.map((area) => (
                                <div key={area} className="coverage-chip">
                                    <MapPin size={11} />
                                    {area}
                                    <button
                                        className="coverage-chip__remove"
                                        onClick={() => setDeleteConfirm(area)}
                                        title={`Remove ${area}`}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal" style={{ maxWidth: 420 }}>
                        <div className="admin-modal__header">
                            <h3 className="admin-modal__title">Remove Coverage Area</h3>
                            <button className="admin-modal__close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
                        </div>
                        <div className="admin-modal__body">
                            <p style={{ color: 'var(--admin-text-secondary)' }}>
                                Remove <strong style={{ color: 'var(--admin-text)' }}>{deleteConfirm}</strong> from coverage areas?
                            </p>
                        </div>
                        <div className="admin-modal__footer">
                            <button className="admin-btn admin-btn--ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="admin-btn admin-btn--danger" onClick={() => remove(deleteConfirm)}>
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
