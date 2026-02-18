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
  }
};
