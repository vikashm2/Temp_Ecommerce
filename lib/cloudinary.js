import { v2 as cloudinary } from 'cloudinary';

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image to cloudinary
export const uploadImage = async (fileStr) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ecomm_preset', // user needs to create this in cloudinary
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default cloudinary;
