import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bdjuan-production.up.railway.app',
    timeout: 5000
});

export default api;