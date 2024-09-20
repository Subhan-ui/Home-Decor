const cloudinary = require("cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadingImage = async (picture: string) => {
  const mainDir = path.dirname(require.main?.filename || "");
  picture = `${mainDir}/uploads/${picture}`;
  try {
    const photo = await cloudinary.v2.uploader.upload(picture);
    return photo;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default cloudinary;
