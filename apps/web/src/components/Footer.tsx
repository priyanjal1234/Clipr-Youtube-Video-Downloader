import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center gap-1 text-sm text-white/50">
          Made with <Heart className="h-3 w-3 text-red-500" /> in 2025
        </p>
        <p className="mt-1 text-xs text-white/30">
          For educational purposes only. Use responsibly and respect copyright.
        </p>
      </div>
    </footer>
  );
};

export default Footer;