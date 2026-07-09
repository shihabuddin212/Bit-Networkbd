import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('rm_admin_auth') === 'true'
    );

    const handleLogin = () => setIsLoggedIn(true);

    const handleLogout = () => {
        localStorage.removeItem('rm_admin_auth');
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return <AdminPanel onLogout={handleLogout} />;
}
