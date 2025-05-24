import React from 'react';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  format: string;
  downloadedAt: string;
}

interface DownloadHistoryProps {
  items: HistoryItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

const DownloadHistory: React.FC<DownloadHistoryProps> = ({ 
  items, 
  onClear, 
  onRemove 
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-10 w-full rounded-lg bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-white">Recent Downloads</h2>
        <button
          onClick={onClear}
          className="text-sm text-white/50 hover:text-white"
        >
          Clear All
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.map(item => (
          <div 
            key={item.id} 
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10"
          >
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="h-12 w-20 rounded object-cover"
            />
            
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate text-sm font-medium text-white">
                {item.title}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/50">
                <span className="rounded-full bg-white/10 px-2 py-0.5">
                  {item.format}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.downloadedAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`https://youtube.com/watch?v=${item.id}`)}
                className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                title="Open on YouTube"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => onRemove(item.id)}
                className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-red-400"
                title="Remove from history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadHistory;