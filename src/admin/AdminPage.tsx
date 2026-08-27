import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

function checkAuth(): boolean {
    const isAuth = localStorage.getItem('rm_admin_auth') === 'true';
    const timestampStr = localStorage.getItem('rm_admin_auth_timestamp');
    if (!isAuth || !timestampStr) {
        return false;
    }
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || Date.now() - timestamp > SESSION_DURATION) {
        localStorage.removeItem('rm_admin_auth');
        localStorage.removeItem('rm_admin_auth_timestamp');
        return false;
    }
    return true;
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());

    useEffect(() => {
        const isValid = checkAuth();
        if (!isValid && isLoggedIn) {
            setIsLoggedIn(false);
        }

        // Periodically check if session has expired
        const interval = setInterval(() => {
            const stillValid = checkAuth();
            if (!stillValid) {
                setIsLoggedIn(false);
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, [isLoggedIn]);

    const handleLogin = () => setIsLoggedIn(true);

    const handleLogout = () => {
        localStorage.removeItem('rm_admin_auth');
        localStorage.removeItem('rm_admin_auth_timestamp');
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return <AdminPanel onLogout={handleLogout} />;
}
