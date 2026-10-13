import api from './api';

export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Get all bookings
  getAllBookings: async (params = {}) => {
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Delete booking
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  // Get bookings by date range
  getBookingsByDateRange: async (startDate, endDate) => {
    const response = await api.get(`/bookings?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },

  // Get available time slots for a date
  getAvailableSlots: async (date) => {
    const response = await api.get(`/bookings/available-slots?date=${date}`);
    return response.data;
  },

  // === CREAONNECT GIG MARKETPLACE METHODS ===
  getAvailableOrders: async (params = {}) => {
    const response = await api.get('/bookings/marketplace/available', { params });
    return response.data;
  },

  postMarketplaceOrder: async (orderData) => {
    const response = await api.post('/bookings/marketplace/order', orderData);
    return response.data;
  },

  claimOrder: async (id) => {
    const response = await api.post(`/bookings/marketplace/${id}/claim`);
    return response.data;
  },

  getMyClientOrders: async () => {
    const response = await api.get('/bookings/marketplace/my-client-orders');
    return response.data;
  },

  getMyFreelancerOrders: async () => {
    const response = await api.get('/bookings/marketplace/my-claimed-orders');
    return response.data;
  },

  completeOrder: async (id) => {
    const response = await api.patch(`/bookings/marketplace/${id}/complete`);
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.patch(`/bookings/marketplace/${id}/cancel`);
    return response.data;
  }
};
