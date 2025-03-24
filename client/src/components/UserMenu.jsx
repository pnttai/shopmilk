import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { FiExternalLink } from "react-icons/fi";
import Divider from './Divider'
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
        try {
          const response = await Axios({
            ...SummaryApi.logout
          })

          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
           navigate("/")
          }
        } catch (error) {
          AxiosToastError(error)
        }
    }

    const handleClose =()=>{
      if(close){
        close()
      }
    }
  return (
    <div>
        <div className='font-semibold'> Tài khoản của tôi</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}<span className='text-medium text-red-600'>{user.role==="ADMIN"? "(admin)":""}</span></span>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'><FiExternalLink size={15}/></Link> </div>
        
          <Divider/>
        <div className='text-sm grid gap-1'>
               {
                isAdmin(user.role) &&(
                  <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Danh mục</Link>
                )
               }
               {
                isAdmin(user.role) &&(
                  <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Mô tả danh mục</Link> 
                )
               }
               {
                isAdmin(user.role) &&(
                  <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1'>Tải sản phẩm lên</Link> 
                )
               }
               {
                isAdmin(user.role) &&(
                  <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1'>Sản phẩm</Link> 
                )
               }  
                <Link onClick={handleClose} to={"/dashboard/myorder"} className='px-2 hover:bg-orange-200 py-1'>Đơn hàng của tôi</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='px-2  hover:bg-orange-200 py-1'>Lưu địa chỉ</Link>
                <button  onClick={handleLogout} className='text-left px-2  hover:bg-red-200 py-1'>Đăng xuất </button>
        </div>
    </div>
  )
}

export default UserMenu