
import ProductModel from "../models/product-model.js"

export const createProductController = async(request, response)=>{ 
    try {
        const {name,
            image ,
            category ,
            subCategory,
            unit ,
            stock,
            price ,
            discount ,
            description ,
            more_details,
             } =request.body

             if(!name || !image[0] || !category[0]|| !subCategory[0] || !unit ||!description|| !price) {
                return response.status(400).json({
                    message : "Nhập trường bắt buộc",
                    error : true,
                    success : false
                })
             }
             const product = new ProductModel({
                name,
            image ,
            category ,
            subCategory,
            unit ,
            stock,
            price ,
            discount ,
            description ,
            more_details,
             })
             const saveproduct = await product.save()

             return response.json({
                message : "Tạo sản phẩm thành công",
                data : saveproduct,
                error :false,
                success: true
             })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success:false
        })
    }
}

export const getProductController = async (request, response) => {
    try {
        const { page, limit, search } = request.body;

        if (!page) {
            page = 1 // Default to page 1 if not provided
        }
        if (!limit) {
            limit = 10 // Default limit to 10 if not provided
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {};

        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ]);

        return response.json({
            message: "Thông tin sản phẩm",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNopage: Math.ceil(totalCount / limit),
            data: data
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}