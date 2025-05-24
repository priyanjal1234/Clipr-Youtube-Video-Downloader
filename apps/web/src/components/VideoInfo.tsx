import React from 'react';
import { Clock, Film, User } from 'lucide-react';
import { convertToHoursMinutesSeconds } from '../utils/convertToMinutes';

interface VideoInfoProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    author?: string;
    channel: string,
    views: string;
  } | null;
  isLoading: boolean;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 w-full overflow-hidden rounded-lg bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex animate-pulse flex-col gap-4 md:flex-row">
          <div className="h-44 w-full rounded-md bg-white/10 md:h-36 md:w-64"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 w-3/4 rounded bg-white/10"></div>
            <div className="h-4 w-1/2 rounded bg-white/10"></div>
            <div className="space-y-2">
              <div className="h-3 w-1/4 rounded bg-white/10"></div>
              <div className="h-3 w-1/3 rounded bg-white/10"></div>
              <div className="h-3 w-1/5 rounded bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="mt-8 w-full overflow-hidden rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/8">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative h-auto w-full overflow-hidden rounded-md md:h-36 md:w-64">
          <img 
            src={video?.thumbnail} 
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {video?.duration}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white md:text-xl">
            {video.title}
          </h3>
          
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{video?.channel}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Film className="h-4 w-4" />
              <span>{video.views}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{convertToHoursMinutesSeconds(Number(video?.duration))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;