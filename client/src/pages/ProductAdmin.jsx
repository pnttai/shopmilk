import React, { useEffect, useState } from 'react'

import AxiosToastError from '../utils/AxiosToastError'

import Loading from '../components/Loading'

import { IoSearchOutline } from "react-icons/io5";
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios';
import EditProductAdmin from '../components/EditProductAdmin';
import ProductCardAdmin from '../components/ProductCardAdmin';



const ProductAdmin = () => {
  const [productData, setProductData]= useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState()
  const [search,setSearch] = useState("")

  const fetchProductData = async()=>{
      try {
          setLoading(true)

          const response = await Axios({
              ...SummaryApi.getProduct,
              data  :{
                  page: page,
                  limit :12,
                  search :search
              }
          })
         

          const {data : responseData} = response

          

          if(responseData.success){
            setTotalPageCount(responseData.totalNopage)
              setProductData(responseData.data)
             
              
          }

      } catch (error) {
          AxiosToastError(error)
      }finally{
        setLoading(false)
      }
  }
  useEffect(()=>{
      fetchProductData()
  },[page])

  const handleNext =()=>{
    if(page !== totalPageCount){
      setPage(preve =>preve +1)
    }
    
  }
  const handlePrevious =()=>{
    if(page > 1){
      setPage(preve =>preve -1)
    }  
  }

  const handleOnChange =(e) =>{
    const {value} = e.target

    setSearch(value)
    setPage(1)
  }
  useEffect(()=>{
    let flag =true 
    const interval = setTimeout(()=>{
      if(flag){
        fetchProductData()
        flag =false
      }
     
    },300);
    
    return ()=>{
      clearTimeout(interval)
    }
   
  },[search])


  return (
    <section className=''>
    <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
          <h2 className='font-semibold'> Sản phẩm</h2>
          <div className='h-full min-w-24 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200'>
            <IoSearchOutline size={25}/>
            <input type="text"
            placeholder='Tìm kiếm sản phẩm ở đây...' 
            className='h-full w-full  py-2  outline-none bg-transparent'
            value={search}
            onChange={handleOnChange}
            />
          </div>
    </div>
    {
      loading&&(
        <Loading/>
      )
    }
    <div className='p-4 bg-blue-50 '>

      <div className='min-h-[55vh]'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 '>
          {
            productData.map((p)=>{
              return(
                <ProductCardAdmin data={p}/>
              )
            })
          }
        </div>
      </div>
      
      <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-100'>Previous</button>
          <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-primary-200 px-4 py-1 hover:bg-primary-100'>Next</button>
      </div>
    </div>
    
    <EditProductAdmin/>
    </section>
  )
}

export default ProductAdmin