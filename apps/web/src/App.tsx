import { useState } from "react";
import axios from "axios";

function App() {
  const [videoUrl, setvideoUrl] = useState<string>("");

  async function handleGetVideo(e: React.FormEvent) {
    e.preventDefault();
    try {
      const getVideoInfoRes = await axios.post(
        "http://localhost:3000/api/youtube/video/download",
        { videoUrl },
        { withCredentials: true }
      );

      const { s3Url } = getVideoInfoRes.data;

      // Fetch the video as blob
      const response = await fetch(s3Url);
      if (!response.ok) throw new Error("Failed to fetch video file");

      const blob = await response.blob();

      // Create object URL and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4"; // desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error getting video info or downloading:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <form onSubmit={handleGetVideo}>
        <input
          placeholder="Enter Video Url"
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="text"
          name="videoUrl"
          value={videoUrl}
          onChange={(e) => setvideoUrl(e.target.value)}
        />
        <button className="px-3 py-2 bg-blue-600 rounded-lg" type="submit">
          Get Video
        </button>
      </form>
    </div>
  );
}

export default App;
