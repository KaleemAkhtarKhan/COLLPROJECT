import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (user) => api.post('/users/register', user);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getBooks = () => api.get('/books');
export const getBookById = (id) => api.get(`/books/${id}`);
export const createBook = (book) => api.post('/books', book);
export const updateBook = (id, book) => api.put(`/books/${id}`, book);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const addToCart = (cartItem) => api.post('/cart', cartItem);
export const getCart = () => api.get('/cart');
export const updateCartItem = (id, quantity) => api.put(`/cart/${id}`, { quantity });
export const deleteCartItem = (id) => api.delete(`/cart/${id}`);

export default api;