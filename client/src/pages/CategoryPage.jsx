import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit,setOpenEdit] = useState(false);
    const [editData,setEditData] = useState({
        name:'',
        image:''
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ''
    });
    const allCategory = useSelector(state =>state.product.allCategory)

    useEffect(()=>{
        setCategoryData(allCategory)
    },[allCategory])
    
    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const {data : responseData} = response
            if(responseData.success){
                setCategoryData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDeleteCategory =async()=>{
       
         try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })
            const {data : responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
                // fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
         } catch (error) {
            AxiosToastError(error);
         }
    }

    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Danh mục</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
                >
                    Thêm danh mục
                </button>
            </div>
            {!categoryData[0] && !loading && (<NoData />)}
            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2'>
                {categoryData.map((category) => (
                    <div key={category._id} className='w-36 h-48 rounded shadow-md flex flex-col'>
                        <img
                            alt={category.name}
                            src={category.image}
                            className='w-full h-32 object-cover rounded-t'
                        />
                        <div className='p-2 flex-1 flex flex-col justify-between'>
                            <p className='text-sm font-semibold text-center'>{category.name}</p>
                            <div className='items-center h-9 flex gap-2'>
                                <button onClick={()=>{setOpenEdit(true)
                                                    setEditData(category)
                                }}
                                                    
                                 className='flex-1 bg-green-100 text-green-600 font-medium py-1 rounded text-sm'>
                                    Edit
                                </button>
                                <button onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }} className='flex-1 bg-red-100 text-red-600 font-medium py-1 rounded text-sm'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <Loading />}

            {openUploadCategory && (
                <UploadCategoryModel
                    fetchData={fetchCategory}
                    close={() => {
                        setOpenUploadCategory(false);
                    }}
                />
            )}
            {
                openEdit &&(
                    <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
                )
            }
            {
                openConfirmBoxDelete && (
                    <ConfirmBox close={ ()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
                )
            }
        </section>
    );
};

export default CategoryPage;