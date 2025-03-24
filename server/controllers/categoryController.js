import CategoryModel from "../models/category-model.js";
import ProductModel from "../models/product-model.js";
import SubCategoryModel from "../models/subCategory-model.js";

// Add a new category
export const AddCategoryController = async (request, response) => {
    try {
        const { name, image } = request.body;

        // Validate required fields
        if (!name || !image) {
            return response.status(400).json({ 
                success: false,
                message: "Tên và hình ảnh danh mục là bắt buộc.",
                error: true
            });
        }

        // Create a new category
        const addCategory = new CategoryModel({
            name,
            image
        });

        // Save the category to the database
        const saveCategory = await addCategory.save();

        if (!saveCategory) {
            return response.status(500).json({ 
                success: false, 
                message: "Thêm danh mục thất bại.",
                error: true
            });
        }

        // Return success response
        return response.status(201).json({ 
            success: true, 
            message: "Thêm danh mục thành công.",
            data: saveCategory,
            error: false
        });

    } catch (error) {
        // Handle errors
        console.error("Error in AddCategoryController:", error);
        return response.status(500).json({ 
            success: false, 
            error: true,
            message: error.message || "Đã xảy ra lỗi khi thêm danh mục."
        });
    }
};

// Get all categories
export const getCategoryController = async (request, response) => {
    try {
        // Fetch all categories from the database
        const data = await CategoryModel.find().sort({ createdAt: -1 });

        // Return success response
        return response.json({
            success: true,
            message: "Lấy danh sách danh mục thành công.",
            data: data,
            error: false
        });

    } catch (error) {
        // Handle errors
        console.error("Error in getCategoryController:", error);
        return response.status(500).json({
            success: false,
            error: true,
            message: error.message || "Đã xảy ra lỗi khi lấy danh sách danh mục."
        });
    }
};

export const updateCategoryController = async (request, response) => {
    try {
        const  {_id ,name,image} = request.body;
         const update = await CategoryModel.updateOne({
            _id : _id
         },{
            name,
            image
         })
         return  response.json({
            success: true,
            message: "Cập nhật danh mục thành công.",
            data: update,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
}

export const deleteCategoryController = async (request, response) => {
    try {
        const  {_id} = request.body;
        
        const checkSubCategory = await SubCategoryModel.find({
            category :{
                "$in" : [_id]
            } 
        }).countDocuments();

        const checkProduct = await ProductModel.find({
            category :{
                "$in" : [_id]
            } 
        }).countDocuments();
         
        if(checkSubCategory > 0 || checkProduct > 0){
            return response.status(400).json({
                success: false,
                error: true,
                message: "Không thể xóa danh mục này."
            });
        }

        const deleteCategory = await CategoryModel.deleteOne({
            _id : _id
        });
        return  response.json({
            success: true,
            message: "Xóa danh mục thành công.",
            data: deleteCategory,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
} 