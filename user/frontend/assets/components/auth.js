// Fungsi untuk cek status login
export const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

// Fungsi untuk get user data
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Fungsi untuk set user data dan token
export const setUser = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
};

// Fungsi untuk logout
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login.html';
};

// Fungsi untuk cek login dan redirect
export const requireLogin = () => {
    if (!isLoggedIn()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
};

// Fungsi untuk get auth header
export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}; 