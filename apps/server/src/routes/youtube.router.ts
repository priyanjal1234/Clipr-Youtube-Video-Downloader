import express, { Request, Response, NextFunction } from "express";
import { downloadVideo, getVideoInfo } from "../controllers/youtube.controller";
import urlValidation from "../middlewares/urlValidation";

const router = express.Router();

router
  .route("/video/info")
  .post((req: Request, res: Response, next: NextFunction) => {
    urlValidation(req, res, next);
  }, (req: Request,res: Response) => {
    getVideoInfo(req,res)
  });

router.route("/video/download").post((req: Request,res: Response, next: NextFunction) => {
    urlValidation(req,res,next)
},(req: Request,res: Response) => {
    downloadVideo(req,res)
})

export default router;
