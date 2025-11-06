// Image utility functions for handling article images with proxy and fallbacks

/**
 * List of known unreliable image domains that frequently fail
 */
const UNRELIABLE_DOMAINS = [
  'toiimg.com',
  'phonearena.com',
  'feedburner.com',
  'gravatar.com',
  'static01.nyt.com'
];

/**
 * Check if an image URL is from an unreliable domain
 * @param {string} url - Image URL
 * @returns {boolean} True if from unreliable domain
 */
export const isFromUnreliableDomain = (url) => {
  if (!url) return true;
  return UNRELIABLE_DOMAINS.some(domain => url.includes(domain));
};

/**
 * Check if an image URL is valid
 * @param {string} url - Image URL
 * @returns {boolean} True if valid
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Must start with http/https
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
  
  // Skip unreliable domains
  if (isFromUnreliableDomain(url)) return false;
  
  return true;
};

/**
 * Get proxied image URL using weserv.nl
 * @param {string} imageUrl - Original image URL
 * @param {string} fallbackText - Text to show in placeholder (default: 'No Image')
 * @param {string} size - Size for placeholder (default: '400x250')
 * @returns {string} Proxied URL or fallback placeholder
 */
export const getProxiedImageUrl = (imageUrl, fallbackText = 'No+Image', size = '400x250') => {
  // Return placeholder if URL is invalid or from unreliable domain
  if (!isValidImageUrl(imageUrl)) {
    return `https://placehold.co/${size}?text=${fallbackText}`;
  }
  
  // Strip protocol (https:// or http://) from the URL before passing to proxy
  const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
  const encodedUrl = encodeURIComponent(urlWithoutProtocol);
  const fallbackPlaceholder = `https://placehold.co/${size}?text=${fallbackText}`;
  
  return `https://images.weserv.nl/?url=${encodedUrl}&default=${encodeURIComponent(fallbackPlaceholder)}`;
};

/**
 * Handle image error by setting a fallback placeholder
 * Prevents console errors from repeated failed requests
 * @param {Event} e - Error event
 * @param {string} fallbackText - Text for placeholder
 * @param {string} size - Size for placeholder
 */
export const handleImageError = (e, fallbackText = 'Image+Unavailable', size = '400x250') => {
  if (e.target.dataset.fallbackApplied === 'true') {
    return; // Already applied fallback, prevent infinite loop
  }
  
  e.target.dataset.fallbackApplied = 'true';
  e.target.onerror = null; // Remove error handler
  e.target.src = `https://placehold.co/${size}?text=${fallbackText}`;
};

/**
 * Preload image to check if it exists
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} True if image loads successfully
 */
export const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};
