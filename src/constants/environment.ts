export const __DEV__ = process.env.NODE_ENV !== 'production';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
export const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api/v1';

export const API_URL = `${BASE_URL}${API_PREFIX}`;
