import React from 'react';
import { Download, Youtube } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Youtube className="h-8 w-8 text-red-500" />
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Cli<span className="text-red-500">Pr</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-white/70" />
          <span className="text-sm font-medium text-white/70">Easy Downloads</span>
        </div>
      </div>
    </header>
  );
};

export default Header;