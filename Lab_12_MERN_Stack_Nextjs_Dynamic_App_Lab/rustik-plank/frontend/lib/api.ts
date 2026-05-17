import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_BASE });

export const productAPI = {
  getAll: (params?: object) => api.get('/products', { params }),
  getOne: (id: string) => api.get(`/products/${id}`),
  create: (data: object) => api.post('/products', data),
  update: (id: string, data: object) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  seed: () => api.post('/products/seed/all'),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

export const cartAPI = {
  getCart: (sessionId: string) => api.get(`/cart/${sessionId}`),
  addItem: (sessionId: string, data: object) => api.post(`/cart/${sessionId}/add`, data),
  updateItem: (sessionId: string, data: object) => api.put(`/cart/${sessionId}/update`, data),
  removeItem: (sessionId: string, productId: string) => api.delete(`/cart/${sessionId}/remove/${productId}`),
  clearCart: (sessionId: string) => api.delete(`/cart/${sessionId}/clear`),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data: object) => api.post('/orders', data),
  updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
};
