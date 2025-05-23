import { Request, Response, NextFunction } from "express";
import validUrl from "valid-url";

function urlValidation(req: Request, res: Response, next: NextFunction) {
  try {
    let { videoUrl } = req.body;
    if (!videoUrl)
      return res.status(400).json({ message: "Video url is required" });

    if (!validUrl.isUri(videoUrl))
      return res.status(401).json({ message: "Url is invalid" });

    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
    if (!ytRegex.test(videoUrl)) {
      return res
        .status(401)
        .json({ message: "Only Youtube Urls are required" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error validating the video url",
    });
  }
}

export default urlValidation;
