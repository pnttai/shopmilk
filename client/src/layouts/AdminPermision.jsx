import React from 'react'
import isAdmin from '../utils/isAdmin'
import { useSelector } from 'react-redux'

const AdminPermision = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <>
       {
         isAdmin(user.role) ? children : <p className='text-red-600 bg-red-100 p-4'>Bạn không có quyền truy cập trang này</p>
       }
     </>
  )
}

export default AdminPermision