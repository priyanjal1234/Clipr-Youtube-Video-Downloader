import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import ytdlp from "yt-dlp-exec";
import { uploadToS3 } from "../utils/uploadToS3";
import fs from "fs/promises";
import { existsSync } from "fs";

import extractFilePathFromStdout from "../utils/extractFilePath";
import waitForFile from "../utils/waitForFile";

export const getVideoInfo = async function (req: Request, res: Response) {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    const info = await ytdlp(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificate: true,
      noWarnings: true,
      preferFreeFormats: true,
    });

    const videoDetails = {
      url: info.url,
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      channel: info.uploader,
      views: info.view_count,
    };

    return res.status(200).json(videoDetails);
  } catch (error) {
    console.error("Error in getVideoInfo:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error fetching info",
    });
  }
};

export const downloadVideo = async (req: Request, res: Response) => {
  try {
    const { videoUrl, format } = req.body;

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
    const downloadsDir = path.join(process.cwd(), "downloads");

    await fs.mkdir(downloadsDir, { recursive: true });

    const command = `python "${pythonScriptPath}" "${cleanUrl}" "${downloadsDir}" "${format}"`;

    exec(
      command,
      { maxBuffer: 1024 * 1024 * 10 },
      async (error, stdout, stderr) => {
        if (error) {
          console.error("Python script execution error:", error);
          console.error("stderr:", stderr);
          return res.status(500).json({
            message: "Video download failed",
            error: stderr || error.message,
            details: "Check server logs for more information",
          });
        }

        console.log("Python script output:", stdout);

        let downloadedFilePath: string;

        try {
          downloadedFilePath = extractFilePathFromStdout(stdout);

          const fileExists = await waitForFile(downloadedFilePath, 5000);
          if (!fileExists) {
            console.error("Downloaded file not found:", downloadedFilePath);
            return res.status(500).json({
              message: "Downloaded file not found",
              details: `Extracted path: ${downloadedFilePath}`,
            });
          }

          console.log("Found downloaded file at:", downloadedFilePath);

          const s3Url = await uploadToS3(downloadedFilePath);

          // Clean up
          try {
            await fs.unlink(downloadedFilePath);
            console.log("Deleted local file:", downloadedFilePath);
          } catch (cleanupErr) {
            console.error("Cleanup failed:", cleanupErr);
          }

          return res.status(200).json({
            message: "Video uploaded to S3 successfully",
            s3Url,
          });
        } catch (parseError) {
          console.error("Error parsing output:", parseError);
          return res.status(500).json({
            message: "Error extracting file path",
            error:
              parseError instanceof Error
                ? parseError.message
                : String(parseError),
          });
        }
      }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return res.status(500).json({
      message: err instanceof Error ? err.message : "Internal server error",
    });
  }
};
