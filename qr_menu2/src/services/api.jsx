// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Django backend URL'niz

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/`,
    headers: {
        'Content-Type': 'application/json', // Varsayılan olarak JSON
    },
});

// Axios interceptor'ları auth.js'de zaten kurulduğu için burada tekrar etmiyoruz.
// Bu 'api' instance'ı, auth.js'deki interceptor'lardan etkilenecektir.

export default api;
