import { S3Client, ObjectCannedACL } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (filePath: string): Promise<string> => {
  const fileStream = fs.createReadStream(filePath);
  const fileExt = path.extname(filePath);
  const fileName = `videos/${uuidv4()}${fileExt}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileStream,
    
    ContentType: "video/mp4",
  };

  try {
    const upload = new Upload({
      client: s3,
      params: uploadParams,
    });

    await upload.done();

    fs.unlinkSync(filePath);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return fileUrl;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};
