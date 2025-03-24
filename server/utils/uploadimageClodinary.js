import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadImageCloudinary = async (image) => {
    try {
        if (!image) {
            throw new Error("No image provided");
        }

        // Chuyển đổi image thành buffer
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        // Tải ảnh lên Cloudinary
        const uploadImmage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'shopmilk' },
                (error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    if (!uploadResult || !uploadResult.secure_url) {
                        return reject(new Error("Invalid upload result from Cloudinary"));
                    }
                    return resolve(uploadResult);
                }
            ).end(buffer);
        });

        return uploadImmage;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};

export default uploadImageCloudinary;
