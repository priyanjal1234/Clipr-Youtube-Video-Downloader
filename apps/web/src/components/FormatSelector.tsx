import React, { useState } from "react";
import { Check, ChevronDown, Video, Music, Download } from "lucide-react";

interface Format {
  id: string;
  label: string;
  quality: string;
  format: "video" | "audio";
  size: string;
}

interface FormatSelectorProps {
  onSelect: (format: Format) => void;
  onDownload: () => void;
  isLoading: boolean;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  onSelect,
  onDownload,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);

  // Mock formats - in a real app these would come from the API
  const formats: Format[] = [
    {
      id: "1",
      label: "MP4 - 1080p",
      quality: "1080p",
      format: "video",
      size: "120MB",
    },
    
    {
      id: "2",
      label: "MP4 - 720p",
      quality: "720p",
      format: "video",
      size: "70MB",
    },
    {
      id: "3",
      label: "MP4 - 480p",
      quality: "480p",
      format: "video",
      size: "45MB",
    },
    {
      id: "4",
      label: "MP4 - 360p",
      quality: "360p",
      format: "video",
      size: "25MB",
    },
  ];

  const handleSelect = (format: Format) => {
    setSelectedFormat(format);
    onSelect(format);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="mt-6 w-full animate-pulse rounded-lg bg-white/5 p-4 backdrop-blur-sm">
        <div className="h-10 w-full rounded bg-white/10"></div>
        <div className="mt-4 h-12 w-full rounded bg-white/10"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full rounded-lg bg-white/5 p-4 backdrop-blur-sm">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-left text-white hover:bg-white/10"
        >
          {selectedFormat ? (
            <div className="flex items-center gap-2">
              {selectedFormat.format === "video" ? (
                <Video className="h-4 w-4 text-blue-400" />
              ) : (
                <Music className="h-4 w-4 text-green-400" />
              )}
              <span>{selectedFormat.label}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {selectedFormat.size}
              </span>
            </div>
          ) : (
            <span className="text-white/50">Select format</span>
          )}
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-[#1a2234] py-1 shadow-lg">
            <div className="px-3 py-2 text-xs font-semibold text-white/50">
              Video
            </div>
            {formats
              .filter((f) => f.format === "video")
              .reverse()
              .map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleSelect(format)}
                  className="flex w-full items-center justify-between px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-400" />
                    <span>{format.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {format.size}
                    </span>
                    {selectedFormat?.id === format.id && (
                      <Check className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </button>
              ))}

            {formats
              .filter((f) => f.format === "audio")
              .map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleSelect(format)}
                  className="flex w-full items-center justify-between px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-green-400" />
                    <span>{format.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {format.size}
                    </span>
                    {selectedFormat?.id === format.id && (
                      <Check className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      <button
        onClick={onDownload}
        disabled={!selectedFormat}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-3 font-medium text-white transition-all ${
          selectedFormat
            ? "from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:shadow-lg hover:shadow-blue-500/20"
            : "from-gray-700 to-gray-600 cursor-not-allowed opacity-50"
        }`}
      >
        <Download className="h-5 w-5" />
        Download Now
      </button>
    </div>
  );
};

export default FormatSelector;
