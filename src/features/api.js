import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token
            }`;
    }
    return req;
});

export const login = formData => API.post('/api/v1/auth/login', formData);

export const getStations = () => API.get(`/api/v1/stations`);

export const updateStations = stationData =>
    API.post('/api/v1/stations', stationData);
