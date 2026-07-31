import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Plus, Trash2, Save, RefreshCw, Check, Layers, Sliders, Edit3 } from 'lucide-react';
import { contentService } from '../services';
import { useContent } from '../contexts/ContentContext';

const DEFAULT_HERO = {
  sectionKey: 'hero_slides',
  title: 'Full-Bleed Animated Hero Slides',
  items: [
    {
      id: 'slide-1',
      title: 'Destination Pre-Weddings & Editorial Stories',
      subtitle: 'Preserving raw emotions, scenic landscapes, and unforgettable moments',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=2400&auto=format&fit=crop&q=85',
      objectPosition: 'center 30%',
      aspectRatio: '16/9',
    },
    {
      id: 'slide-2',
      title: 'Sacred Indian Vows & Joyful Moments',
      subtitle: 'Capturing love, laughter, and family celebrations with artistic perfection',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=2400&auto=format&fit=crop&q=85',
      objectPosition: 'center 20%',
      aspectRatio: '16/9',
    },
    {
      id: 'slide-3',
      title: 'Authentic Celebrations & Wedding Cinema',
      subtitle: 'Documenting your journey with elegance and editorial depth',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2400&auto=format&fit=crop&q=85',
      objectPosition: 'center 25%',
      aspectRatio: '16/9',
    },
  ],
};

const DEFAULT_PORTFOLIO = {
  sectionKey: 'portfolio_items',
  title: 'Portfolio & Gallery Items',
  items: [
    {
      id: 'port-1',
      title: 'Grand Indian Wedding Mandap Ceremony',
      category: 'wedding',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
    {
      id: 'port-2',
      title: 'Bride Getting Ready in Traditional Gold Attire',
      category: 'wedding',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
    {
      id: 'port-3',
      title: 'Evening Wedding Rituals Under Golden Festive Lights',
      category: 'wedding',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
    {
      id: 'port-4',
      title: 'Sunset Pre-Wedding Shoot By Open Fields',
      category: 'prewedding',
      imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
    {
      id: 'port-5',
      title: 'Candid Couple Walk in Natural Landscape',
      category: 'prewedding',
      imageUrl: 'https://images.unsplash.com/photo-1525286116112-b59af11adad1?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
    {
      id: 'port-6',
      title: 'Flex Banners for Events & Branding',
      category: 'graphic',
      imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&auto=format&fit=crop&q=85',
      aspectRatio: '4/5',
      objectPosition: 'center 20%',
      objectFit: 'cover',
    },
  ],
};

const DEFAULT_TESTIMONIALS = {
  sectionKey: 'testimonials',
  title: 'Customer Stories & Film Highlights',
  items: [
    {
      id: 'test-1',
      title: 'Rohini & Sanket',
      subtitle: 'December 2023 · Murbad, Maharashtra',
      quote: 'Shubham captured our wedding perfectly! The traditional rituals and emotional moments were documented so beautifully.',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      rating: 5,
    },
    {
      id: 'test-2',
      title: 'Priya & Rahul',
      subtitle: 'November 2023 · Kalyan, Maharashtra',
      quote: 'Amazing photography & film! The team captured every single detail. Our wedding highlight feels like a Bollywood movie!',
      imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      rating: 5,
    },
    {
      id: 'test-3',
      title: 'Anjali & Vikram',
      subtitle: 'October 2023 · Karjat, Maharashtra',
      quote: 'Shubham Studio made our pre-wedding shoot so comfortable and fun! The drone shots and location recommendations were top notch.',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      rating: 5,
    },
  ],
};

const DEFAULT_STUDIO = {
  sectionKey: 'studio_info',
  title: 'Studio Address & Contact Details',
  description: 'Main bazaar road near bus stand, opposite Saralgaon Police Chowki, Murbad.',
  metadata: {
    phone: '+91 92714 56749',
    hours: 'Open Daily: 9:00 AM – 8:00 PM',
  },
};

const AdminCMSManager = () => {
  const [activeSectionKey, setActiveSectionKey] = useState('hero_slides');
  const [currentSection, setCurrentSection] = useState(DEFAULT_HERO);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { reloadContent, formatImageUrl } = useContent();

  useEffect(() => {
    loadSectionData(activeSectionKey);
  }, [activeSectionKey]);

  const loadSectionData = async (key) => {
    setError('');
    setMessage('');

    let defaultSection = DEFAULT_HERO;
    if (key === 'portfolio_items') defaultSection = DEFAULT_PORTFOLIO;
    else if (key === 'testimonials') defaultSection = DEFAULT_TESTIMONIALS;
    else if (key === 'studio_info') defaultSection = DEFAULT_STUDIO;

    try {
      const res = await contentService.getSectionByKey(key);
      if (res?.success && res?.data) {
        const mergedData = {
          ...defaultSection,
          ...res.data,
          items: (res.data.items && res.data.items.length > 0) ? res.data.items : defaultSection.items
        };
        setCurrentSection(mergedData);
      } else {
        setCurrentSection(defaultSection);
      }
    } catch (err) {
      console.error(err);
      setCurrentSection(defaultSection);
    }
  };

  const handleImageUpload = async (file, itemIndex) => {
    if (!file) return;
    setUploadingIndex(itemIndex);
    setError('');
    try {
      const res = await contentService.uploadImage(file);
      if (res?.success && res?.imageUrl) {
        const updatedItems = [...(currentSection.items || [])];
        if (updatedItems[itemIndex]) {
          updatedItems[itemIndex].imageUrl = res.imageUrl;
        }
        setCurrentSection({ ...currentSection, items: updatedItems });
        setMessage('Image uploaded successfully! Remember to save changes.');
      }
    } catch (err) {
      console.error(err);
      const serverMsg = err.response?.data?.message || 'Image upload failed. Ensure file size is under 50MB.';
      setError(serverMsg);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...(currentSection.items || [])];
    if (updatedItems[index]) {
      updatedItems[index][field] = value;
      setCurrentSection({ ...currentSection, items: updatedItems });
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'New Content Item',
      subtitle: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      category: 'wedding',
      aspectRatio: '4/5',
      objectFit: 'cover',
      objectPosition: 'center 20%',
    };
    setCurrentSection({
      ...currentSection,
      items: [...(currentSection.items || []), newItem],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = currentSection.items.filter((_, idx) => idx !== index);
    setCurrentSection({ ...currentSection, items: updatedItems });
  };

  const handleSaveSection = async () => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await contentService.updateSection(activeSectionKey, currentSection);
      setMessage(`Section '${activeSectionKey}' saved successfully! Changes are live on the website.`);
      await reloadContent();
    } catch (err) {
      console.error(err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* CMS Sub-Header & Section Picker */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brandSurface p-6 border border-brandBorder rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-brandTextPrimary flex items-center gap-2">
            <Sliders className="text-brandAccent" size={22} />
            <span>Master Website CMS & Media Manager</span>
          </h2>
          <p className="text-xs text-brandTextMuted mt-1">
            Upload new images, update titles, categories, and manage website content dynamically.
          </p>
        </div>

        <button
          onClick={handleSaveSection}
          disabled={saving}
          className="flex items-center gap-2 bg-brandAccent hover:bg-amber-400 text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check size={16} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Section Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brandBorder pb-3">
        {[
          { key: 'hero_slides', label: '1. Home Hero Slides' },
          { key: 'portfolio_items', label: '2. Portfolio & Gallery' },
          { key: 'testimonials', label: '3. Customer Stories' },
          { key: 'studio_info', label: '4. Studio Address & Info' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSectionKey(tab.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSectionKey === tab.key
                ? 'bg-brandAccent text-black font-bold shadow-sm'
                : 'bg-brandSurfaceSoft text-brandTextMuted hover:text-brandTextPrimary border border-brandBorder'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Section Editor */}
      <div className="bg-brandSurface border border-brandBorder rounded-2xl p-6 space-y-6">
        {/* Section Headings Editor */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brandAccent mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={currentSection.title || ''}
              onChange={(e) => setCurrentSection({ ...currentSection, title: e.target.value })}
              className="w-full p-3 bg-brandSurfaceSoft border border-brandBorder rounded-lg text-sm text-brandTextPrimary outline-none focus:border-brandAccent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brandAccent mb-1">
              Section Subtitle / Description
            </label>
            <input
              type="text"
              value={currentSection.subtitle || currentSection.description || ''}
              onChange={(e) => setCurrentSection({ ...currentSection, subtitle: e.target.value, description: e.target.value })}
              className="w-full p-3 bg-brandSurfaceSoft border border-brandBorder rounded-lg text-sm text-brandTextPrimary outline-none focus:border-brandAccent"
            />
          </div>
        </div>

        {/* Section Items / Images Manager */}
        {activeSectionKey !== 'studio_info' && (
          <div className="space-y-6 pt-4 border-t border-brandBorder">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandTextPrimary flex items-center gap-2">
                <ImageIcon size={18} className="text-brandAccent" />
                <span>Managed Items & Uploaded Media ({currentSection.items?.length || 0})</span>
              </h3>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-1.5 bg-brandSurfaceSoft hover:bg-brandBorder text-brandTextPrimary text-xs font-semibold px-4 py-2 rounded-lg border border-brandBorder transition-colors"
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {(currentSection.items || []).map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-brandSurfaceSoft border border-brandBorder p-5 rounded-xl space-y-4 relative group"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-brandBorder">
                    <span className="text-xs font-bold text-brandAccent uppercase">Item #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-400 hover:text-red-500 p-1"
                      title="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Image Preview & Upload Control */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase text-brandTextMuted">
                      Item Media Image
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/40 border border-brandBorder shrink-0 relative">
                        <img
                          src={formatImageUrl(item.imageUrl)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: item.objectPosition || 'center' }}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-2 bg-brandAccent hover:bg-amber-400 text-black px-4 py-2 rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm">
                          <Upload size={14} />
                          <span>{uploadingIndex === index ? 'Uploading...' : 'Upload Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0], index)}
                            className="hidden"
                            disabled={uploadingIndex === index}
                          />
                        </label>
                        <input
                          type="text"
                          value={item.imageUrl || ''}
                          onChange={(e) => handleItemChange(index, 'imageUrl', e.target.value)}
                          placeholder="Or paste image URL directly..."
                          className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Fields */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-brandTextMuted mb-1">
                        Title / Name
                      </label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                        className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                      />
                    </div>

                    {activeSectionKey === 'portfolio_items' && (
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-brandTextMuted mb-1">
                          Category
                        </label>
                        <select
                          value={item.category || 'wedding'}
                          onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                          className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                        >
                          <option value="wedding">Wedding Films</option>
                          <option value="prewedding">Pre-Wedding Shoots</option>
                          <option value="development">Web Development</option>
                          <option value="graphic">Graphic Design</option>
                        </select>
                      </div>
                    )}

                    {activeSectionKey === 'hero_slides' && (
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold uppercase text-brandTextMuted mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)}
                          className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                        />
                      </div>
                    )}

                    {activeSectionKey === 'testimonials' && (
                      <>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-brandTextMuted mb-1">
                            Date & Location
                          </label>
                          <input
                            type="text"
                            value={item.subtitle || ''}
                            onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)}
                            className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold uppercase text-brandTextMuted mb-1">
                            Client Review Quote
                          </label>
                          <textarea
                            rows={2}
                            value={item.quote || ''}
                            onChange={(e) => handleItemChange(index, 'quote', e.target.value)}
                            className="w-full p-2 text-xs bg-brandSurface border border-brandBorder rounded text-brandTextPrimary"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCMSManager;
