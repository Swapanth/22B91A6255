import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT || 'http://localhost:7000',
});

export const createShortUrl = (data) => api.post('/shorturls', data);

export const getShortUrlStats = (shortcode) => api.get(`/shorturls/${shortcode}`);

export default api;