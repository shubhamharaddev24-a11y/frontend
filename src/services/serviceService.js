import api from './api';

export const serviceService = {
  // Get all services
  getAllServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  // Get service by ID
  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  // Create new service (admin)
  createService: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  // Update service (admin)
  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  // Delete service (admin)
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  // Get services by category
  getServicesByCategory: async (category) => {
    const response = await api.get(`/services?category=${category}`);
    return response.data;
  },

  // Get featured services
  getFeaturedServices: async () => {
    const response = await api.get('/services?featured=true');
    return response.data;
  }
};
