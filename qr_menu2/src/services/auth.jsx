// src/services/auth.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Django backend URL'niz

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/token/`, {
            username,
            password,
        });
        // Token'ları localStorage'a kaydet
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response.data; // Kullanıcı ve token bilgilerini döndür
    } catch (error) {
        console.error('Giriş başarısız:', error.response ? error.response.data : error.message);
        throw error; // Hatayı yukarı fırlat
    }
};

const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) {
            throw new Error('Yenileme tokenı bulunamadı.');
        }
        const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
            refresh,
        });
        localStorage.setItem('access_token', response.data.access);
        return response.data.access; // Yeni access token'ı döndür
    } catch (error) {
        console.error('Token yenileme başarısız:', error.response ? error.response.data : error.message);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw error; // Hatayı yukarı fırlat (kullanıcının tekrar giriş yapması gerekebilir)
    }
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Gerekirse backend'e logout bildirimi de gönderebilirsiniz
};

// API isteklerine otomatik olarak token eklemek için Axios interceptor
axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Token süresi dolduğunda otomatik yenileme için interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Eğer hata 401 Unauthorized ise ve daha önce denenmediyse
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Tekrar denendi işaretle
            try {
                const newAccessToken = await refreshToken(); // Token'ı yenile
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest); // Orijinal isteği yeni token ile tekrar gönder
            } catch (refreshError) {
                // Yenileme tokenı da geçersizse, kullanıcıyı çıkış yapmaya zorla
                logout();
                window.location.href = '/login'; // Giriş sayfasına yönlendir
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export { login, logout, refreshToken };