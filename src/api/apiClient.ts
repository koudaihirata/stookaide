import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://click.ecc.ac.jp/ecc/khirata/STOOKAide',
});

apiClient.interceptors.request.use(async (config) => {
    let accessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
        // トークンがない場合はリフレッシュトークンを使用
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');
        if (refreshToken) {
            try {
                const response = await axios.post('https://click.ecc.ac.jp/ecc/khirata/STOOKAide/refresh-token', {
                    token: refreshToken,
                });
                accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (err) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/certification/LogIn';
                return Promise.reject(err);
            }
        } else {
            window.location.href = '/certification/LogIn';
            return Promise.reject(new Error('No refresh token available'));
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');
        if (!refreshToken) {
            window.location.href = '/certification/LogIn';
            return Promise.reject(error);
        }
        try {
            const response = await axios.post('https://click.ecc.ac.jp/ecc/khirata/STOOKAide/refresh-token', {
                token: refreshToken,
            });
            localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
            return apiClient(originalRequest);
        } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/certification/LogIn';
        }
    }
    return Promise.reject(error);
});

export default apiClient;
