import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = async (data, foldername) => {
  try {
    const urlData = await Promise.all(
      data.map(async (img) => {
        const result = await cloudinary.uploader.upload(
          `data:${img.mimetype};base64,${img.buffer.toString("base64")}`,
          {
            folder: foldername,
          }
        );
        return result.secure_url;
      })
    );

    return urlData;
  } catch (error) {
    throw error;
  }
};
