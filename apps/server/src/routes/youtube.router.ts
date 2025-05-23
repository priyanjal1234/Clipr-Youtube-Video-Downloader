import express, { Request, Response, NextFunction } from "express";
import { getVideoInfo } from "../controllers/youtube.controller";
import urlValidation from "../middlewares/urlValidation";

const router = express.Router();

router
  .route("/video/info")
  .post((req: Request, res: Response, next: NextFunction) => {
    urlValidation(req, res, next);
  }, getVideoInfo);

export default router;
