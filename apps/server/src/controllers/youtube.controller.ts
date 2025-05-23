import { Request, Response } from "express";

import ytdlp from "yt-dlp-exec";

import youtubeDl from "youtube-dl-exec";

export const getVideoInfo = async function (req: Request, res: Response) {
  try {
    let { videoUrl } = req.body;

    let info = await ytdlp(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
    });

    let videoDetails = {
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

export const downloadVideo = function (req: Request, res: Response) {
  try {
    let { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ message: "Video Url is required" });
    }

    res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
    res.setHeader("Content-Type", "video/mp4");

    youtubeDl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      
    })
      .then((output) => {
        console.log("Video Info:", output);
        res.json(output);
      })
      .catch((err) => {
        console.error("yt-dlp error", err);
        res.status(500).json({ message: "Failed to fetch video info" });
      });

    res.json({});
  } catch (error) {}
};
