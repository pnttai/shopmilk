import uploadImageCloudinary from "../utils/uploadimageClodinary.js";

const uploadImageController = async (req, res) => {
    try {
        const file = req.file;

       

        const uploadImage = await uploadImageCloudinary(file);

        return res.json({
            success: true,
            message: "Image uploaded successfully.",
            data: uploadImage, 
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred while uploading the image."
        });
    }
};

export default uploadImageController;