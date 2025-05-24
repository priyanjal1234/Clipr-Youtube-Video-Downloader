import React from 'react';

interface DownloadingStateProps {
  progress: number;
  fileName: string;
  onCancel: () => void;
}

const DownloadingState: React.FC<DownloadingStateProps> = ({ 
  progress, 
  fileName,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-[#1a2234] p-6 shadow-xl">
        <h3 className="text-lg font-medium text-white">Downloading</h3>
        <p className="mt-1 truncate text-sm text-white/70">{fileName}</p>
        
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-sm text-white/70">
          <span>{progress}% Complete</span>
          <span>Please wait...</span>
        </div>
        
        <button
          onClick={onCancel}
          className="mt-4 w-full rounded-lg border border-white/10 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DownloadingState;