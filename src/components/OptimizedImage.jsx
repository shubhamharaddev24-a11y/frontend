import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  loading = 'lazy',
  sizes,
  srcSet,
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate WebP and fallback sources
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    if (!src.includes('unsplash.com')) return srcSet;
    
    // For Unsplash images, generate responsive WebP sources
    const baseUrl = src.split('?')[0];
    const params = src.split('?')[1] || '';
    
    return `
      ${baseUrl}?w=400&auto=format&fit=crop&q=80&format=webp 400w,
      ${baseUrl}?w=800&auto=format&fit=crop&q=80&format=webp 800w,
      ${baseUrl}?w=1200&auto=format&fit=crop&q=80&format=webp 1200w,
      ${src}
    `.trim();
  };

  const fallbackSrc = hasError ? 
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAiPjxyZG0+PC9zdmc+' :
    src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={fallbackSrc}
        srcSet={generateSrcSet()}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'blur-sm' : ''}
        `}
        style={{
          objectFit: 'cover',
          aspectRatio: width && height ? `${width}/${height}` : 'auto'
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-400 dark:text-gray-500 text-sm">
            Image not available
          </span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
