import api from './api';

export const taskService = {
  // Create task
  createTask: async (taskData) => {
    const headers = taskData instanceof FormData 
      ? { 'Content-Type': 'multipart/form-data' } 
      : {};
    const response = await api.post('/tasks', taskData, { headers });
    return response.data;
  },

  // Get all tasks
  getAllTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Update task (title, description, status, priority, assignedTo)
  updateTask: async (id, taskData) => {
    const headers = taskData instanceof FormData 
      ? { 'Content-Type': 'multipart/form-data' } 
      : {};
    const response = await api.put(`/tasks/${id}`, taskData, { headers });
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};
