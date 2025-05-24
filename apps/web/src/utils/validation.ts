/**
 * Validates if a string is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

/**
 * Extracts video ID from a YouTube URL
 */
export const extractVideoId = (url: string): string | null => {
  // Handle youtu.be URLs
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];
  
  // Handle youtube.com URLs
  const watchUrlMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (watchUrlMatch) return watchUrlMatch[1];
  
  return null;
};

/**
 * Formats view count with appropriate suffixes
 */
export const formatViewCount = (count: number): string => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + 'B';
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

/**
 * Formats duration from seconds to MM:SS or HH:MM:SS
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};