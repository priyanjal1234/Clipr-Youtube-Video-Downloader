import React, { useState } from 'react';
import { Link2, X } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    
    if (youtubeRegex.test(url)) {
      setIsValid(true);
      onSubmit(url);
    } else {
      setIsValid(false);
    }
  };

  const clearInput = () => {
    setUrl('');
    setIsValid(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div 
          className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white/50 ${isFocused ? 'text-purple-400' : ''}`}
        >
          <Link2 className="h-5 w-5" />
        </div>
        
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (!isValid) setIsValid(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Paste YouTube URL here..."
          className={`w-full rounded-lg bg-white/5 px-10 py-3 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/30 focus:outline-none focus:ring-2 ${
            isValid 
              ? 'focus:ring-purple-500/50' 
              : 'ring-2 ring-red-500/50 focus:ring-red-500/50'
          }`}
        />
        
        {url && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white/80"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {!isValid && (
        <p className="mt-2 text-sm text-red-400">
          Please enter a valid YouTube URL
        </p>
      )}
      
      <button
        type="submit"
        disabled={!url}
        className={`mt-4 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-medium text-white transition-all duration-200 ${
          !url 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/20'
        }`}
      >
        Analyze Video
      </button>
    </form>
  );
};

export default UrlInput;