import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/Uploadimage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({close,fetchData}) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    image: '',
    category: []
  });
  const allCategory = useSelector(state => state.product.allCategory)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setSubCategoryData(prevState => ({
      ...prevState,
      image: ImageResponse.data.url
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
   try {
    console.log("Dữ liệu subCategoryData:", subCategoryData);
    const response =await Axios({
      ...SummaryApi.createSubCategory,
      data :subCategoryData
    })
    const { data :responseData} = response
    if(responseData.success){
      toast.success(responseData.message)
      
      if(close){
        close()
      }
      if(fetchData){
        fetchData()
      }
        
    }

   } catch (error) {
    AxiosToastError(error)
   }
    
  };
  const handleRemoveCategorySelected =(categoryId)=>{
    const index =subCategoryData.category.findIndex(el=>el._id === categoryId)
    subCategoryData.category.splice(index,1)
    setSubCategoryData((preve)=>{
      return {
          ...preve
      }
    })

  }

  return (
    <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl bg-white rounded-lg shadow-lg p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='font-semibold text-xl'>Thêm danh mục phụ</h1>
          <button onClick={close} className='text-neutral-600 hover:text-neutral-900'>
            <IoClose size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className=' my-3 grid gap-3'>
          <div className='grid gap-1'>
            <label htmlFor="name" className='text-sm font-medium text-neutral-700'>Tên danh mục phụ</label>
            <input
              type="text"
              id='name'
              name='name'
              value={subCategoryData.name}
              onChange={handleChange}
              className='p-2 bg-blue-50 border border-neutral-300 rounded-md focus:outline-none focus:border-primary-200'
              required
            />
          </div>
          <div className='grid gap-1'>
            <label className='text-sm font-medium text-neutral-700'>Hình ảnh</label>
            <div className='flex flex-col gap-2'>
              <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center rounded-md'>
                {subCategoryData.image ? (
                  <img src={subCategoryData.image} alt="subCategory" className='w-full h-full object-cover rounded-md' />
                ) : (
                  <p className='text-sm text-neutral-400'>Chọn ảnh</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage" className='cursor-pointer'>
                <div className='px-4 py-2 border border-primary-100 text-primary-200 rounded-md hover:bg-primary-200 hover:text-white text-center'>
                  Tải lên hình ảnh
                </div>
                <input
                  type="file"
                  id='uploadSubCategoryImage'
                  className='hidden'
                  onChange={handleUploadSubCategoryImage}
                  required
                />
              </label>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="category" className='text-sm font-medium text-neutral-700'>Lựa chọn danh mục</label>
            <div className='border focus-within:boprder-primary-200 rounded'>
                 <div className='flex flex-wrap gap-2'>
                      {
                        subCategoryData.category.map((cat)=>{
                          return (
                            <p key={cat._id+"selectedValue"} className='bg-white shadow-md px- m-1 flex items-center gap-2'>{cat.name}
                            <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}>
                              <IoClose size={20}/>
                            </div>
                            </p>
                          )
                        })
                      }
                 </div>
                
                  <select className='w-full p-2 bg-transparent outline-none border'
                    onChange={(e)=>{
                      const value = e.target.value
                      const categoryDetails =allCategory.find(el=>el._id==value)
                      setSubCategoryData((preve)=>{
                        return {
                            ...preve,
                            category :[...preve.category,categoryDetails]
                        }
                      })
                    }}
                  >
                    <option value={""}   >Lựa chọn danh mục</option>
                    {
                        allCategory.map((category)=>{
                          return (
                            <option value={category._id}
                              key={category._id +"subcategory"}
                            >{category?.name}</option>
                          )
                        })
                    }
                   </select>
            </div>
          </div>
          <button className={`px-4 py-2 border ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0]? "bg-primary-200 hover:bg-primary-100":"bg-gray-200"}
            font-semibold
            `}>
          Lưu lại
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;