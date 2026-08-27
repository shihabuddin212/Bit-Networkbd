import { useState } from 'react';
import { Wifi, Lock, Mail, AlertCircle } from 'lucide-react';
import './admin.css';

const ADMIN_CREDENTIALS = {
    username: 'admin@bitnetworkbd.com',
    password: 'Bit@admin1234',
};

interface AdminLoginProps {
    onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            if (
                username.trim() === ADMIN_CREDENTIALS.username &&
                password === ADMIN_CREDENTIALS.password
            ) {
                localStorage.setItem('rm_admin_auth', 'true');
                localStorage.setItem('rm_admin_auth_timestamp', Date.now().toString());
                onLogin();
            } else {
                setError('Invalid email or password. Please try again.');
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    <div className="admin-login-logo__icon">
                        <Wifi size={20} strokeWidth={2.5} />
                    </div>
                    <div className="admin-login-logo__text">
                        <h2>Bitnetworkbd</h2>
                        <p>Admin Control Panel</p>
                    </div>
                </div>

                <h1 className="admin-login-title">Welcome Back</h1>
                <p className="admin-login-sub">Sign in to manage your website content</p>

                {error && (
                    <div className="admin-login-error">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Email Address</label>
                        <div className="admin-form-input-wrap">
                            <span className="admin-form-input-icon">
                                <Mail size={16} />
                            </span>
                            <input
                                type="email"
                                className="admin-form-input"
                                placeholder="admin@bitnetworkbd.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Password</label>
                        <div className="admin-form-input-wrap">
                            <span className="admin-form-input-icon">
                                <Lock size={16} />
                            </span>
                            <input
                                type="password"
                                className="admin-form-input"
                                placeholder="••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="admin-btn admin-btn--primary admin-btn--full"
                        disabled={loading}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '1.5rem' }}>
                    Protected admin area — Bitnetworkbd Ltd.
                </p>
            </div>
        </div>
    );
}
