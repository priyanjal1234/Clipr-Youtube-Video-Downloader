import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Gradient from "../components/Gradient";
import UrlInput from "../components/UrlInput";
import VideoInfo from "../components/VideoInfo";
import FormatSelector from "../components/FormatSelector";
import DownloadHistory from "../components/DownloadHistory";
import DownloadingState from "../components/DownloadingState";
import axios from "axios";
import { toast } from "react-toastify";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author?: string;
  views: string;
  channel: string
}

interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  format: string;
  downloadedAt: string;
}

interface Format {
  id: string;
  label: string;
  quality: string;
  format: "video" | "audio";
  size: string;
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [downloadHistory, setDownloadHistory] = useState<HistoryItem[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleUrlSubmit = async (videoUrl: string) => {
    setIsLoading(true);
    setVideoData(null);

    try {
      let getVideoInfoRes = await axios.post(
        "http://localhost:3000/api/youtube/video/info",
        { videoUrl },
        { withCredentials: true }
      );
      console.log(getVideoInfoRes.data)
      setIsLoading(false);
      if (getVideoInfoRes.status === 200) {
        setVideoData(getVideoInfoRes?.data);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false)
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFormatSelect = (format: Format) => {
    setSelectedFormat(format);
  };

  const handleDownload = () => {
    if (!videoData || !selectedFormat) return;

    setIsDownloading(true);
  };

  const handleCancelDownload = () => {
    setIsDownloading(false);
    setDownloadProgress(0);
  };

  const handleClearHistory = () => {
    setDownloadHistory([]);
  };

  const handleRemoveHistoryItem = (id: string) => {
    setDownloadHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen text-white">
      <Gradient />

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="container mx-auto flex-1 px-4 py-8 md:px-8 md:py-12">
          <section className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Download YouTube Videos
              </h2>
              <p className="mt-2 text-white/70">
                Enter a YouTube URL and select your preferred format
              </p>
            </div>

            <UrlInput onSubmit={handleUrlSubmit} />

            {(isLoading || videoData) && (
              <VideoInfo video={videoData} isLoading={isLoading} />
            )}

            {videoData && (
              <FormatSelector
                onSelect={handleFormatSelect}
                onDownload={handleDownload}
                isLoading={isLoading}
              />
            )}

            <DownloadHistory
              items={downloadHistory}
              onClear={handleClearHistory}
              onRemove={handleRemoveHistoryItem}
            />
          </section>
        </main>

        <Footer />
      </div>

      {isDownloading && (
        <DownloadingState
          progress={downloadProgress}
          fileName={videoData?.title || "Video"}
          onCancel={handleCancelDownload}
        />
      )}
    </div>
  );
};

export default Home;
