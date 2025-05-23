import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import ytdlp from "yt-dlp-exec";
import youtubeDl from "youtube-dl-exec";

// 🎥 Get Video Info
export const getVideoInfo = async function (req: Request, res: Response) {
  try {
    const { videoUrl } = req.body;

    const info = await ytdlp(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
    });

    const videoDetails = {
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      channel: info.uploader,
      views: info.view_count,
    };

    return res.status(200).json(videoDetails);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error fetching info",
    });
  }
};

// 📥 Download Video
export const downloadVideo = (req: Request, res: Response) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    const match = videoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/
    );

    if (!match) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    const videoId = match[1];
    const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const pythonScriptPath = path.resolve(process.cwd(), "scripts/download.py");

    const command = `python "${pythonScriptPath}" "${cleanUrl}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({
          message: "Video download failed",
          error: error.message,
        });
      }

      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout}`);

      res.status(200).json({
        message: "Video downloaded successfully",
        output: stdout,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error downloading video",
    });
  }
};
