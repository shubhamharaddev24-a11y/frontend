import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { contentService } from '../services';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await contentService.getAllSections();
      if (res?.success && res?.data) {
        setSections(res.data);
      }
    } catch (err) {
      console.warn('Using default static CMS content fallbacks:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Helper to format uploaded image URLs properly
  const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const origin = baseURL.replace(/\/api\/?$/, '');
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Helper to retrieve section items merged with default fallback
  const getSection = (key, defaultData) => {
    const liveSection = sections[key];
    if (!liveSection || !liveSection.items || liveSection.items.length === 0) {
      return defaultData;
    }
    return {
      ...defaultData,
      title: liveSection.title || defaultData.title,
      subtitle: liveSection.subtitle || defaultData.subtitle,
      description: liveSection.description || defaultData.description,
      items: liveSection.items.map((item, idx) => {
        const fallbackItem = defaultData.items ? defaultData.items[idx] || {} : {};
        return {
          ...fallbackItem,
          ...item,
          imageUrl: item.imageUrl ? formatImageUrl(item.imageUrl) : fallbackItem.imageUrl || fallbackItem.image || '',
        };
      }),
    };
  };

  const value = {
    sections,
    loading,
    reloadContent: fetchContent,
    formatImageUrl,
    getSection,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
