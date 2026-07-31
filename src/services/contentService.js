import api from './api';

export const contentService = {
  // Public: Get all CMS sections
  getAllSections: async () => {
    const response = await api.get('/content/sections');
    return response.data;
  },

  // Public: Get single section by key
  getSectionByKey: async (sectionKey) => {
    const response = await api.get(`/content/sections/${sectionKey}`);
    return response.data;
  },

  // Admin: Update section content & items
  updateSection: async (sectionKey, sectionData) => {
    const response = await api.put(`/content/sections/${sectionKey}`, sectionData);
    return response.data;
  },

  // Admin: Upload image file
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/content/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default contentService;
