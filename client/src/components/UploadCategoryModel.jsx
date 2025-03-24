import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/Uploadimage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
          
            return;
        }
        try {
            const response = await uploadImage(file);

            if (!response || !response.data) {
                throw new Error("Invalid response from server");
            }
    
            const { data: ImageResponse } = response;
            if (!ImageResponse.data || !ImageResponse.data.url) {
                throw new Error("Image URL not found in response");
            }
            // Ensure response and response.data exist
           
           setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
            
              });
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData(); // Refresh the category list
            } else {
                toast.error(responseData.message || "Đã xảy ra lỗi khi thêm danh mục.");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Thêm danh mục</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='my-3 grid gap-2'>
                    <div className='grid gap-1'>
                        <label htmlFor='categoryName'>Tên danh mục</label>
                        <input
                            type="text"
                            id='categoryName'
                            placeholder='Nhập tên danh mục'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="categoryImage">Hình ảnh</label>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-36 flex items-center justify-center rounded'>
                                {
                                
                                    data.image ? (
                                    <img
                                        src={data.image}
                                        alt='category'
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>No image</p>
                                )}
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div
                                    className='bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded cursor-pointer border font-medium'
                                >
                                    Tải ảnh lên
                                </div>
                                <input
                                    onChange={handleUploadCategoryImage}
                                    type="file"
                                    id='uploadCategoryImage'
                                    className='hidden'
                                    disabled={!data.name}
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!data.name || !data.image || loading}
                        className={`${data.name && data.image && !loading ? "bg-primary-200" : "bg-gray-300"} 
                        py-2 font-semibold rounded`}
                    >
                        {loading ? "Đang tải..." : "Thêm danh mục"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel;